<template>
  <el-submenu ref="subMenu" :index="handlePath(item.path)" :popper-append-to-body="false">
    <template slot="title">
      <jfas-icon v-if="item.meta && item.meta.icon" :icon="['fas', item.meta.icon]" class="jy-nav-icon" />
      <svg-icon v-if="item.meta && item.meta.remixIcon" :icon-class="item.meta.remixIcon" class="jy-nav-icon" />
      <span>{{ item.meta.title }}</span>
    </template>
    <slot></slot>
  </el-submenu>
</template>

<script>
import { isExternal } from '@/utils/validate';
import path from 'path';

export default {
  name: 'Submenu',
  props: {
    onlyOneChildren: {
      type: Object,
      default() {
        return null;
      },
    },
    item: {
      type: Object,
      default() {
        return null;
      },
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  methods: {
    handlePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>
