const PDF_MIME = 'application/pdf'
const PAGE_SIZES = {
  a4: [595.28, 841.89],
  letter: [612, 792],
}

let pdfjsPromise

export function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / 1024 ** index
  const formatted = index === 0 || value >= 10 ? Math.round(value) : value.toFixed(1)
  return `${formatted} ${units[index]}`
}

export function safeBaseName(filename) {
  const base = String(filename || 'document')
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-z0-9-_]+/gi, '-')
    .replace(/^-+|-+$/g, '')
  return base || 'document'
}

export function isPdfFile(file) {
  return file?.type === PDF_MIME || /\.pdf$/i.test(file?.name || '')
}

export function isImageFile(file) {
  return /^image\/(jpeg|png)$/.test(file?.type || '') || /\.(jpe?g|png)$/i.test(file?.name || '')
}

export async function fileToBytes(file) {
  return new Uint8Array(await file.arrayBuffer())
}

export function downloadBlob(blob, filename) {
  if (!blob) return
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

function pdfBlob(bytes) {
  return new Blob([bytes], { type: PDF_MIME })
}

function loadPdfJs() {
  if (!pdfjsPromise) {
    pdfjsPromise = Promise.all([
      import('pdfjs-dist/legacy/build/pdf.mjs'),
      import('pdfjs-dist/legacy/build/pdf.worker.min.mjs?url'),
    ]).then(([pdfjs, worker]) => {
      pdfjs.GlobalWorkerOptions.workerSrc = worker.default || worker
      return pdfjs
    })
  }
  return pdfjsPromise
}

function itemPosition(item) {
  if (Array.isArray(item.transform)) {
    return { x: item.transform[4] || 0, y: item.transform[5] || 0 }
  }
  return { x: item.x || 0, y: item.y || 0 }
}

export function normalizeTextItems(items = []) {
  const sorted = [...items]
    .filter((item) => typeof item.str === 'string' && item.str.trim())
    .map((item) => {
      const { x, y } = itemPosition(item)
      return { ...item, x, y, height: item.height || 10 }
    })
    .sort((a, b) => b.y - a.y || a.x - b.x)

  const rows = []
  sorted.forEach((item) => {
    const last = rows[rows.length - 1]
    const tolerance = Math.max(2, Math.min(last?.height || 10, item.height) * 0.6)
    if (last && Math.abs(last.y - item.y) <= tolerance) {
      last.items.push(item)
      last.height = Math.max(last.height, item.height)
    } else {
      rows.push({ y: item.y, height: item.height, items: [item] })
    }
  })

  return rows.map((row) => ({
    y: row.y,
    height: row.height,
    text: row.items.sort((a, b) => a.x - b.x).map((item) => item.str).join('').replace(/\s+/g, ' ').trim(),
  })).filter((row) => row.text)
}

export function rowsToParagraphs(rows = [], gapRatio = 1.8) {
  const paragraphs = []
  rows.forEach((row, index) => {
    if (index === 0) {
      paragraphs.push(row.text)
      return
    }
    const previous = rows[index - 1]
    const gap = previous.y - row.y
    const lineHeight = Math.max(previous.height, row.height, 1)
    const startsNewBlock = /^([•\-*]|\d+[.)])\s/.test(row.text) || /^([•\-*]|\d+[.)])\s/.test(previous.text)
    if (gap > lineHeight * gapRatio || startsNewBlock) {
      paragraphs.push(row.text)
    } else {
      paragraphs[paragraphs.length - 1] = `${paragraphs[paragraphs.length - 1]} ${row.text}`
    }
  })
  return paragraphs.filter(Boolean)
}

export async function extractPdfText(bytes, onProgress) {
  const pdfjs = await loadPdfJs()
  const pdf = await pdfjs.getDocument({ data: bytes, useSystemFonts: true }).promise
  const pages = []
  let characterCount = 0

  for (let number = 1; number <= pdf.numPages; number += 1) {
    const page = await pdf.getPage(number)
    const content = await page.getTextContent()
    const rows = normalizeTextItems(content.items)
    const paragraphs = rowsToParagraphs(rows)
    characterCount += paragraphs.join('').length
    pages.push({ number, paragraphs })
    onProgress?.(number, pdf.numPages)
  }

  if (characterCount === 0) {
    throw new Error('No selectable text was found. Scanned PDFs need OCR before conversion.')
  }
  return pages
}

export async function createDocxBlob(pages, sourceName) {
  const { Document, Packer, Paragraph, TextRun } = await import('docx')
  const children = []

  pages.forEach((page, index) => {
    if (index > 0) children.push(new Paragraph({ pageBreakBefore: true, children: [] }))
    if (page.paragraphs.length === 0) {
      children.push(new Paragraph({
        children: [new TextRun({ text: `Page ${page.number}: no selectable text`, italics: true })],
      }))
      return
    }
    page.paragraphs.forEach((text) => {
      children.push(new Paragraph({
        children: [new TextRun({ text })],
        spacing: { after: 160 },
      }))
    })
  })

  const document = new Document({
    creator: 'Tipde',
    title: safeBaseName(sourceName),
    description: 'Converted locally with Tipde',
    sections: [{ children }],
  })
  return Packer.toBlob(document)
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('The browser could not export the rendered page.'))
    }, type, quality)
  })
}

export async function renderPdfPages(bytes, { scale = 1.5, quality = 0.78, onProgress } = {}) {
  const pdfjs = await loadPdfJs()
  const pdf = await pdfjs.getDocument({ data: bytes }).promise
  const pages = []

  for (let number = 1; number <= pdf.numPages; number += 1) {
    const page = await pdf.getPage(number)
    const viewport = page.getViewport({ scale })
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(viewport.width))
    canvas.height = Math.max(1, Math.round(viewport.height))
    const context = canvas.getContext('2d', { alpha: false })
    if (!context) throw new Error('Canvas rendering is not available in this browser.')
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    await page.render({ canvasContext: context, viewport }).promise
    const blob = await canvasToBlob(canvas, 'image/jpeg', quality)
    pages.push({
      number,
      blob,
      width: canvas.width,
      height: canvas.height,
      widthPt: viewport.width / scale,
      heightPt: viewport.height / scale,
    })
    onProgress?.(number, pdf.numPages)
  }

  return pages
}

async function embedImage(pdfDocument, file, bytes) {
  if (file.type === 'image/png' || /\.png$/i.test(file.name || '')) {
    return pdfDocument.embedPng(bytes)
  }
  if (file.type === 'image/jpeg' || /\.(jpe?g)$/i.test(file.name || '')) {
    return pdfDocument.embedJpg(bytes)
  }
  throw new Error(`${file.name || 'This file'} is not a JPG or PNG image.`)
}

export async function imagesToPdf(files, { pageSize = 'a4', margin = 24, onProgress } = {}) {
  const { PDFDocument } = await import('pdf-lib')
  const pdfDocument = await PDFDocument.create()
  const [baseWidth, baseHeight] = PAGE_SIZES[pageSize] || PAGE_SIZES.a4

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index]
    const bytes = await fileToBytes(file)
    const image = await embedImage(pdfDocument, file, bytes)
    const landscape = image.width > image.height
    const pageWidth = landscape ? baseHeight : baseWidth
    const pageHeight = landscape ? baseWidth : baseHeight
    const safeMargin = Math.max(0, Math.min(Number(margin) || 0, Math.min(pageWidth, pageHeight) / 3))
    const scale = Math.min((pageWidth - safeMargin * 2) / image.width, (pageHeight - safeMargin * 2) / image.height)
    const width = image.width * scale
    const height = image.height * scale
    const page = pdfDocument.addPage([pageWidth, pageHeight])
    page.drawImage(image, {
      x: (pageWidth - width) / 2,
      y: (pageHeight - height) / 2,
      width,
      height,
    })
    onProgress?.(index + 1, files.length)
  }

  return pdfBlob(await pdfDocument.save({ useObjectStreams: true }))
}

export async function mergePdfs(files, onProgress) {
  const { PDFDocument } = await import('pdf-lib')
  const merged = await PDFDocument.create()

  for (let index = 0; index < files.length; index += 1) {
    const source = await PDFDocument.load(await fileToBytes(files[index]))
    const copiedPages = await merged.copyPages(source, source.getPageIndices())
    copiedPages.forEach((page) => merged.addPage(page))
    onProgress?.(index + 1, files.length)
  }

  return pdfBlob(await merged.save({ useObjectStreams: true }))
}

export async function compressPdfStructure(file, onProgress) {
  const { PDFDocument } = await import('pdf-lib')
  const source = await PDFDocument.load(await fileToBytes(file))
  const optimized = await PDFDocument.create()
  const copiedPages = await optimized.copyPages(source, source.getPageIndices())
  copiedPages.forEach((page) => optimized.addPage(page))
  onProgress?.(source.getPageIndices().length, source.getPageIndices().length)
  return pdfBlob(await optimized.save({ useObjectStreams: true }))
}

export async function compressPdfRaster(file, { scale = 1.2, quality = 0.7, onProgress } = {}) {
  const pages = await renderPdfPages(await fileToBytes(file), { scale, quality, onProgress })
  const { PDFDocument } = await import('pdf-lib')
  const pdfDocument = await PDFDocument.create()

  for (let index = 0; index < pages.length; index += 1) {
    const page = pages[index]
    const image = await pdfDocument.embedJpg(new Uint8Array(await page.blob.arrayBuffer()))
    const outputPage = pdfDocument.addPage([page.widthPt, page.heightPt])
    outputPage.drawImage(image, { x: 0, y: 0, width: page.widthPt, height: page.heightPt })
  }

  return pdfBlob(await pdfDocument.save({ useObjectStreams: true }))
}

export async function pdfPagesToZip(pages, baseName) {
  const JSZip = (await import('jszip')).default
  const zip = new JSZip()
  pages.forEach((page) => {
    const name = `${baseName}-page-${String(page.number).padStart(2, '0')}.jpg`
    zip.file(name, page.blob)
  })
  return zip.generateAsync({ type: 'blob', compression: 'STORE' })
}
