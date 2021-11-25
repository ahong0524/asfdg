"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vuex = require("vuex");

var _user = _interopRequireDefault(require("./moudules/user"));

var _getters = _interopRequireDefault(require("./moudules/getters"));

var _app = _interopRequireDefault(require("./moudules/app.js"));

var _theme = _interopRequireDefault(require("./moudules/theme.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _vuex.createStore)({
  getters: _getters["default"],
  modules: {
    user: _user["default"],
    app: _app["default"],
    theme: _theme["default"]
  }
});

exports["default"] = _default;