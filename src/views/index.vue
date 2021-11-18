<template>
  <div class="title1">
    <el-form
      class="title2"
      :model="loginForm"
      :rules="loginRules"
      ref="loginRef"
    >
      <div>
        <h3>用户登录</h3>
      </div>
      <!-- 账号--------------------------------- -->
      <el-form-item prop="username">
        <!-- 小icon -->
        <span class="svg-coutainer">
          <el-icon color="#409gFC">
            <Avatar />
          </el-icon>
        </span>
        <br />
        <!-- input框 -->
        <el-input
          placeholder="username"
          name="username"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <br />
      <!-- 密码---------------------------------- -->
      <el-form-item prop="password">
        <span class="svg-coutainer">
          <el-icon color="#409gFC">
            <svg aria-hidden="true" class="svg1">
              <use xlink:href="#icon-password"></use>
            </svg>
          </el-icon>
        </span>
        <br />
        <el-input
          placeholder="password"
          name="password"
          v-model="loginForm.password"
          :type="f ? 'password' : 'txt'"
        ></el-input>
        <span @click="aa">
          <svg-icon :iconName="f ? 'byj' : 'yj'" class="svg2" />
        </span>
      </el-form-item>
      <br />
      <!-- 登录按钮 -->
      <el-button @click="denglu">登录</el-button>
    </el-form>
  </div>
</template>
<script setup>
// 引入icon
import { Avatar } from '@element-plus/icons'
import { ref } from 'vue'
import { passwordValidate } from './rule'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
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
      // required: true,
      trigger: 'blur',
      // message: '密码必须填写',
      validator: passwordValidate
    }
  ]
})
const loginRef = ref(null)
// 登录逻辑
// const store = useStore()
const router = useRouter()
const denglu = () => {
  // 验证一次表单的数据是否合法
  loginRef.value.validate((validate) => {
    if (!validate) {
      return // 一个规则没有通过
    }
    //  验证通过执行登录逻辑  调用定义好的 actions  传入 账号密码token
    store.dispatch('user/login', loginForm.value).then((res) => {
      // 只有在登陆成功的情况下  执行跳转
      router.push({
        name: 'Index'
      })
    })
  })
}

const f = ref(true)
const aa = () => {
  f.value = !f.value
}
</script>
<style lang="scss" scoped>
$bg: #d7e2f3;
.title1 {
  min-height: 100%;
  width: 900px;
  height: 100vh;
  background: $bg;
  overflow: hidden;
  margin: 0 auto;
  .title2 {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
  }
  // 父组件去修改子组件样式  样式穿透
  .el-input {
    width: 500px;
  }
  .el-button {
    margin: 10px 20px;
  }
}
.el-icon {
  margin-top: 20px;
}
.svg1 {
  width: 20px;
  height: 20px;
}
.svg2 {
  width: 20px;
  height: 20px;
}
</style>
