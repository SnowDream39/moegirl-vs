<template>
  <h1>vocadb搜索</h1>
  <span class="noRefererConfig" style="display: none;"></span>
  <el-button type="primary" @click="router.push('/menu')">返回目录</el-button>
  <div class="search-box">
    <el-input v-model="searchTitle" placeholder="歌名" @keyup.enter="searchSong">
      <template #append>
        <el-button :icon="Search" @click="searchSong" />
      </template>
    </el-input>
  </div>
  <el-table :data="songsData">
    <el-table-column label="封面" width="200">
      <template #default="scope">
        <img :src="scope.row.mainPicture.urlThumb" alt="image" referrerpolicy="no-referrer" />
      </template>
    </el-table-column>
    <el-table-column prop="name" label="歌名" />
    <el-table-column prop="artistString" label="作者" />
    <el-table-column prop="songType" label="类型" width="100" />
    <el-table-column label="操作" width="120">
      <template #default="scope">
        <el-button type="primary" @click="selectSong(songsData[scope.$index].id)">选择歌曲</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="showDialog" title="选择歌曲" width="800">
    <SongDialog v-if="true" :SongData="selectedSongData" :key="selectedSongData?.song.id" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue';
import SongDialog from '@/components/SongDialog.vue';
import type { SongData, SelectedSong } from '@/types/vocadb';
import { search_songs, get_song_info } from '@/utils/websites/vocadb';

const router = useRouter()

// ============= 主要内容 =============



const searchTitle = ref();


const songsData = ref<SongData[]>([]);  // 歌曲列表


const selectedSongData = ref<SelectedSong | undefined>(undefined)

const showDialog = ref<boolean>(false);

async function selectSong(id: number) {
  showDialog.value = true;
  selectedSongData.value = undefined
  selectedSongData.value = await get_song_info(id)

}


async function searchSong() {
  try {
    const response = await search_songs(searchTitle.value)
    console.log(response);  // 打印返回的数据
    songsData.value = response.items;  // 将数据赋值给响应式变量
  } catch (error) {
    console.error('数据加载失败', error);
  }
}

</script>
<style scoped lang="scss">
h1 {

  text-align: center;
}

img {

  height: 100px;
}

.search-box {
  width: 80%;
  margin: 0 auto;

}
</style>
