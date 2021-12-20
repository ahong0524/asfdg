<template>
  <div>
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">
          {{ $t('msg.article.dynamicTitle') }}
          <el-checkbox-group v-model="selectDynamicLabel" :min="2">
            <el-checkbox
              v-for="(item, index) in dynamicData"
              :key="index"
              :label="item.label"
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
        </span>
      </div>
    </el-card>
    <el-card>
      <theme-table :cbs="[]">
        <template #default="{ headerStyleObj }">
          <el-table
            border
            :header-cell-style="headerStyleObj"
            :data="tableData"
          >
            <el-table-column
              v-for="(item, index) in tableLabels"
              :key="index"
              :label="item.label"
              :prop="item.prop"
            >
              <template #default="{ row }" v-if="item.prop === 'publicDate'">
                {{ $filters.relativeTime(row.publicDate) }}
              </template>
              <template #default="{ row }" v-else-if="item.prop === 'action'">
                <el-button
                  type="primary"
                  size="mini"
                  @click="showArticle(row)"
                  >{{ $t('msg.article.show') }}</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  @click="removeArticle(row)"
                  >{{ $t('msg.article.remove') }}</el-button
                >
              </template></el-table-column
            >
          </el-table>
        </template>
      </theme-table>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        @size-change="sizeChange"
        @current-change="pageChange"
        :current-page="page"
        :page-size="size"
        :page-sizes="[5, 10, 20, 50]"
        :total="total"
        layout="total,sizes,prev,pager,next,jumper"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated } from 'vue'
import { getArticleList } from '@/api/article.js'
import ThemeTable from '@/components/ThemeTable/index.vue'
import { watchLang } from '@/utils/i18n.js'
import {
  selectDynamicLabel,
  dynamicData,
  tableLabels
} from './hooks/dynamic.js'
// ----------------------动态列业务--------------------
// const selectDynamicLabel = ref(['标题'])
// const { selectDynamicLabel } = dynamic

// ----------------------表格基础渲染--------------
// 分页相关
const page = ref(1)
const size = ref(5)
const total = ref(0)
// 改变当前页
const pageChange = (page_) => {
  page.value = page_
  getArticle()
}
// 改变页大小
const sizeChange = (size_) => {
  size.value = size_
  getArticle()
}
const tableData = ref([])
const getArticle = async () => {
  const data = await getArticleList({
    page: page.value,
    size: size.value
  })
  tableData.value = data.list
  total.value = data.total
}
getArticle()
// 查看详情
const showArticle = (row) => {}
// 删除
const removeArticle = (row) => {}
// 进入组件keep-olive  onActivated 钩子函数
onActivated(getArticle)
// 语言切换
watchLang(getArticle)
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 20px;
  .dynamic-box {
    display: flex;
    align-items: center;
    .title {
      margin-right: 20px;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
