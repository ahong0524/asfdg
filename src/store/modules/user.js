import { login } from '@/api/user.js'
import md5 from 'md5'
import { setItem, getItem } from '@/utils/storage.js'
import { TOKEN } from '@/common/common.js'
const state = {
  token: getItem(TOKEN) || ''
}
const getters = {}
const mutations = {
  setToken(state, token) {
    // 保存操vuex
    state.token = token
    // 保存到本地存储中
    setItem(TOKEN, token)
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
          // 保存 vex  与 本次存储
          commit('setToken', res.token)
          // console.log(res.token)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })

    // .catch((err) => {
    //   console.log('no', err)
    // })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
