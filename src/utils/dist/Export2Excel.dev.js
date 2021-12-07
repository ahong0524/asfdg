"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportJsonToExcel = void 0;

var _fileSaver = require("file-saver");

var _xlsx = _interopRequireDefault(require("xlsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var datenum = function datenum(v, date1904) {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
};

var sheet_from_array_of_arrays = function sheet_from_array_of_arrays(data, opts) {
  var ws = {};
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };

  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = {
        v: data[R][C]
      };
      if (cell.v == null) continue;

      var cell_ref = _xlsx["default"].utils.encode_cell({
        c: C,
        r: R
      });

      if (typeof cell.v === 'number') cell.t = 'n';else if (typeof cell.v === 'boolean') cell.t = 'b';else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = _xlsx["default"].SSF._table[14];
        cell.v = datenum(cell.v);
      } else cell.t = 's';
      ws[cell_ref] = cell;
    }
  }

  if (range.s.c < 10000000) ws['!ref'] = _xlsx["default"].utils.encode_range(range);
  return ws;
};

function Workbook() {
  if (!(this instanceof Workbook)) {
    return new Workbook();
  }

  this.SheetNames = [];
  this.Sheets = {};
}

var s2ab = function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);

  for (var i = 0; i != s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xff;
  }

  return buf;
};
/*
 * 生成execl文件并下载
 *  params:{
 *    header:表头 --> ['姓名','联系方式','角色','开通时间']
 *    data: 数据  --> [['张三','321332131','18211108895',"['管理员','员工']"],['李四','123213213','18211108895',"['管理员']"]
 *    filename: 指定下载文件名称
 *    merges: 合并的单元格
 *    autoWidth: 是否自动列宽
 *    bookType: 下载后的文件类型（后缀名称）
 *  }
 */


var exportJsonToExcel = function exportJsonToExcel() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$multiHeader = _ref.multiHeader,
      multiHeader = _ref$multiHeader === void 0 ? [] : _ref$multiHeader,
      header = _ref.header,
      data = _ref.data,
      filename = _ref.filename,
      _ref$merges = _ref.merges,
      merges = _ref$merges === void 0 ? [] : _ref$merges,
      _ref$autoWidth = _ref.autoWidth,
      autoWidth = _ref$autoWidth === void 0 ? true : _ref$autoWidth,
      _ref$bookType = _ref.bookType,
      bookType = _ref$bookType === void 0 ? 'xlsx' : _ref$bookType;

  // 1. 设置文件名称
  filename = filename || 'excel-list'; // 2. 把数据解析为数组，并把表头添加到数组的头部

  data = _toConsumableArray(data);
  data.unshift(header); // 3. 解析多表头，把多表头的数据添加到数组头部（二维数组）

  for (var i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i]);
  } // 4. 设置 Excel 表工作簿（第一张表格）名称


  var ws_name = 'SheetJS'; // 5. 生成工作簿对象

  var wb = new Workbook(); // 6. 将 data 数组（json格式）转化为 Excel 数据格式

  var ws = sheet_from_array_of_arrays(data); // 7. 合并单元格相关（['A1:A2', 'B1:D1', 'E1:E2']）

  if (merges.length > 0) {
    if (!ws['!merges']) ws['!merges'] = [];
    merges.forEach(function (item) {
      ws['!merges'].push(_xlsx["default"].utils.decode_range(item));
    });
  } // 8. 单元格宽度相关


  if (autoWidth) {
    /*设置 worksheet 每列的最大宽度*/
    var colWidth = data.map(function (row) {
      return row.map(function (val) {
        /*先判断是否为null/undefined*/
        if (val == null) {
          return {
            wch: 10
          };
        } else if (val.toString().charCodeAt(0) > 255) {
          /*再判断是否为中文*/
          return {
            wch: val.toString().length * 2
          };
        } else {
          return {
            wch: val.toString().length
          };
        }
      });
    });
    /*以第一行为初始值*/

    var result = colWidth[0];

    for (var _i = 1; _i < colWidth.length; _i++) {
      for (var j = 0; j < colWidth[_i].length; j++) {
        if (result[j]['wch'] < colWidth[_i][j]['wch']) {
          result[j]['wch'] = colWidth[_i][j]['wch'];
        }
      }
    }

    ws['!cols'] = result;
  } // 9. 添加工作表（解析后的 excel 数据）到工作簿


  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws; // 10. 写入数据

  var wbout = _xlsx["default"].write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'
  }); // 11. 下载数据


  (0, _fileSaver.saveAs)(new Blob([s2ab(wbout)], {
    type: 'application/octet-stream'
  }), "".concat(filename, ".").concat(bookType));
  return new Promise(function (resolve, reject) {
    if (true) {
      resolve();
    } else {
      reject();
    }
  });
};

exports.exportJsonToExcel = exportJsonToExcel;