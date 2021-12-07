<template>
  <div class="upload-excel-container">
    <!-- 文件上传 -->
    <div class="btn-upload">
      <el-button type="primary" @click="handleUpload">{{
        $t('msg.uploadExcel.upload')
      }}</el-button>
      <!-- 文件上传的隐藏域 -->
      <input
        ref="tagUploadInput"
        type="file"
        class="upload-excel-input"
        accept=".xlsx, .xls"
        @change="handleChange"
      />
    </div>
    <!-- 拖拽上传 -->
    <div
      class="drop"
      @drop.prevent.stop="onDrop"
      @dragenter.prevent.stop="onDropEnter"
      @dragover.prevent.stop="onDropOver"
    >
      <i class="el-icon-upload"></i>
      {{ $t('msg.uploadExcel.drop') }}
    </div>
  </div>
</template>
<script setup>
// import upload from 'element-plus/lib/components/upload/src/ajax'
import { ref, defineProps } from 'vue'
import { ElMessage } from 'element-plus'
const props = defineProps({
  beforUpload: Function,
  onSuccess: Function
})
// input 文件上传
const tagUploadInput = ref(null)
// 点击按钮上传
const handleUpload = () => {
  // 触发input 的点击事件
  tagUploadInput.value.click()
}
// 选择了文件触发的事件
const handleChange = (e) => {
  // 获取到文件
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) {
    return false
  }
  // 读取文件
  upload(rawFile)
  // 插件 解析 excel 文件的表格数据 -->data
  props.onSuccess('解析完的数据')
}

// 执行上传 如果存在beforUpload 而且beforUpload返回true才执行读取操作，如果没有beforUpload直接执行读取操作
const upload = (rawFile) => {
  if (!props.beforUpload) {
    // 读取文件
    readFile(rawFile)
    // return
  } else {
    if (props.beforUpload()) {
      // 读取文件
      readFile(rawFile)
    } else {
      ElMessage.error('取消文件读取操作')
    }
  }
}
// 创建读取对象
// 读取完毕回调
// 异步读取
const readFile = (rawFile) => {
  console.log('开始读取...')
}
const onDrop = () => {}
const onDropEnter = () => {}
const onDropOver = () => {}
</script>
<style lang="scss" scoped>
.upload-excel-container {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .upload-excel-input {
    display: none;
    z-index: -1000;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #ddd;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
  }
  i {
    font-size: 60px;
    display: inline;
  }
}
</style>
