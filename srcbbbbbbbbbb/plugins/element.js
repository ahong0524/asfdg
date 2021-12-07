import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import locale from 'element-plus/lib/locale/lang/zh-cn'
// 更换 element  语言包
export default (app) => {
  // app.use 使用一个插件 app.components()注册一个全局组件
  app.use(ElementPlus)
}
