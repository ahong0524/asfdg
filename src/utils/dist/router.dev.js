"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateMenus = generateMenus;
exports.generateFuse = exports.filterRouter = void 0;

var _path = _interopRequireDefault(require("path"));

var _index = _interopRequireDefault(require("@/i18n/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// 1去除重复的二级路由 保持一二级路由层级关系
// 获取所有的二级路由
var getChildrenRouters = function getChildrenRouters(routes) {
  var result = [];
  routes.forEach(function (route) {
    if (route.children && route.children.length > 0) {
      // 当前route 是一级路由
      result.push.apply(result, _toConsumableArray(route.children));
    }
  });
  return result;
};

var filterRouter = function filterRouter(routes) {
  // 获取所有的二级路由
  var childrenRouters = getChildrenRouters(routes);
  return routes.filter(function (router) {
    // 只要在childrenRouters 存在 说明是重复的二级路由 不保存
    return !childrenRouters.find(function (childrenRoute) {
      return childrenRoute.path === router.path;
    });
  });
}; // 2将routes (filterRouter后的)为了配合v-for遍历生成菜单 需要格式化数据


exports.filterRouter = filterRouter;

var isNull = function isNull(data) {
  if (!data) return true;
  if (JSON.stringify(data) === '{}') return true;
  if (JSON.stringify(data) === '[]') return true;
  return false;
};

function generateMenus(routes) {
  var basePath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var result = []; // 遍历路由表

  routes.forEach(function (item) {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return; // 存在 children 不存在 meta，进入迭代

    if (isNull(item.meta) && !isNull(item.children)) {
      result.push.apply(result, _toConsumableArray(generateMenus(item.children)));
      return;
    } // 合并 path 作为跳转路径


    var routePath = _path["default"].resolve(basePath, item.path); // 路由分离之后，存在同名父路由的情况，需要单独处理


    var route = result.find(function (item) {
      return item.path === routePath;
    });

    if (!route) {
      route = _objectSpread({}, item, {
        path: routePath,
        children: []
      }); // icon 与 title 必须全部存在

      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route);
      }
    } // 存在 children 进入迭代到children


    if (item.children) {
      var _route$children;

      (_route$children = route.children).push.apply(_route$children, _toConsumableArray(generateMenus(item.children, route.path)));
    }
  });
  return result;
} // 3 配合fuse.js 处理路由数据源 满足fuse.js的搜索方式
// @param routes 是filter过滤去重以后的路由


var generateFuse = function generateFuse(routes) {
  var titles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var res = []; // 遍历routes

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var route = _step.value;
      var data = {
        path: route.path,
        title: _toConsumableArray(titles) // 不迭代的话 这里是个空title 迭代的话 这个以后就是一级标题的title

      }; // 条件 1具备meta&&meta.title  2 过滤掉动态路由 /:id

      var reg = /.*\/:.*/;

      if (route.meta && route.meta.title && !reg.exec(route.path)) {
        // 变成国际化
        var title = _index["default"].global.t('msg.route.' + route.meta.title);

        data.title = [].concat(_toConsumableArray(data.title), [title]);
        res.push(data);
      }

      if (route.children && route.children.length > 0) {
        var subRes = generateFuse(route.children, data.title);

        if (subRes.length > 0) {
          res = [].concat(_toConsumableArray(res), _toConsumableArray(subRes));
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return res;
};

exports.generateFuse = generateFuse;