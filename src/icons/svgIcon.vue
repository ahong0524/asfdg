<template>
  <svg aria-hidden="true" class="defaultSvgClass">
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
  return `#icon-${props.iconName}`
})
</script>

<style lang="scss" scoped>
.defaultSvgClass {
  width: 2em;
  height: 2em;
  fill: currentColor;
  color: #889aa4;
  vertical-align: -0.15em;
  overflow: hidden;
}
</style>
