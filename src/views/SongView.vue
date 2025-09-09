<template>
  <h1 class="h1">vocadb搜索</h1>
  <span class="noRefererConfig" style="display: none;"></span>
  <div class="search-box">
    <el-input v-model="searchTitle" placeholder="歌名" @keyup.enter="searchSong">
      <template #append>
        <el-button :icon="Search" @click="searchSong" />
      </template>
    </el-input>
  </div>

  <div id="song-list" class="flex flex-row flex-wrap justify-center">
    <template v-for="song in songsCardData" :key="song.id">
      <MusicCard v-bind="song" @click="selectSong(song.id)" />
    </template>
  </div>

  <el-pagination v-if="total > 0" v-model:current-page="page" v-model:page-size="pageSize"
    layout="total, prev, pager, next, sizes" :total="total" :page-sizes="[10, 20, 50]" @current-change="searchSong"
    @size-change="searchSong" />

  <el-dialog v-model="showDialog" title="选择歌曲" width="800">
    <SongDialog v-if="true" :SongData="selectedSongData" :key="selectedSongData?.song.id" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, toRaw } from 'vue';
import { Search } from '@element-plus/icons-vue';
import SongDialog from '@/components/SongDialog.vue';
import type { SongData, SelectedSong } from '@/types/vocadb';
import { search_songs, get_song_info } from '@/utils/websites/vocadb';
import { ElMessage, ElDialog, ElPagination, ElInput } from 'element-plus';
import type { MusicCardData } from '@/utils/MusicCard';
import * as luxon from 'luxon';
import MusicCard from '@/components/SearchMusicCard.vue';


// ============= 主要内容 =============


const searchTitle = ref();
const songsData = ref<SongData[]>([]);  // 歌曲列表
const songsCardData = ref<MusicCardData[]>([]);  // 歌曲卡片数据
const selectedSongData = ref<SelectedSong | undefined>(undefined)
const showDialog = ref<boolean>(false);

const total = ref(0);
const page = ref(1);
const pageSize = ref(10);

async function selectSong(id: number) {
  showDialog.value = true;
  selectedSongData.value = undefined
  selectedSongData.value = await get_song_info(id)
  console.log(toRaw(selectedSongData.value))
}


async function searchSong() {
  ElMessage.info('正在搜索，请稍后')

  const response = await search_songs(searchTitle.value, page.value, pageSize.value);
  console.log(response);  // 打印返回的数据
  total.value = response.totalCount || 0;
  songsData.value = response.items;  // 将数据赋值给响应式变量
  songsCardData.value = response.items.map((item: any) => ({
    vocals: [''],
    roles: [''],
    artist: item.artistString,
    title: item.defaultName,
    description: item.description,
    pubdate: luxon.DateTime.fromISO(item.publishDate).toFormat('yyyy-MM-dd'),
    pictureUrl: item.mainPicture ? item.mainPicture.urlThumb : '',
    links: [''],
    id: item.id
  } as MusicCardData));


}

</script>
