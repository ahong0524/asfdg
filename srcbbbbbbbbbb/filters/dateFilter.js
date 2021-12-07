import dayjs from 'dayjs'
import i18n from '@/i18n/index.js'
export default (value, format = "YYYY-MM-DD") => {
  // dayjs 转化成标准时间格式
  let val
  if (!isNaN(value)) {
    val = parseInt(value)
    return dayjs(val).format(format)
  } else {
    return i18n.global.t('msg.excel.nodateFormate')
  }
}
