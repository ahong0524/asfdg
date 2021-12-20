"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tableLabels = exports.selectDynamicLabel = exports.dynamicData = void 0;

var _vue = require("vue");

var _dynamicData = _interopRequireDefault(require("./dynamicData.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dynamicData = (0, _vue.ref)(_dynamicData["default"]); // 默认勾选所有 checkbox 动态选择列

exports.dynamicData = dynamicData;
var selectDynamicLabel = (0, _vue.ref)([]); // 初始化 checkbox-group

exports.selectDynamicLabel = selectDynamicLabel;

var initSelectDynamicLabel = function initSelectDynamicLabel() {
  selectDynamicLabel.value = dynamicData.value.map(function (item) {
    return item.label;
  });
};

initSelectDynamicLabel(); // 表格的列数据

var tableLabels = (0, _vue.ref)([]); // 监听选择的列

exports.tableLabels = tableLabels;
(0, _vue.watch)(selectDynamicLabel, function (val, old) {// 执行列表的列的渲染
});