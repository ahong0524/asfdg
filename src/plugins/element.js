import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/lib/locale/lang/zh-cn.js'
import en from 'element-plus/lib/locale/lang/en.js'
import store from '@/store/index.js'
// import locale from 'element-plus/lib/locale/lang/zh-cn'
// 更换 element  语言包
export default (app) => {
  // app.use 使用一个插件 app.components()注册一个全局组件
  app.use(ElementPlus, { locale: store.getters.language === 'zh' ? zhCn : en })
}
