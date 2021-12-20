"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArticleList = void 0;

var _request = _interopRequireDefault(require("@/utils/request.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 获取所有文章列表
var getArticleList = function getArticleList(data) {
  return _request["default"].request({
    url: '/article/list',
    method: 'GET',
    params: data
  });
};

exports.getArticleList = getArticleList;