<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" :router="true"
    @select="handleSelect">
    <el-menu-item index="/">
      <span @click="router.push('/')" id="logoheader">
        <span>幻梦萌百工具</span>
      </span>
    </el-menu-item>

    <el-menu-item index="/song">歌曲</el-menu-item>
    <el-menu-item index="/producer">P主</el-menu-item>
    <el-menu-item index="/billboard">B榜</el-menu-item>
    <el-menu-item index="/about">关于</el-menu-item>
    <el-menu-item index="/search">
      <el-icon>
        <component :is="Search" />
      </el-icon>
    </el-menu-item>
    <el-menu-item index="/user">
      <el-icon>
        <component :is="User" />
      </el-icon>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import router from '../../router'
import { Search, User } from '@element-plus/icons-vue'

const activeIndex = ref('1')
const handleSelect = () => {

}


</script>

<style scoped>
.el-menu--horizontal>.el-menu-item:nth-child(1) {
  margin-right: auto;
}

.el-menu--horizontal {
  --el-menu-horizontal-height: 50px;
}

.el-menu-demo {
  width: 100%;
  --el-menu-bg-color: rgba(46, 196, 255, 0.6);
  /* 主背景色 */
  --el-menu-text-color: white;
  --el-menu-item-font-size: 18px;
  --el-menu-base-level-padding: 10px;
}


#logoheader {
  font-family: 'Arial', sans-serif;
  /* 使用现代无衬线字体 */
  font-size: 24px;
  font-weight: bold;
  color: #fcfcfc;
  padding: 10px 20px;
  /* 内边距 */
  display: inline flex;
  height: 50px;
  padding: 0px 10px;

  flex-direction: row;
  align-items: center;
  gap: 10px;


  img {
    height: 40px;
  }
}
</style>
