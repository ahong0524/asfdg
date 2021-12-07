"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userDetalById = exports.deleteUserById = exports.getAllUser = exports.addUserByExcel = exports.getUser = void 0;

var _requset = _interopRequireDefault(require("../utils/requset"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 获取用户列表数据 post -->data      get --> params: {}
var getUser = function getUser(data) {
  return _requset["default"].request({
    url: '/user-manage/list',
    method: 'GET',
    params: data
  });
}; // excel 批量插入


exports.getUser = getUser;

var addUserByExcel = function addUserByExcel(data) {
  return _requset["default"].request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data: data
  });
}; // 获取所有的数据


exports.addUserByExcel = addUserByExcel;

var getAllUser = function getAllUser() {
  return _requset["default"].request({
    url: '/user-manage/all-list',
    method: 'GET'
  });
}; // 删除用户


exports.getAllUser = getAllUser;

var deleteUserById = function deleteUserById(id) {
  return _requset["default"].request({
    url: '/user-manage/detele/' + id,
    method: 'GET'
  });
}; // 用户详情


exports.deleteUserById = deleteUserById;

var userDetalById = function userDetalById(id) {
  return _requset["default"].request({
    url: '/user-manage/detele/' + id,
    method: 'GET'
  });
};

exports.userDetalById = userDetalById;