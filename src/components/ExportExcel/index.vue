<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="dialogShow"
    @close="close"
    width="30%"
  >
    <el-input
      :model-value="filename"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <!-- 选择下载的页码 -->
    <slot></slot>
    <template #footer>
      <el-button @click="close">{{ $t('msg.excel.close') }}</el-button>
      <el-button type="primary" @click="exportExcel">{{
        $t('msg.excel.confirm')
      }}</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'

import { exportJsonToExcel } from '@/utils/Export2Excel.js'
import { ElMessage } from 'element-plus'

const props = defineProps({
  dialogShow: {
    type: Boolean,
    require: true
  },
  data: {
    type: Array,
    require: true
  },
  header: {
    type: Array,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: '下载失败'
  }
})

const emit = defineEmits(['closeDialog'])
const close = () => {
  emit('closeDialog')
}

// 导出业务
const exportExcel = () => {
  // 1.文件名 不选的话该有默认名 filename  用英文切换
  // 2.导出全部excel 数据||导出当前页------>exportData
  // console.log(result)
  // 3.利用工具 将服务器返回用户数据-->转化成excel数据-->形成excel文件
  // 4.解析excel数据 并下载该文件
  exportJsonToExcel({
    header: props.header, // Object.keys(USER_RELATION),
    data: props.data,
    filename: props.filename.value,
    merges: true,
    autoWidth: true,
    bookType: 'xlsx'
  }).then((res) => {
    // 6.提示消息
    ElMessage.success(props.message)
  })
  // 5.关闭dialog
  close()
}
</script>
<style lang="scss" scoped></style>
