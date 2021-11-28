"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchLang = exports.getTitle = void 0;

var _index = _interopRequireDefault(require("@/i18n/index.js"));

var _vue = require("vue");

var _index2 = _interopRequireDefault(require("@/store/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getTitle = function getTitle(title) {
  return _index["default"].global.t('msg.route.' + title);
};

exports.getTitle = getTitle;

var watchLang = function watchLang() {
  for (var _len = arguments.length, cbs = new Array(_len), _key = 0; _key < _len; _key++) {
    cbs[_key] = arguments[_key];
  }

  (0, _vue.watch)(function () {
    return _index2["default"].getters.language;
  }, function () {
    cbs.forEach(function (cb) {
      cb(_index2["default"].getters.language);
    });
  });
};

exports.watchLang = watchLang;