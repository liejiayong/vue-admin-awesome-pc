<template>
  <div :class="[miniCls]" class="sidebar-container">
    <el-aside>
      <!-- <div class="logo"><img src="@/assets/logo.png" alt="" /></div> -->
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#28333e"
        text-color="#858b92"
        active-text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <template v-for="(m1, i1) in menuRoutes" :key="i1">
          <template v-if="m1.children && m1.children.length">
            <submenus :data="m1" :index="i1"></submenus>
          </template>
          <template v-else>
            <el-menu-item v-if="!m1.hidden" :index="i1">
              <el-icon><icon-menu /></el-icon>
              <template #title>{{ m1.meta?.title }}</template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { constantRoutes as menuRoutes } from "@/router/routes.js";
import submenus from "./submenu.vue";
import useStore from "@/store";
const store = useStore();
const isCollapse = computed(() => !store.app.sidebar.opened);
const miniCls = computed(() => {
  return isCollapse.value ? "is-mini" : "";
});
</script>
<style lang="scss" scoped>
.sidebar-container {
  position: relative;
  width: 200px;
  height: 100vh;
  overflow: hidden;
  transition: width 0.3s ease-in-out;
  &.is-mini {
    width: 60px;
  }
  :deep(.el-aside) {
    height: 100%;
  }
  :deep(.el-menu) {
    min-height: 100%;
    .el-sub-menu {
      &.is-opened {
        .el-sub-menu__title {
          color: #fff;
        }
      }
      &.is-active {
      }
    }
    .el-menu-item {
      &.is-active {
        background-color: var(--el-menu-hover-bg-color);
      }
    }
  }
  .logo {
    margin: 0 auto;
    width: 60px;
    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
