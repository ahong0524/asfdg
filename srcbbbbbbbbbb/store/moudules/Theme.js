// 设置主题色文件
import {
  getItem,
  setItem
} from '@/utils/storage.js'
import {
  MYCOLOR
} from '@/common/common.js'
export default {
  namespaced: true,
  state: {
    myColor: getItem(MYCOLOR) || '#cccccc'
  },
  mutations: {
    // 设置主题色
    setMyColor(state, color) {
      // 保存到本地，使用户下次登陆时还是这个主题
      setItem(MYCOLOR, color)
      state.myColor = color
    }
  }
}
