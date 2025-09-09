<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { billboard } from '@/utils/websites/billboard';
import type { SongData } from '@/types/billboard';


const songs_data = ref<SongData[]>();  // 将 songs_data 声明为响应式数据


onMounted(async () => {
  try {
    const response = await billboard();  // 获取数据
    console.log(response);  // 打印返回的数据
    songs_data.value = response;  // 将数据赋值给响应式变量
  } catch (error) {
    console.error('数据加载失败', error);
  }
});
</script>

<template>
  <h1>billboard最新一期排名</h1>
  <el-table :data="songs_data">
    <el-table-column prop="current" label="排名" width="80" />
    <el-table-column label="封面" width="250">
      <template #default="scope">
        <img :src="scope.row.image" alt="image" />
      </template>
    </el-table-column>
    <el-table-column prop="title" label="歌名" class-name="title-column" />
  </el-table>
</template>


<style scoped lang="scss">
h1 {

  text-align: center;
}

img {

  height: 100px;
}
</style>
