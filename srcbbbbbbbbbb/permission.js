// 用户鉴权 路由守卫
import router from './router/index'
import store from './store/index'

const whiteRouter = ['/login', '/asdasf']
// 进入每一个路由都会执行这个钩子
router.beforeEach(async (to, from, next) => {
  /*
  用户鉴权
    当用户未登录时（没有token），只能进入login页面
    用户登录后，login未过期之前。不允许进入login页面
*/
  // 登录
  if (store.getters.token) {
    if (to.path === '/login') {
      // 不允许
      next('/')
    } else {
      // 登录成功 跳转到首页
      if (!store.getters.hasUserInofo) {
        // 判断没用用户信息就去发送axios
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
      next('/login')
    }
  }
})
