<template>
  <svg aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script setup>
import { computed, defineProps } from 'vue'
const props = defineProps({
  iconName: {
    type: String,
    require: true
  }
})
const iconName = computed(() => {
  // console.log(props.iconN)
  return `#icon-${props.iconName}`
})
</script>
<style lang="scss" scoped></style>
