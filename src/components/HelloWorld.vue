<script setup>
import { ref, reactive } from 'vue';
import VueFlexWaterfall from './vue-flex-waterfall.vue';
import kuanWaterfall from './kuan-vue-waterfall.vue';
defineProps({
  msg: String,
});
</script>

<template>
  <kuanWaterfall></kuanWaterfall>
  <!-- <vue-flex-waterfall col="4" col-spacing="15" :break-at="{ 900: 3, 600: 2, 300: 1 }">
    <img v-for="(img, i) in imgs" :key="i" :src="img" alt="" />
  </vue-flex-waterfall> -->
</template>

<style scoped>
img {
  display: block;
}
</style>
