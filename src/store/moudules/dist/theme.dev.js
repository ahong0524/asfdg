"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _storage = require("@/utils/storage.js");

var _common = require("@/common/common.js");

var _default = {
  namespaced: true,
  state: {
    myColor: (0, _storage.getItem)(_common.MYCOLOR) || '#cccccc'
  },
  mutations: {
    // 设置主题色
    setMyColor: function setMyColor(state, color) {
      // 本地存储
      (0, _storage.setItem)(_common.MYCOLOR, color);
      state.myColor = color;
    }
  }
};
exports["default"] = _default;