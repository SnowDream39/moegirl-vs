<template>
  <div
    class="relative rounded-lg w-[330px] h-[8em] m-1 border-2 border-solid border-black shadow-lg shadow-gray-300 grid overflow-hidden text-shadow-md text-shadow-white dark:text-shadow-black cursor-pointer dark:text-white *:overflow-hidden *:text-overflow-clip *:white-space-nowrap">
    <div class="relative z-1 p-2 bg-white/50 dark:bg-black/70">
      <div class="h-7 flex flex-row justify-between items-center">
        <div>{{ pubdate }}</div>
      </div>
      <div class="h-12 flex flex-col justify-around">
        <div class="w-full text-xl font-bold">{{ title }}</div>
      </div>
      <div class="h-7 flex flex-row justify-between items-center">
        {{ artist }}
      </div>
    </div>
    <div class="absolute top-0 w-full h-full bg-gray-400/50 overflow-hidden flex justify-center items-center">
      <div class="relative min-w-full min-h-full" style="top: 0"><img class="w-full h-full object-cover"
          :src="pictureUrl" alt="thumbnail" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MusicCardData } from '@/utils/MusicCard';

defineProps<Partial<MusicCardData>>();


</script>
