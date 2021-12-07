<template>
  <div class="user-manage-container">
    <el-card class="header">
      <!-- excel按钮 -->
      <!-- 导入按钮 -->
      <el-buttin type="primary" @click="onImportExcel">{{
        $t('msg.excel.importExcel')
      }}</el-buttin>
      <!-- 导出按钮 -->
      <el-buttin type="success" @click="onImportExcel">{{
        $t('msg.excel.exportExcel')
      }}</el-buttin>
    </el-card>
    <el-caed>
      <!-- table -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          :label="$t('msg.excel.name')"
          prop="username"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.excel.mobile')"
          prop="mobile"
        ></el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              :src="row.avatar"
              class="avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>

        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="tag in row.role" :key="tag.id" size="mini">{{
                tag.title
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          width="300px"
          align="center"
        >
          <template #default>
            <el-button size="mini" type="success">{{
              $t('msg.excel.show')
            }}</el-button>
            <el-button size="mini" type="primary">{{
              $t('msg.excel.showRole')
            }}</el-button>
            <el-button size="mini" type="warning">{{
              $t('msg.excel.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- pagenation -->
      <el-pagination
        class="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        :currentpage="page"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="size"
        layout="total,sizes.prev,pager,next,jumper"
        :total="total"
      ></el-pagination>
    </el-caed>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUser } from '@/api/user-manage.js'
const router = useRouter()

// 跳转页面
const onImportExcel = () => {
  router.push({ path: '/user/import' })
}

// 表格相关
const tableData = ref([])
const size = ref(5)
const page = ref(1)
const total = ref(0)

// 改变页的大小
const sizeChange = (currentSize) => {
  size.value = currentSize
}

// 改变当前的页码
const currentChange = (currentpage) => {
  page.value = currentpage
  getManageUser()
}

// 获取用户数据
const getManageUser = async () => {
  const data = await getUser({
    page: page.value,
    size: size.value
  })
  tableData.value = data.list
  total.value = data.total
}
getManageUser()
</script>

<style lang="scss" scoped>
.header {
  text-align: right;
  margin-bottom: 22px;
}
.pagination {
  text-align: center;
  margin: 20px;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>
