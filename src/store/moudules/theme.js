import { getItem, setItem } from '@/utils/storage.js'
import { MYCOLOR } from '@/common/common.js'
export default {
  namespaced: true,
  state: {
    myColor: getItem(MYCOLOR) || '#cccccc'
  },
  mutations: {
    // 设置主题色
    setMyColor(state, color) {
      // 本地存储
      setItem(MYCOLOR, color)
      state.myColor = color
    }
  }
}
