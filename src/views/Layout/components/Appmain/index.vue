<template>
  <div class="app-main">
    <!-- 二级路由显示容器 -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { isNoTag } from '@/utils/tag.js'
import { getTitle as getTitle_, watchLang } from '@/utils/i18n.js'

// 获取title
const getTitle = (to) => {
  if (!to.meta || !to.meta.title) {
    // 如果不存在title  以path的最后一项作为他的title
    const tmp = to.path.splite('/')
    return tmp[tmp.length - 1]
  } else {
    // 如果存在title.
    return getTitle_(to.meta.title)
  }
}
// 监听当前路由变化 --->增加tag 到指定位置
const route = useRoute()
const store = useStore()
watch(
  route,
  (to, from) => {
    if (isNoTag(to.path)) {
      return true
    }
    // 合法的tag到vuex
    const { path, fullPath, meta, name, params, query } = to
    store.commit('tag/addTagViewList', {
      path,
      fullPath,
      meta,
      name,
      params,
      query,
      title: getTitle(to)
    })
  },
  {
    immediate: true
  }
)

// 当国际化切换
// watchLang(() => {
//   // 重新更新vuex中的title的值
//   store.getters.tagViewList.forEach((route, index) => {
//     store.commit('tag/changeTitle', {
//       index: index,
//       route: { ...route, title: getTitle(route) }
//     })
//   })
// })
watchLang(() => {
  // 重新更新vuex中的title的值
  const tmpArr = []
  store.getters.tagViewList.forEach((route, index) => {
    tmpArr.push({ ...route, title: getTitle(route) }) // 不能使用getTitle_(route.title)
  })
  store.commit('tag/changeTitle', tmpArr)
})
</script>
<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  // position: relative;
  overflow: hidden;
  padding: 62px 20px 20px 20px;
  box-sizing: border-box;
  margin-top: 34px;
}
</style>
