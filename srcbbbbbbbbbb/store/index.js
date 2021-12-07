import {
  createStore
} from 'vuex'
import user from './moudules/user'
import getters from './moudules/getters'
import app from './moudules/app.js'
import theme from './moudules/Theme.js'
import tag from './moudules/tag.js'
export default createStore({
  getters,
  modules: {
    user,
    app,
    theme,
    tag
  }
})
