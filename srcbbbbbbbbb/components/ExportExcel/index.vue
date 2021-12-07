<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="dialogShow"
    @close="close"
    width="30%"
  >
    <el-input
      v-model="filename"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>

    <!-- 选择下载的页码 -->
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="exportExcel">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchLang } from '@/utils/i18n.js'
// import { exportJsonToExcel } from '@/utils/Export2Excel.js'
import { USER_RELATION } from '@/common/common.js'
import dateFilter from '@/filters/dateFilter.js'

const i18n = useI18n()
const filename = ref(i18n.t('msg.excel.defaultName'))
const props = defineProps({
  dialogShow: {
    type: Boolean,
    required: true
  },
  exportData: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['closeDialog'])
const close = () => {
  emit('closeDialog')
}

// 导出业务执行
const exportExcel = () => {
  // 测试是否可以拿到数据
  // console.log(props.exportData)
  // 1.文件名不选的话应该有默认值 filename 用英文切换
  // 2.导出全部excel数据 或者 导出当前页 -->exportData
  // 3.利用工具 将服务器返回用户数据 -->转换成excel数据
  const result = dataFormate(props.exportData)
  console.log(result)
  // 4.形成excel文件 并下载文件
  // exportJsonToExcel({})
}

watchLang((lang) => {
  filename.value = i18n.t('msg.excel.defaultName')
})
// 转化数据格式
const dataFormate = (data) => {
  return data.map((item) => {
    return Object.keys(USER_RELATION).map((key) => {
      // 处理用户角色
      if (USER_RELATION[key] === 'role') {
        const roles = item[USER_RELATION[key]]
        if (roles.length > 0) {
          return JSON.stringify(roles.map((role) => role.title))
        } else {
          return '[]'
        }
      } else if (USER_RELATION[key] === 'openTime') {
        // 处理时间
        return dateFilter(item[USER_RELATION[key]])
      } else {
        return item[USER_RELATION[key]] // --> item[username]
      }
    })
  })
}
</script>
<style lang="scss" scoped>
</style>
