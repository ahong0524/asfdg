import dayjs from 'dayjs'
import i18n from '@/i18n/index.js'

const reg =
  /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/
export default (value, format = 'YYYY-MM-DD') => {
  // dayjs 转化成 标准的时间格式
  let val
  if (!isNaN(value)) {
    val = parseInt(value)
    return dayjs(val).format(format)
  } else if (reg.test(value)) {
    return value
  } else {
    return i18n.global.t('msg.excel.nodateFormate')
  }
}
