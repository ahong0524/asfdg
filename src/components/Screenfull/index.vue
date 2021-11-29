<template>
  <div>
    <svg-icon
      :iconName="isScreenFull ? 'exit-fullscreen' : 'fullscreen'"
      @click="toggleScreenFull"
      class="screenicon"
    ></svg-icon>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import screenfull from 'screenfull'
const isScreenFull = ref(false)
const toggleScreenFull = () => {
  isScreenFull.value = !isScreenFull.value
  // 使用screenfull 插件完成 全屏的切换
  screenfull.toggle() // 默认的body
}
</script>
<style lang="scss" scoped>
.screenicon {
  /* 填充 */
  fill: currentColor;
  color: red;
}
</style>
