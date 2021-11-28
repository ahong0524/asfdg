<template>
  <div :class="{ show: isShow }" class="header-search">
    <!-- 图标 -->
    <svg-icon
      iconName="search"
      className="search-icon"
      @click.stop="toggleShow"
    />
    <!-- select下拉框 -->
    <el-select
      v-model="search"
      placeholder="Select"
      class="header-search-select"
      ref="searchSelectRef"
      filterable
      remote
      default-first-option
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchResult"
        :key="option.item.path"
        :label="option.item.title.join('>')"
        :value="option.item"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouter, generateFuse } from '@/utils/router.js'
import Fuse from 'fuse.js'
import { watchLang } from '@/utils/i18n.js'
const searchSelectRef = ref(null)
const isShow = ref(false)
const toggleShow = () => {
  if (isShow.value) {
    // 收起
    isShow.value = false
    search.value = ''
    searchResult.value = []
    // 失去焦点
    searchSelectRef.value.blur()
  } else {
    // 展开
    isShow.value = true
    // 展开自动获取焦点
    searchSelectRef.value.focus()
  }
}
// 用户输入检索的字符串
const search = ref('')
const searchResult = ref([])
// 检索方法
const querySearch = (query) => {
  searchResult.value = fuse.search(query)
}
// 选中option 触发的方法
const onSelectChange = (value) => {
  // search 修改
  search.value = value.title.join('>')
  // 跳转
  router.push(value.path)
  console.log('选中option', value)
}
// 获取数据源
const router = useRouter()
let list = computed(() => {
  // 去重
  const filterRoutes = filterRouter(router.getRoutes())
  // 格式化路由  条件:1具备meto && meta.title 2过滤掉动态路由
  return generateFuse(filterRoutes)
})
// 初始化 fuse.js --》模糊搜索工具
let fuse
const initFuse = (list) => {
  fuse = new Fuse(list, {
    shouldSort: true, // 搜索结果 是否按照优先级排序
    minMatchCharLength: 2, // 搜索的字符 最小长度
    keys: [
      {
        name: 'path', // 搜索的字段
        weight: 0.7 // 弱国多条搜索方式 同时命中同一条数据集 按照权重高的记录
      },
      {
        name: 'title',
        weight: 0.3
      }
    ]
  })
}
initFuse(list.value) // list数据源
console.log(fuse)
// 监听 language的切换操作
watchLang((lang) => {
  list = computed(() => {
    // 去重
    const filterRoutes = filterRouter(router.getRoutes())
    // 格式化路由  条件:1具备meto && meta.title 2过滤掉动态路由
    return generateFuse(filterRoutes)
  })
  initFuse(list.value)
})
// 问题1 展开和收缩的时候  清空上一次的serch 和 下拉列表数据
// 问题2 点击其他位置 search 收起
onMounted(() => {
  // document.body.addEventListener('click', onClose)
})
const onClose = () => {
  isShow.value = false
  isShow.value = search.value = ''
  searchResult.value = []
}
watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})
</script>

<style lang="scss" scoped>
.header-search {
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
    fill: currentColor;
    color: #393735;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0px;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d8d9;
      vertical-align: middle;
      padding-left: 0;
      padding-right: 0;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
