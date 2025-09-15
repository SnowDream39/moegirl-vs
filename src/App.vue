<template>
  <ElConfigProvider :locale="zhCn">
    <Header />
    <main class="flex flex-col justify-center items-center max-w-[1280px]">
      <router-view />
    </main>
    <Footer />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import Header from '@/components/header/Header.vue'
import Footer from '@/components/Footer.vue'
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>

<style scoped></style>
