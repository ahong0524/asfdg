import * as local from './storage'
import { TIME_STAMP, TIME_OUT } from '../common/common'
// 设置tonken事件
export const setTimeStamp = () => {
  // 保存时间
  local.setItem(TIME_STAMP, Date.now())
}
// 获取保存的token 事件
const getTimeStamp = () => {
  return local.getItem(TIME_STAMP)
}
// 检测check时间是否超时  true 不过期  返回false 过期
export const isCheckTimeOut = () => {
  // 现在时间 -保存的时间>2小时
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  return currentTime - timeStamp <= TIME_OUT
}
