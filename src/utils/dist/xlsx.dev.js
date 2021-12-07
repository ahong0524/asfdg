"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFileAsExcel = exports.isexcel = exports.isJs = exports.formatDate = exports.isExcel = exports.getHeaderRow = void 0;

var _xlsx = _interopRequireDefault(require("xlsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 获取表头（通用方式）
var getHeaderRow = function getHeaderRow(sheet) {
  var headers = [];

  var range = _xlsx["default"].utils.decode_range(sheet['!ref']);

  var C;
  var R = range.s.r;
  /* start in the first row */

  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    var cell = sheet[_xlsx["default"].utils.encode_cell({
      c: C,
      r: R
    })];
    /* find the cell in the first row */


    var hdr = 'UNKNOWN ' + C; // <-- replace with your desired default

    if (cell && cell.t) hdr = _xlsx["default"].utils.format_cell(cell);
    headers.push(hdr);
  }

  return headers;
}; // 判断文件是否是excel


exports.getHeaderRow = getHeaderRow;

var isExcel = function isExcel(file) {
  return /\.(xlsx|xls|csv)$/.test(file.name);
}; //  解析 excel 导入的时间格式


exports.isExcel = isExcel;

var formatDate = function formatDate(numb) {
  var time = new Date((numb - 1) * 24 * 3600000 + 1);
  time.setYear(time.getFullYear() - 70);
  var year = time.getFullYear() + '';
  var month = time.getMonth() + 1 + '';
  var date = time.getDate() - 1 + '';
  return year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date);
}; // 判断文件是否是一个excel格式的文件


exports.formatDate = formatDate;

var isJs = function isJs(file) {
  return /\.js$/.test(file.name);
};

exports.isJs = isJs;

var isexcel = function isexcel(file) {
  return /.(xlsx|xls)$/.test(file.name);
}; // 解析excel数据


exports.isexcel = isexcel;

var readFileAsExcel = function readFileAsExcel(data) {
  // 2-1-1解析读取完毕后文件的数据 （插件）
  // 2-1-2利用xlsx 解析文件内容
  var wrokbook = _xlsx["default"].read(data, {
    type: 'array'
  }); // 2-1-3获取第一个表格（sheet）的名称


  var firstSheetName = wrokbook.SheetNames[0]; // 2-1-4读取第一个表格（sheet）的数据

  var firstSheetData = wrokbook.Sheets[firstSheetName]; // 2-1-5解析表头数据

  var headers = getHeaderRow(firstSheetData); // 2-1-5解析表体数据

  var bodys = _xlsx["default"].utils.sheet_to_json(firstSheetData);

  return {
    headers: headers,
    bodys: bodys
  };
};

exports.readFileAsExcel = readFileAsExcel;