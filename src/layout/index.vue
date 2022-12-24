<template>
  <div class="layout-container">
    <el-container>
      <sidebar></sidebar>
      <el-container>
        <el-header>
          <headers></headers>
        </el-header>
        <el-main>
          <router-tab></router-tab>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import sidebar from "./components/sidebar/index.vue";
import headers from "./components/header/index.vue";
import routerTab from "./components/router-tab/index.vue";
</script>
<style lang="scss" scoped>
.layout-container {
}
</style>
