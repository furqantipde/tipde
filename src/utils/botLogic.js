export const getInitialMessage = () => {
  return {
    text: "Hello! I'm TipdeBot, your assistant for tipde.top. I can help you with video downloaders, image tools, PDF tools, AI tools, and more. How can I help you today?",
    sender: 'bot',
    timestamp: new Date(),
  };
};

const KNOWLEDGE_BASE = [
  {
    keywords: ['youtube', 'video', 'download', 'tiktok', 'facebook'],
    response: "To download videos from YouTube, TikTok, or Facebook:\n1. Go to the 'Video Downloader' section on tipde.top.\n2. Paste the video URL into the input box.\n3. Click 'Download' and choose your preferred format/quality.",
    category: 'Video Tools'
  },
  {
    keywords: ['compress', 'image', 'size', 'reduce' ,'photo'],
    response: "To compress an image:\n1. Open the 'Image Compressor' tool on tipde.top.\n2. Upload your image.\n3. Select the compression level (quality).\n4. Click 'Compress' and download the optimized image.",
    category: 'Image Tools'
  },
  {
    keywords: ['resize', 'dimension', 'scale'],
    response: "To resize an image:\n1. Go to the 'Image Resizer' tool.\n2. Upload your image.\n3. Enter your desired width and height.\n4. Click 'Resize' to get your new image.",
    category: 'Image Tools'
  },
  {
    keywords: ['pdf', 'merge', 'combine', 'join'],
    response: "To merge PDFs:\n1. Navigate to the 'PDF Merge' tool.\n2. Upload all the PDF files you want to combine.\n3. Click 'Merge PDF'.\n4. Download the single merged file.\nTip: Keep files under 50MB for best performance.",
    category: 'PDF Tools'
  },
    {
    keywords: ['split', 'separate', 'pdf'],
    response: "To split a PDF:\n1. Go to the 'PDF Split' tool.\n2. Upload your PDF.\n3. Select the pages or range you want to extract.\n4. Click 'Split' and download your new files.",
    category: 'PDF Tools'
  },
  {
    keywords: ['ai', 'summarize', 'summary', 'text'],
    response: "Use our AI Text Summarizer:\n1. Paste your text into the 'Text Summarizer' tool.\n2. Click 'Summarize'.\n3. The AI will provide a concise summary of your specific content.",
    category: 'AI Tools'
  },
  {
    keywords: ['qr', 'code', 'generator'],
    response: "To generate a QR code:\n1. Open the 'QR Code Generator'.\n2. Enter the URL or text.\n3. Customize the design if needed.\n4. Download your QR code image.",
    category: 'Utility Tools'
  },
  {
    keywords: ['password', 'secure', 'generate'],
    response: "Need a secure password?\n1. Use the 'Password Generator' tool.\n2. Select the length and character types (symbols, numbers).\n3. Click 'Generate' and copy your new strong password.",
    category: 'Utility Tools'
  }
];

const SAFETY_KEYWORDS = ['password', 'email', 'credit', 'card', 'personal', 'info', 'hack', 'illegal'];

export const processUserMessage = (text) => {
  const lowerText = text.toLowerCase();

  // Safety Check
  if (SAFETY_KEYWORDS.some(k => lowerText.includes(k)) && (lowerText.includes('my') || lowerText.includes('share') || lowerText.includes('hack'))) {
     return {
      text: "Please remember: Never share your personal information, passwords, or credit card details here. I am an AI assistant and cannot perform secure actions like logging in or hacking.",
      sender: 'bot',
      timestamp: new Date()
     }
  }

  // Greeting
  if (lowerText.match(/^(hi|hello|hey|greetings)/)) {
    return {
      text: "Hello there! How can I assist you with tipde.top tools today?",
      sender: 'bot',
      timestamp: new Date()
    };
  }

  // Help
  if (lowerText === 'help' || lowerText.includes('what can you do')) {
    return {
        text: "I can guide you through using our Video Downloaders, Image Tools, PDF Tools, and AI Utilities. Just ask me something like 'How do I merge PDFs?' or 'Help me compress an image'.",
        sender: 'bot',
        timestamp: new Date()
    }
  }

  // Search Knowledge Base
  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some(k => lowerText.includes(k))) {
      return {
        text: item.response,
        sender: 'bot',
        timestamp: new Date()
      };
    }
  }

  // Fallback
  return {
    text: "I'm not sure specifically about that. Try asking about 'video downloader', 'image compressor', 'PDF tools', or 'AI tools'. You can also browse all available tools on the tipde.top homepage.",
    sender: 'bot',
    timestamp: new Date()
  };
};
