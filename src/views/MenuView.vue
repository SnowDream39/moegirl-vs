<template>
  <div>
    <img :src="logo" />
    <div>
      <el-button type="primary" @click="router.push('/vocadb')">vocadb</el-button>
    </div>
    <div>
      <el-button type="primary" @click="router.push('/billboard')">billboard</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import logo from '/logo.png'

const router = useRouter()

</script>
