// 用户鉴权  路由守卫
import router from './router/index'
import store from './store/index'
const whiteRouter = ['/']
// 进入每个路由 都会执行 这个钩子
router.beforeEach(async (to, from, next) => {
  // 用户鉴权
  // 当用户未登录时(没有token) 只能进入Login 页面
  // 用户登录后 token 未过期之前 不允许进入login 页面

  // 登录
  if (store.getters.token) {
    if (to.path === '/') {
      // 不允许
      next('Index')
    } else {
      // 登陆成功 跳转到首页
      if (!store.getters.hasUserInfo) {
        // 判断如果没有用户的信息 就去发送axios
        // setTimeout(async () => {
        //   await store.dispatch('user/getUserInfo')
        //   next()
        // }, 70000)
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
    // 未登录
  } else {
    if (whiteRouter.indexOf(to.path) > -1) {
      next()
    } else {
      next('/')
    }
  }
})
