"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("@/i18n/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var t = _index["default"].global.t;
var _default = [{
  label: t('msg.article.ranking'),
  prop: 'ranking'
}, {
  label: t('msg.article.title'),
  prop: 'title'
}, {
  label: t('msg.article.author'),
  prop: 'author'
}, {
  label: t('msg.article.publicDate'),
  prop: 'publicDate'
}, {
  label: t('msg.article.desc'),
  prop: 'desc'
}, {
  label: t('msg.article.action'),
  prop: 'action'
}];
exports["default"] = _default;