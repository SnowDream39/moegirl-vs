<template>
  <div v-if="SongData">
    <div class="flex justify-between">
      <div>
        <h2>歌曲信息</h2>
        <div>歌名： {{ SongData.song.name }}</div>
        <div>作者： {{ SongData.song.artistString }}</div>
        <div>类型： {{ SongData.song.songType }}</div>
        <div>歌词： {{ songStatus.hasOriginalLyric ? "有" : "无" }}</div>
        <div>视频： {{ songStatus.pvs.join("、") }}</div>
        <el-switch v-model="config.ruby" active-text="启用注音" />
      </div>
      <div class="flex flex-col justify-center">
        <img :src="SongData.song.mainPicture.urlThumb" alt="image" referrerpolicy="no-referrer" style="width: 200px" />
        <el-button type="disabled" @click="output" class="mt-2">生成条目</el-button>
        <el-button type="primary" @click="openVocadb" class="mt-2">打开网页</el-button>
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
  <el-dialog v-model="entryVisible" title="条目文本">
    <pre class="text-wrap">{{ entryText }}</pre>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { SelectedSong } from '@/types/vocadb';
import { render, type OutputConfig } from '@/utils/entry';
import { ElMessage, ElSwitch } from 'element-plus';
import { ref } from 'vue';



const props = defineProps<{
  SongData: SelectedSong | undefined
}>()

const songData = props.SongData
const entryVisible = ref(false)
const entryText = ref<string>()
const config = ref<OutputConfig>({
  ruby: true
})


async function output() {
  ElMessage.info('正在生成条目，请稍后')
  const text = await render(songData, config.value)
  entryText.value = text
  entryVisible.value = true
}

// openExternal：用 window.open 替代
function openVocadb() {
  if (!songData) return;
  window.open(`https://vocadb.net/S/${songData.song.id}`, '_blank');
}

const songStatus = (() => {
  const status = {
    hasOriginalLyric: false,
    pvs: [] as string[]
  }

  if (songData) {

    const lyrics = songData.lyricsFromParents;
    for (let i = 0; i < lyrics.length; i++) {
      if (lyrics[i].translationType == "Original") status.hasOriginalLyric = true;
    }
    const pvs = songData.pvs;
    const services = ["NicoNicoDouga", "Youtube", "Bilibili"];
    for (const service of services) {  // 使用 for...of 遍历 services 数组
      for (let j = 0; j < pvs.length; j++) {  // 使用 j 遍历 pvs 数组
        const pv = pvs[j];
        if (pv.pvType == "Original" && pv.service == service) {
          status.pvs.push(pv.service);
          break;  // 找到匹配项后跳出内层循环
        }
      }
    }
  }


  return status
})()



</script>
