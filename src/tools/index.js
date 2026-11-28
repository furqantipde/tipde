import Base64Tool from './Base64Tool.jsx'
import ColorConverterTool from './ColorConverterTool.jsx'
import CssMinifier from './CssMinifier.jsx'
import HashGeneratorTool from './HashGeneratorTool.jsx'
import HtmlFormatter from './HtmlFormatter.jsx'
import JsMinifier from './JsMinifier.jsx'
import JsonFormatter from './JsonFormatter.jsx'
import JwtDecoderTool from './JwtDecoderTool.jsx'
import PasswordGenerator from './PasswordGenerator.jsx'
import PdfToJpgTool from './PdfToJpgTool.jsx'
import PdfToWordTool from './PdfToWordTool.jsx'
import JpgToPdfTool from './JpgToPdfTool.jsx'
import CompressPdfTool from './CompressPdfTool.jsx'
import MergePdfTool from './MergePdfTool.jsx'
import TextCaseTool from './TextCaseTool.jsx'
import TimestampConverter from './TimestampConverter.jsx'
import UrlEncoder from './UrlEncoder.jsx'
import UuidGenerator from './UuidGenerator.jsx'
import WordCounter from './WordCounter.jsx'

export const toolComponents = {
  'json-formatter': JsonFormatter,
  'html-formatter': HtmlFormatter,
  'css-minifier': CssMinifier,
  'javascript-minifier': JsMinifier,
  'base64-encoder-decoder': Base64Tool,
  'url-encoder-decoder': UrlEncoder,
  'uuid-generator': UuidGenerator,
  'password-generator': PasswordGenerator,
  'word-counter': WordCounter,
  'timestamp-converter': TimestampConverter,
  'pdf-to-word': PdfToWordTool,
  'jpg-to-pdf': JpgToPdfTool,
  'compress-pdf': CompressPdfTool,
  'merge-pdf': MergePdfTool,
  'pdf-to-jpg': PdfToJpgTool,
  'text-case-converter': TextCaseTool,
  'hex-rgb-converter': ColorConverterTool,
  'hash-generator': HashGeneratorTool,
  'jwt-decoder': JwtDecoderTool,
}
