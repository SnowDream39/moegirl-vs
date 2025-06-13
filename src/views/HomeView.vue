<script lang="ts" setup>
import { useRouter } from 'vue-router'
// router钩子，返回路由器实例
const router = useRouter()

</script>

<template>
  <div class="P-home">
    <h1>Home Page</h1>
    <div class="ipt-con">
      <el-button @click="router.push('/login')">返回登录</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.P-home {

  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: linear-gradient(#f48c8d, #f4c58d);
  text-align: center;
}

h1 {


  margin-top: 50px;
  color: #fff;
  font-size: 28px;
}

.ipt-con {

  margin: 20px auto 0;
  text-align: center;
}
</style>
