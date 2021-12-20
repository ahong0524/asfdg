"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _role = require("@/api/role.js");

var _permission = require("@/api/permission.js");

var _storage = require("@/utils/storage.js");

var _common = require("@/common/common.js");

var state = {
  /*
    roles:[
      {
        id:
        title:
        descpritions:
        permissions:[{id:1,title:'用户列表'},{},{}]
      }
    ]
  */
  roles: (0, _storage.getItem)(_common.ROLE) || [],
  permissions: (0, _storage.getItem)(_common.PERMISSION) || [],
  permissions_: (0, _storage.getItem)(_common.PERMISSION_) || []
}; // 将权限的id转化为title

/*eslint-disable*/

var permissionIdToTitle = function permissionIdToTitle(id_arr, per_arr) {
  // id_arr:[1,1-1,1-2]
  var res = [];
  id_arr.forEach(function (id) {
    per_arr.forEach(function (per) {
      if (per.id === id) {
        res.push({
          id: id,
          title: per.permissionName
        });
      }

      if (per.children.length > 0) {
        per.children.forEach(function (c_per) {
          if (c_per.id === id) {
            res.push({
              id: id,
              title: c_per.permissionName
            });
          }
        });
      }
    });
  });
  return res;
};
/* eslint-enable */


var mutations = {
  initRoles: function initRoles(state, roles) {
    state.roles = roles;
    (0, _storage.setItem)(_common.ROLE, state.roles);
  },
  initPermissions: function initPermissions(state, permissions) {
    state.permissions = permissions;
    (0, _storage.setItem)(_common.PERMISSION, permissions);
    var temArr = [];
    permissions.forEach(function (item) {
      temArr.push({
        id: item.id,
        title: item.permissionName
      });

      if (item.children && item.children.length > 0) {
        item.children.forEach(function (childrenItem) {
          temArr.push({
            id: childrenItem.id,
            title: childrenItem.permissionName
          });
        });
      }
    });
    state.permissions_ = temArr;
    (0, _storage.setItem)(_common.PERMISSION_, temArr);
  },
  updatePermissionToRole: function updatePermissionToRole(state, _ref) {
    var roleId = _ref.roleId,
        permissionArray = _ref.permissionArray;
    state.roles.forEach(function (role) {
      if (role.id === roleId) {
        role.permissions = permissionIdToTitle(permissionArray, state.permissions); // [1,1-1,1-2]
      }
    });
  }
};
var actions = {
  // 初始化角色
  initRoles: function initRoles(_ref2) {
    var commit, state, roleList;
    return regeneratorRuntime.async(function initRoles$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit, state = _ref2.state;
            roleList = (0, _storage.getItem)(_common.ROLE);

            if (!(Array.isArray(roleList) && roleList.length <= 0)) {
              _context2.next = 7;
              break;
            }

            _context2.next = 5;
            return regeneratorRuntime.awrap((0, _role.getAllRole)());

          case 5:
            roleList = _context2.sent;
            commit('initRoles', roleList);

          case 7:
            // 请求每一个角色对应的权限
            roleList.forEach(function _callee(role) {
              var res;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return regeneratorRuntime.awrap((0, _role.getPermissionByRoleId)(role.id));

                    case 2:
                      res = _context.sent;
                      commit('updatePermissionToRole', {
                        roleId: role.id,
                        permissionArray: res
                      });

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  // 初始化权限
  initPermissions: function initPermissions(_ref3) {
    var commit, permissionList;
    return regeneratorRuntime.async(function initPermissions$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            commit = _ref3.commit;
            permissionList = (0, _storage.getItem)(_common.PERMISSION);

            if (!(Array.isArray(permissionList) && permissionList.length <= 0)) {
              _context3.next = 6;
              break;
            }

            _context3.next = 5;
            return regeneratorRuntime.awrap((0, _permission.getAllPermission)());

          case 5:
            permissionList = _context3.sent;

          case 6:
            commit('initPermissions', permissionList);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  // 清除权限和角色的相关缓存
  clearRoleAndPermission: function clearRoleAndPermission(_ref4) {
    var commit = _ref4.commit;
    commit('initRoles', []);
    commit('initPermissions', []);
  }
};
var _default = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions
};
exports["default"] = _default;