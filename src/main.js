import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

// 引入样式入口文件
import './styles/index.scss'

//  加载svg的处理
import initSvgIcon from './icons/index'

// 用户鉴权
// import './permission.js'

// 导入i18n
import i18n from '@/i18n/index'

const app = createApp(App)
installElementPlus(app)
initSvgIcon(app)
app.use(store).use(router).use(i18n).mount('#app')
/*
  中英文切换
  1需要一个变量locale 控制语环境、
  2所有的语言中的数据源 药提前准备好
  3定义一个方法获取对应语言包中的数据
  借助i18n 插件 完成
  1,npm i vue-i18n@next  也因为项目vue3.2  所以i18n 必须>9.0.0
*/
