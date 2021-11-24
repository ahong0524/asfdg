export const passwordValidate = () => {
  return (rule, value, callback) => {
    // 获取到输入的值做验证  至少是六位
    if (value.length < 6) {
      callback(new Error('密码至少是六位'))
    } else {
      callback() // ok
    }
  }
}
