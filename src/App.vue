<template>
  <Header />
  <main class="flex flex-col justify-center items-center max-w-[1280px]">
    <router-view />
  </main>
  <Footer />
</template>

<script setup lang="ts">
import Header from '@/components/header/Header.vue'
import Footer from '@/components/Footer.vue'

</script>

<style scoped></style>
