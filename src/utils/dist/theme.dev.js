"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeStyleToHearTag = exports.generateColors = exports.generateNewStyle = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _common = require("@/common/common.js");

var _cssColorFunction = _interopRequireDefault(require("css-color-function"));

var _rgbHex = _interopRequireDefault(require("rgb-hex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 转化16进制
// 基于主色填充不同程度的白色
// 生成最终的样式
var generateNewStyle = function generateNewStyle(primary) {
  var originalStyle, newStyle, newColors;
  return regeneratorRuntime.async(function generateNewStyle$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (primary) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return");

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(getOriginalStyle());

        case 4:
          originalStyle = _context.sent;
          // 2.分析原始样式 找出需要替换的颜色 做标记
          newStyle = gitStyleTemplate(originalStyle); // console.log(newStyle)
          // 3.根据主色生成对应的情景色

          newColors = generateColors(primary); // console.log(newColors)
          // 4.在newStyle的模板中 将标记都替换成生成的色值

          Object.keys(newColors).forEach(function (key) {
            newStyle = newStyle.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + newColors[key]);
          });
          return _context.abrupt("return", newStyle);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.generateNewStyle = generateNewStyle;

var getOriginalStyle = function getOriginalStyle() {
  var version, url, _ref, data;

  return regeneratorRuntime.async(function getOriginalStyle$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          version = require('element-plus/package.json').version;
          url = "https://unpkg.com/element-plus@".concat(version, "/dist/index.css");
          _context2.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get(url));

        case 4:
          _ref = _context2.sent;
          data = _ref.data;
          return _context2.abrupt("return", data);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var gitStyleTemplate = function gitStyleTemplate(Style) {
  Object.keys(_common.colorMap).forEach(function (key) {
    var value = _common.colorMap[key];
    Style = Style.replace(new RegExp(key, 'gi'), value);
  });
  return Style;
};

var generateColors = function generateColors(primary) {
  // 根据主色 生成对应的情景色
  var colors = {
    primary: primary
  };
  Object.keys(_common.colorTables).forEach(function (key) {
    // 将所有的主色 都应用在 color函数中
    var value = _common.colorTables[key].replace(new RegExp(/primary/g), primary); // 生成颜色  16进制的颜色 color('#cccccc',tint(10%))


    colors[key] = '#' + (0, _rgbHex["default"])(_cssColorFunction["default"].convert(value));
  });
  return colors;
}; // 将生成的样式 写入到head标签中


exports.generateColors = generateColors;

var writeStyleToHearTag = function writeStyleToHearTag(newStyle) {
  var style = document.createElement('style');
  style.innerHTML = newStyle;
  document.head.appendChild(style);
};

exports.writeStyleToHearTag = writeStyleToHearTag;