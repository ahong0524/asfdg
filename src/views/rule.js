export const passwordValidate = (rule, value, callback) => {
  // 获取输入的值 再做验证 至少是6位
  if (value.length < 6) {
    callback(new Error('密码至少是6位')) // no
  } else {
    callback() // ok
  }
}
