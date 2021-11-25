"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _variables = _interopRequireDefault(require("@/styles/variables.scss"));

var _theme = require("../../utils/theme.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  token: function token(state) {
    return state.user.token;
  },
  userInfo: function userInfo(state) {
    return state.user.userInfo;
  },
  hasUserInfo: function hasUserInfo(state) {
    return JSON.stringify(state.user.userInfo) !== '{}';
  },
  cssVar: function cssVar(state) {
    return _objectSpread({}, _variables["default"], {}, (0, _theme.generateColors)(state.theme.myColor));
  },
  sideBarOpen: function sideBarOpen(state) {
    return state.app.sideBarOpened;
  },
  language: function language(state) {
    return state.app.language;
  },
  theme_color: function theme_color(state) {
    return state.theme.myColor;
  }
}; // colors = {
//   menuBg:
//   menuHover:
//   subMenuBg:,
//   subMenuHover:
// }

exports["default"] = _default;