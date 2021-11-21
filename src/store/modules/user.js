import { login, getUserInfo } from '@/api/user.js'
import md5 from 'md5'
import * as utils from '@/utils/storage.js'
import { TOKEN, USER_INFO } from '@/common/common.js'
import router from '@/router/index.js'
import { setTimeStamp } from '@/utils/auth.js'
const state = {
  token: utils.getItem(TOKEN) || '',
  userInfo: utils.getItem(USER_INFO) || {}
}
const getters = {}
const mutations = {
  setToken(state, token) {
    // 保存操vuex
    state.token = token
    // 保存到本地存储中
    utils.setItem(TOKEN, token)
  },
  setUserInfo(state, userInfo) {
    // 保存操vuex
    state.userInfo = userInfo
    // 保存到本地存储中
    utils.setItem(USER_INFO, userInfo)
  }
}
const actions = {
  login({ commit }, info) {
    // 获取到账号密码信息
    // info.password = md5(info.password)
    const { username, password } = info
    return new Promise((resolve, reject) => {
      login({
        username,
        password: md5(password)
      })
        .then((res) => {
          // 保存token 到 vex  与 本次存储
          commit('setToken', res.token)
          // console.log(res.token)
          // 记录token的获取时间
          setTimeStamp()
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  logout({ commit }) {
    // 清理用户输入
    commit('setToken', '')
    commit('setUserInfo', {})
    // 调转到登录页面
    router.push('/')
  },
  // 请求用户数据
  getUserInfo({ commit }) {
    console.log('111')
    // 发送axios
    getUserInfo()
      .then((res) => {
        console.log(res)
        commit('setUserInfo', res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
