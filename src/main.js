import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

// 引入样式的主入口文件
import './styles/index.scss'
// 加载svg 的处理
import initSvgIcon from './icons/index'
// 用户鉴权
import './permission.js'
const app = createApp(App)
installElementPlus(app)

initSvgIcon(app)
app.use(store).use(router).mount('#app')
//  入口文件 main.js (导入模块 js模块)--》通过webpack 打包出口js|app.js 文件
// webpack 只识别js文件
// 通过 loader 将{css 文件 字体 svg} --》对应的js模块  --》再利用webpack 打包到出口模块
// 不需要配置 直接使用  因为项目环境已经直接配置了 常见的 loader
// svg导入后 他是由file-loader 变成一个 |img|wser.8d030327.svg js模块
// 可以按照img方式加载  缺点：file-loader转化的js模块不能动态修改图标颜色  不利于不利于封装一个全局组件
// 查看webpack的默认配置---------------------------
// vue inspect 查看默认的webpack设置
// vue inspect --rules 查看所有的loader
// vue inspect --rule svg  查看指定的svg  的 loader

// 如何配置 webpack
// 1项目根目录 创建 vue.config.js
// 2修改webpack的配置
// a禁用 fiile-laoder对某个目录下svg的护额徐
// b 下载loader
// npm i -D svg-sprite-loader  //-D保存在devlopment
