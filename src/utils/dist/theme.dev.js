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

// 基于主色填充不同程度的白色
// 转化16进制
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
          // 2、分析原始样式 找出需要替换的颜色  并且做标记
          newStyle = getStyleTemplate(originalStyle); // 3、根据主色生成对应的情景色

          newColors = generateColors(primary); // 4、在newStyle的模板中将标记都替换成生成的色值

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
  var url, _ref, data;

  return regeneratorRuntime.async(function getOriginalStyle$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // const version = require('element-plus/package.json').version
          // const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
          url = "http://localhost:8080/element-plus.css";
          _context2.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get(url));

        case 3:
          _ref = _context2.sent;
          data = _ref.data;
          return _context2.abrupt("return", data);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var getStyleTemplate = function getStyleTemplate(Style) {
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
    // 将主色应用到 color 函数中
    var value = _common.colorTables[key].replace(new RegExp(/primary/g), primary); // 生成16进制的颜色 color('#cccccc' tint(10%))


    colors[key] = '#' + (0, _rgbHex["default"])(_cssColorFunction["default"].convert(value));
  });
  return colors;
};
/*
  将生成的样式写入到 head 标签中
*/


exports.generateColors = generateColors;

var writeStyleToHearTag = function writeStyleToHearTag(data) {
  var style = document.createElement('style');
  style.innerHTML = data;
  document.head.appendChild(style);
};

exports.writeStyleToHearTag = writeStyleToHearTag;