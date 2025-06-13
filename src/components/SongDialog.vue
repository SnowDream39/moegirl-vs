<template>
  <div v-if="SongData">

    <div style="display: flex; justify-content: space-between;">
      <div>
        <h2>歌曲信息</h2>
        <div>歌名： {{ SongData.song.name }}</div>
        <div>作者： {{ SongData.song.artistString }}</div>
        <div>类型： {{ SongData.song.songType }}</div>
        <div>歌词： {{ songStatus.hasOriginalLyric ? "有" : "无" }}</div>
        <div>视频： {{ songStatus.pvs.join("、") }}</div>
      </div>
      <div style="display: flex; flex-direction: column; justify-content: center;">
        <img :src="SongData.song.mainPicture.urlThumb" alt="image" />
        <el-button type="disabled" @click="output" style="margin-top: 10px;">生成条目</el-button>
        <el-button type="primary" @click="openVocadb" style="margin-top: 10px;">打开网页</el-button>
      </div>
    </div>
    <h2>STAFF</h2>
    <el-table :data="SongData.artists">
      <el-table-column prop="categories" label="categories" />
      <el-table-column prop="roles" label="roles" />
      <el-table-column prop="name" label="name" />
    </el-table>
  </div>
  <div v-else>
    <div>加载中…………</div>
  </div>
</template>

<script lang="ts" setup>
import type { SelectedSong } from '@/types/vocadb';

const props = defineProps<{
  SongData: SelectedSong | undefined
}>()

const SongData = props.SongData

async function output() {

}

// openExternal：用 window.open 替代
function openVocadb() {
  if (!SongData) return;
  window.open(`https://vocadb.net/S/${SongData.song.id}`, '_blank');
}

const songStatus = (() => {
  const status = {
    hasOriginalLyric: false,
    pvs: [] as string[]
  }

  if (SongData) {

    const lyrics = SongData.lyricsFromParents;
    for (let i = 0; i < lyrics.length; i++) {
      if (lyrics[i].translationType == "Original") status.hasOriginalLyric = true;
    }
    const pvs = SongData.pvs;
    const services = ["NicoNicoDouga", "Youtube", "Bilibili"];
    for (const service of services) {  // 使用 for...of 遍历 services 数组
      for (let j = 0; j < pvs.length; j++) {  // 使用 j 遍历 pvs 数组
        const pv = pvs[j];
        if (pv.pvType == "Original" && pv.service == service) {
          status.pvs.push(pv.pvId);
          break;  // 找到匹配项后跳出内层循环
        }
      }
    }
  }


  return status
})()



</script>
