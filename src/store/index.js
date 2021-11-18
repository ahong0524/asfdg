import { createStore } from 'vuex'
import user from './moudules/user'
import getters from './moudules/getters'
export default createStore({
  getters,
  modules: {
    user
  }
})
