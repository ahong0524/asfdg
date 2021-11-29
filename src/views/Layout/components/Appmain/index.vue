<template>
  <div class="app-main">
    <!-- 导航按钮 -->
    <!-- <div class="router-button"></div> -->
    <!--二级路由显示容器-->
    <router-view />
  </div>
</template>
<script setup></script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
// .router-button {
//   width: 100%;
//   height: 50px;
//   border-bottom: 1px solid black;
// }
</style>
