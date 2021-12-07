<template>
  <div class="cuttle_container" @click="toggeleSideBar">
    <svg-icon :iconName="getIcon" className="cuttle" />
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
// getIcon方法获取icon名
const getIcon = computed(() => {
  return store.getters.sideBarOpen ? 'cuttle_open' : 'cuttle_close'
})
const toggeleSideBar = () => {
  store.commit('app/toggleSideBar')
}
</script>

<style lang="scss" scoped>
.cuttle_container {
  padding: 0 16px;
  .cuttle {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
