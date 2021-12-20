"use strict";

var _index = _interopRequireDefault(require("./router/index.js"));

var _index2 = _interopRequireDefault(require("./store/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 用户鉴权 路由守卫
var whiteRouter = ['/login']; // 进入每一个路由都会执行这个钩子

_index["default"].beforeEach(function _callee(to, from, next) {
  var _ref, menus, filterRoutes;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!_index2["default"].getters.token) {
            _context.next = 18;
            break;
          }

          if (!(to.path === '/login')) {
            _context.next = 5;
            break;
          }

          // 不允许
          next('/');
          _context.next = 16;
          break;

        case 5:
          if (_index2["default"].getters.hasUserInfo) {
            _context.next = 15;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(_index2["default"].dispatch('user/getUserInfo'));

        case 8:
          _ref = _context.sent;
          menus = _ref.permission.menus;
          _context.next = 12;
          return regeneratorRuntime.awrap(_index2["default"].dispatch('userPermission/filterPrivateRoutes', menus));

        case 12:
          filterRoutes = _context.sent;
          // 3. 将获取到的路由动态添加到路由表中
          // router.addRoute(rou)
          filterRoutes.forEach(function (activeRoute) {
            _index["default"].addRoute(activeRoute);
          });
          next(to.path);

        case 15:
          // 首次登录后 跳转到首页
          next();

        case 16:
          _context.next = 19;
          break;

        case 18:
          if (whiteRouter.indexOf(to.path) > -1) {
            // 未登录
            next();
          } else {
            next('login');
          }

        case 19:
        case "end":
          return _context.stop();
      }
    }
  });
});