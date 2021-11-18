// 存储数据
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
// 获取
export const getItem = (key) => {
  const value = window.localStorage.getItem(key)
  try {
    // 是对象字符串
    return JSON.parse(value)
  } catch (err) {
    // 不是一个对象字符串
    return value
  }
}
// 删除 当个
export const deleteItem = (key) => {
  window.localStorage.removeItem(key)
}
// 清空
export const clearItem = () => {
  window.localStorage.deleteItem()
}
