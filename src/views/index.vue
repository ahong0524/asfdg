<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
      ref="loginRef"
    >
      <div class="title-container">
        <h3 class="title">用户登陆</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon iconName="user" />
        </span>
        <el-input
          placeholder="username"
          v-model="loginForm.username"
          name="username"
          type="text"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon iconName="password" />
        </span>
        <el-input
          placeholder="password"
          v-model="loginForm.password"
          name="password"
          :type="flag ? 'password' : 'text'"
        ></el-input>
        <span class="svg-container" @click="toggleIcon">
          <svg-icon :iconName="flag ? 'close_eye' : 'open_eye'" />
        </span>
      </el-form-item>

      <el-button
        type="primary"
        style="width: 100%; margin-top: 30px"
        @click="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import '@/icons/index.js'
import { ref } from 'vue'
import { passwordValidate } from './rule'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

// 表单数据
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})

// 表单验证
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '账号必须填写'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      message: '密码必须填写'
    },
    {
      trigger: 'blur',
      validator: passwordValidate()
    }
  ]
})

// 切换password状态
const flag = ref(true)
const toggleIcon = () => {
  flag.value = !flag.value
}

// 怎么引用dom
const loginRef = ref(null)
// 登陆逻辑
const store = useStore()
const router = useRouter()
const handleLogin = () => {
  // 验证一次表单的数据是否合法
  loginRef.value.validate((validate) => {
    if (!validate) {
      // retuen // 一个规则没有通过
    }
    // 验证通过执行登录逻辑 调用定义好的actions  保存 token
    store.dispatch('user/login', loginForm.value).then((res) => {
      // 只有在登录成功的情况下执行跳转

      router.push({
        name: 'Index'
      })
    }) // 异步请求
  })
}
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
.svg {
  width: 20px;
  height: 20px;
  fill: aqua;
}
.login-container {
  min-height: 100%;
  width: 100%;
  height: 100vh;
  background: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 25px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      color: #454545;

      .el-input {
        height: 47px;
        width: 85%;

        .el-input__inner {
          background: transparent;
          border: 0px;
          border-radius: 0px;
          padding: 12px 5px 12px 5px;
          color: $cursor;
          height: 47px;
          caret-color: $cursor;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 5px 5px;
      color: $dark_gray;
      vertical-align: middle;
    }

    .title-container {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
