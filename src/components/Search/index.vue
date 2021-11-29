<template>
  <div :class="{ show: isShow }" class="header-search">
    <!-- 图标 -->
    <svg-icon
      iconName="search"
      className="search-icon"
      @click.stop="toggleShow"
    />
    <!-- 下拉选项 -->
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
      <!--  filterable remote remote-method="" 这三个属性必写 -->
      <el-option
        v-for="option in searchResult"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouter, generateFuse } from '@/utils/router.js'
import Fuse from 'fuse.js'
import utils from '@/utils/i18n.js'

const searchSelectRef = ref(null)
const isShow = ref(false)
const toggleShow = () => {
  if (isShow.value) {
    // 收起
    isShow.value = false
    search.value = ''
    searchResult.value = []
    // 收起自动失去焦点
    searchSelectRef.value.blur()
  } else {
    // 展开
    isShow.value = true
    // 展开自动获取焦点
    searchSelectRef.value.focus()
  }
}

// 用户输入后检索的字符串
const search = ref('')
const searchResult = ref([])
// 检索方法
const querySearch = (query) => {
  searchResult.value = fuse.search(query)
}

// 选中option触发方法
const onSelectChange = (value) => {
  // search 修改
  search.value = value.title.join(' > ')
  // 跳转
  router.push(value.path)
  console.log('选中option', value)
}

// 获取数据源
const router = useRouter()
let list = computed(() => {
  // 去重
  const filterRoutes = filterRouter(router.getRoutes())
  // 格式化路由1.具备meta && meta.title 2.过滤动态路由
  return generateFuse(filterRoutes)
})

// 初始化fuse(模糊搜索工具)
let fuse
const initFuse = (list) => {
  fuse = new Fuse(list, {
    shouldSort: true, // 搜索的结果是否按照优先级排序
    minMatchCharLength: 2, // 搜索的字符有效最小长度
    krys: [
      {
        name: 'path', // 搜索的字段
        weight: 0.7 // 若果多条搜索方式命中同一条数据，按照权重优先最高的记录
      },
      {
        name: 'title',
        weight: 0.3
      }
    ]
  })
}
initFuse(list.value) // 数据源
console.log(fuse)

// 监听language的切换动作
utils.watchlang((lang) => {
  list = computed(() => {
    // 去重
    const filterRoutes = filterRouter(router.getRoutes())
    // 格式化路由  条件:1具备meto && meta.title 2过滤掉动态路由
    return generateFuse(filterRoutes)
  })
  initFuse(list.value)
})

// 问题一： 收起的时候 清空上一次的search和下拉列表数据
// 问题二： 点击其他位置 search 收起
const onClose = () => {
  isShow.value = false
  search.value = ''
  searchResult.value = []
  searchSelectRef.value.focus()
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
    font-size: 10px;
    vertical-align: middle;
    fill: currentColor;
    color: pink;
  }
  .header-search-select {
    font-size: 18px;
    // 0.2秒拉伸制210px
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
      padding-left: 0;
      padding-right: 0;
    }
  }
  // ↓当header-search-select具备show时就改变其样式
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
