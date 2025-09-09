<template>
  <div class="w-90% max-w-[600px]">
    <p>这个工具可以把过去使用的一些模板无损转换为Producer_Music_Card模板。</p>
    <p>如果使用Producer_Song模板，可以填入P主的名称有多个名称就填入多个，确保写法与wikitext中的写法相同。转换器会自动识别P主的职能</p>
    <el-select v-model="originalTemplate">
      <el-option v-for="item in originalTemplates" :key="item" :label="item" :value="item" />
    </el-select>
    <el-input-tag v-model="producerNames" placeholder="P主名称" tag-type="primary" class="my-2" />
    <el-input type="textarea" :rows="10" v-model="input" class="w-full"></el-input>
    <el-button @click="convert">转换</el-button>

    <el-dialog v-model="resultVisible" title="转换结果" width="50%">
      <el-button @click="copyToClipboard(convertedText)" type="primary">复制</el-button>
      <pre class="text-wrap">{{ convertedText }}</pre>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElSelect, ElOption, ElButton, ElDialog, ElInput, ElMessage, ElInputTag } from 'element-plus';
import { modifyTemplates, type Template } from '@/utils/WikiParse';

const producerNames = ref<string[]>([]);
const input = ref<string>('');
const originalTemplate = ref<string>('Producer_Song');
const convertedText = ref<string>('');
const resultVisible = ref<boolean>(false);

const originalTemplates: string[] = [
  'Producer_Song',
  'Producer_Music'
]

const roleNames = {
  '作曲': '作曲',
  '填词': '作词',
  '画师': '曲绘',
  '视频制作': 'PV',
}

// =============  交互事件  ===============

function convert() {
  let names: string[] = [];
  let modify = (tl: Template) => tl;
  if (originalTemplate.value === 'Producer_Music') {
    names = ['Producer_Music', 'Producer Music'];
    modify = (tl: Template) => {
      tl.name = 'Producer_Music_Card';
      return tl
    }
  } else if (originalTemplate.value === 'Producer_Song') {
    names = ['Producer_Song', 'Producer Song'];
    modify = (tl: Template) => {
      tl.name = 'Producer_Music_Card';
      const roles: string[] = [];
      for (const key in roleNames) {
        for (const producerName of producerNames.value) {
          if (tl.data[key] && tl.data[key].includes(producerName)) {
            roles.push(roleNames[key as keyof typeof roleNames]);
          }
        }
        tl.data['职能'] = roles.join('、');
      }
      return tl
    }
  }

  convertedText.value = modifyTemplates(input.value, [originalTemplate.value], modify)
  resultVisible.value = true;
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    ElMessage('复制成功！')
  } catch (err) {
    console.error('复制失败：', err)
    ElMessage('复制失败，请手动复制。')
  }
}

</script>
