<template>
  <div class="">
    <upload-excel :onSuccess="uploadExcelSuccess" :beforUpload="beforUpload" />
  </div>
</template>
<script setup>
import {} from 'vue'
import UploadExcel from '@/components/UploadExcel/index.vue'
const uploadExcelSuccess = (data) => {
  console.log('---->', data)
}
const beforUpload = () => {
  // ...
  return true
}
console.log(UploadExcel)
</script>
<style lang="scss" scoped>
</style>
