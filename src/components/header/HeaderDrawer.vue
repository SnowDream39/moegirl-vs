<template>
  <header>
    <nav>
      <span @click="router.push('/')" id="logoheader"><span>幻梦萌百工具</span></span>
      <span @click="logoClicked" id="menu-button">
        ☰
      </span>
    </nav>
  </header>
  <el-drawer direction="ltr" v-model="asideVisible" :with-header="false"
    style="background: rgba(255,255,255,0.2);backdrop-filter: blur(12px);">
    <aside>
      <ul>
        <li @click="jump('/song')">歌曲</li>
        <li @click="jump('/producer')">P主</li>
        <li @click="jump('/billboard')">B榜</li>
      </ul>
    </aside>
  </el-drawer>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '../../router/index.ts'

const asideVisible = ref(false)

function logoClicked() {
  asideVisible.value = !asideVisible.value
}

function jump(address: string) {
  router.push(address)
  asideVisible.value = false
}

</script>

<style lang="scss" scoped>
header {
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  /* 调整透明度，增加背景亮度 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

nav {
  display: inline flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(46, 196, 255, 0.6);
  /* 主背景色 */
  backdrop-filter: blur(8px);

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
}

nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: inline flex;
  justify-content: center;
  font-size: 18px;
  /* 调整字体大小 */
  color: white;
  overflow: hidden;
  /* 确保子元素不超出圆角区域 */
  position: relative;
  padding-right: 50px;

  li {
    padding: 15px 15px;
    cursor: pointer;
    /* 鼠标样式 */
    border-radius: 10px;
    /* 每个导航项的圆角 */
    transition: background-color 0.3s ease, transform 0.3s ease;
    /* 添加平滑过渡 */

    img {
      height: 30px;
    }
  }

  li:hover {
    background-color: rgba(255, 255, 255, 0.2);
    /* 悬停时背景色变化 */
    transform: scale(1.03);
    /* 悬停时放大效果 */
  }

  li a {
    text-decoration: none;
    color: white;
    font-weight: 500;
    /* 调整字体粗细 */
  }
}

:global(.el-drawer) {
  background-color: #80ceff;
}

aside ul {
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
  font-size: 18px;
  color: white;


  li {
    padding: 10px 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    /* 添加平滑过渡 */
  }

  li:hover {
    background-color: #b9b9b9;
    /* 悬停时背景色变化 */
    transform: scale(1.03);
  }

  li a {
    text-decoration: none;
    color: white;
  }
}

#search-vpoll {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 15px 15px; // 保持与其他导航项一致的内边距

  .el-icon {
    color: #ffffff;
    font-size: 18px;
  }
}


nav {
  display: inline flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(46, 196, 255, 0.5);
  /* 主背景色 */
  backdrop-filter: blur(12px);
}

nav li:not(#logoheader) {
  display: none;
}

#logoheader {
  display: block;
  align-items: center;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
  /* 使用现代无衬线字体 */
  font-size: 25px;
  font-weight: bold;
  color: #fcfcfc;
  padding: 10px 10px;
  /* 内边距 */
  transform: translateX(20px);
}

#menu-button {
  color: #ffffff;
  font-size: 24px;
  margin-left: 5px;
  /* 安全边距 */
  order: -1;
  /* 强制最左侧 */
  transform: translateX(-1px);
  /* 微调对齐 */
  margin: 10px;
}

#search-mobile {
  color: #ffffff;
  margin-left: 5px;
  /* 安全边距 */
  order: 1;
  /* 强制最左侧 */
  transform: translateX(-5px);
  /* 微调对齐 */
}
</style>
