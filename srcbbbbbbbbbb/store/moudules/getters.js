// 集中暴露vuex各个模块需要暴露的属性和方法
import variables from '@/styles/variables.scss'
import {
  generateColors
} from '@/utils/theme.js'
export default {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  cssVar: (state) => {
    return {
      ...variables,
      // 在这里解析出最终的颜色
      ...generateColors(state.theme.myColor)
    }
  },
  sideBarOpen: (state) => state.app.sideBarOpened,
  language: (state) => state.app.language,
  theme_color: (state) => state.theme.myColor,
  tagViewList: (state) => state.tag.tagViewList
}

// colos={
//   skyBlue:;
//   skyBluea:;
//   skyBlueb:$;
//   skyBluec:$;
// }