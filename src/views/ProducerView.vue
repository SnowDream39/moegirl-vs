<template>
  <h1 class="h1">P主投稿列表工具</h1>
  <div>
    <p>我在这里一定要好好推销一下我的&#123;&#123;Producer_Music_Card&#125;&#125;模板！</p>
    <p>这个模板非常漂亮，大家都应该使用。</p>
  </div>
  <h2 class="h2">转换工具</h2>
  <p>这个工具可以把过去使用的一些模板无损转换为Producer_Music_Card模板。</p>
  <div>
    <el-select v-model="originalTemplate">
      <el-option v-for="item in originalTemplates" :key="item" :label="item" :value="item" />
    </el-select>
    <textarea cols="30" rows="10" v-model="input" class="w-full border-2"></textarea>
    <el-button @click="convert">转换</el-button>

    <el-dialog v-model="resultVisible" title="转换结果" width="50%">
      <pre class="text-wrap">{{ convertedText }}</pre>
      <div>内容</div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElSelect, ElOption, ElButton, ElDialog } from 'element-plus';

const input = ref<string>('');
const originalTemplate = ref<string>('Producer_Music');
const convertedText = ref<string>('');
const resultVisible = ref<boolean>(false);

const originalTemplates: string[] = [
  'Producer_Music',
  'Producer_Song'
]

// =============  交互事件  ===============

function convert() {
  console.log('convert')
  if (originalTemplate.value === 'Producer_Music') {
    // 转换Producer_Music
  } else if (originalTemplate.value === 'Producer_Song') {
    // 转换Producer_Song
  }

  const text = input.value;



  resultVisible.value = true;
}



</script>
