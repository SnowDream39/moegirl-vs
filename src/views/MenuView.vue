<template>
  <div class="my-10">
    <img :src="logo" class="w-40 h-40" />
  </div>
  <div class="text-4xl font-bold mb-5">欢迎使用 幻梦萌娘百科术力口工具</div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import logo from '/logo.jpg'

const router = useRouter()

</script>
