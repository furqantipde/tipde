import Base64Tool from './Base64Tool.jsx'
import CssMinifier from './CssMinifier.jsx'
import HtmlFormatter from './HtmlFormatter.jsx'
import JsMinifier from './JsMinifier.jsx'
import JsonFormatter from './JsonFormatter.jsx'
import PasswordGenerator from './PasswordGenerator.jsx'
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
}
