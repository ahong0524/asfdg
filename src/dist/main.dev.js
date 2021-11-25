"use strict";

var _vue = require("vue");

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _element = _interopRequireDefault(require("./plugins/element"));

require("./styles/index.scss");

var _index2 = _interopRequireDefault(require("./icons/index"));

var _index3 = _interopRequireDefault(require("@/i18n/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 引入样式入口文件
//  加载svg的处理
// 用户鉴权
// import './permission.js'
// 导入i18n
var app = (0, _vue.createApp)(_App["default"]);
(0, _element["default"])(app);
(0, _index2["default"])(app);
app.use(_store["default"]).use(_router["default"]).use(_index3["default"]).mount('#app');
/*
  中英文切换
  1需要一个变量locale 控制语环境、
  2所有的语言中的数据源 药提前准备好
  3定义一个方法获取对应语言包中的数据
  借助i18n 插件 完成
  1,npm i vue-i18n@next  也因为项目vue3.2  所以i18n 必须>9.0.0
*/