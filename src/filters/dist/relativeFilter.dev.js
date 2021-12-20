"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _relativeTime = _interopRequireDefault(require("dayjs/plugin/relativeTime"));

var _index = _interopRequireDefault(require("@/i18n/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 时间相对处理插件
// dayjs 使用 rt
_dayjs["default"].extend(_relativeTime["default"]);

var _default = function _default(val) {
  if (!isNaN(val)) {
    return (0, _dayjs["default"])().to((0, _dayjs["default"])(val));
  } else {
    return _index["default"].global.t('msg.excel.nodateFormate');
  }
};

exports["default"] = _default;