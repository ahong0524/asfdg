"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dataFilter = _interopRequireDefault(require("./dataFilter"));

var _relativeTime = _interopRequireDefault(require("./relativeTime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(app) {
  app.config.globalProperties.$filters = {
    dateFilter: _dataFilter["default"],
    relativeTime: _relativeTime["default"]
  };
};

exports["default"] = _default;