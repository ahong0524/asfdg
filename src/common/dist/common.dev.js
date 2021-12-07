"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorTables = exports.colorMap = exports.predefineColor = exports.USER_RELATION = exports.TAG_VIEWS = exports.MYCOLOR = exports.LANGUAGE = exports.TIME_OUT = exports.TIME_STAMP = exports.USER_INFO = exports.TOKEN = void 0;
var TOKEN = 'token';
exports.TOKEN = TOKEN;
var USER_INFO = 'user_info';
exports.USER_INFO = USER_INFO;
var TIME_STAMP = 'time_stamp'; // 2小时

exports.TIME_STAMP = TIME_STAMP;
var TIME_OUT = 2 * 60 * 60 * 1000;
exports.TIME_OUT = TIME_OUT;
var LANGUAGE = 'language'; // 主题色

exports.LANGUAGE = LANGUAGE;
var MYCOLOR = 'theme_color';
exports.MYCOLOR = MYCOLOR;
var TAG_VIEWS = 'tag_views';
exports.TAG_VIEWS = TAG_VIEWS;
var USER_RELATION = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'role',
  开通时间: 'openTime' // 头像: 'avatar'

}; // el-color-picker 默认颜色

exports.USER_RELATION = USER_RELATION;
var predefineColor = ['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', 'rgba(255, 69, 0, 0.68)', 'rgb(255, 120, 0)', 'hsv(51, 100, 98)', 'hsva(120, 40, 94, 0.5)', 'hsl(181, 100%, 37%)', 'hsla(209, 100%, 56%, 0.73)', '#c7158577'];
exports.predefineColor = predefineColor;
var colorMap = {
  '#3a8ee6': 'shade-1',
  '#409eff': 'primary',
  '#53a8ff': 'light-1',
  '#66b1ff': 'light-2',
  '#79bbff': 'light-3',
  '#8cc5ff': 'light-4',
  '#a0cfff': 'light-5',
  '#b3d8ff': 'light-6',
  '#c6e2ff': 'light-7',
  '#d9ecff': 'light-8',
  '#ecf5ff': 'light-9',
  '#0d84ff': 'light-3'
};
exports.colorMap = colorMap;
var colorTables = {
  'shade-1': 'color(primary shade(10%))',
  'light-1': 'color(primary tint(10%))',
  'light-2': 'color(primary tint(20%))',
  'light-3': 'color(primary tint(30%))',
  'light-4': 'color(primary tint(40%))',
  'light-5': 'color(primary tint(50%))',
  'light-6': 'color(primary tint(60%))',
  'light-7': 'color(primary tint(70%))',
  'light-8': 'color(primary tint(80%))',
  'light-9': 'color(primary tint(90%))',
  subMenuHover: 'color(primary tint(70%))',
  subMenuBg: 'color(primary tint(80%))',
  menuHover: 'color(primary tint(90%))',
  menuBg: 'color(primary)'
};
exports.colorTables = colorTables;