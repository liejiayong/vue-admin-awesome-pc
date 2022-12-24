<template>
  <el-row class="header-container">
    <el-col :span="12">
      <button @click="store.app.toggleSidebar()" class="ico-btn-reset ico-btn">
        <el-icon :size="icoSize"><component :is="icoOperator"></component></el-icon>
      </button>
      <button class="ico-btn-reset ico-btn">
        <el-icon :size="icoSize"><RefreshRight /></el-icon>
      </button>
    </el-col>
    <el-col :span="12" class="tr">
      <button class="ico-btn-reset ico-btn">
        <el-icon :size="icoSize"><component :is="icoScreen"></component></el-icon>
      </button>
      <button class="ico-btn-reset ico-btn">
        <el-badge :value="12">
          <el-icon :size="icoSize"><Bell /></el-icon>
        </el-badge>
      </button>
      <button class="ico-btn-reset ico-btn">
        <el-icon :size="icoSize"><User /></el-icon>
      </button>
      <button class="ico-btn-reset ico-btn">
        <el-icon :size="icoSize"><Setting /></el-icon>
      </button>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import useStore from "@/store";
const store = useStore();
const icoOperator = computed(() => {
  return store.app.sidebar.opened ? "Expand" : "Fold";
});
const screenStatus = ref(false);
const icoScreen = computed(() => {
  return screenStatus.value ? "ScaleToOriginal" : "FullScreen";
});
const icoSize = ref(18);
</script>
<style lang="scss" scoped>
.header-container {
  line-height: var(--el-header-height);
  .ico-btn {
    padding: 0 20px;
    height: 100%;
  }
}
</style>
