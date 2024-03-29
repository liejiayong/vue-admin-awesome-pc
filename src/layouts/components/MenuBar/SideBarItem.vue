<template>
  <component
    :is="menuComponent"
    v-if="!item.hidden"
    :item="item"
    :base-path="basePath"
    :only-one-children="onlyOneChildren"
  >
    <template v-if="item.children && item.children.length">
      <side-bar-item
        v-for="route in item.children"
        :key="route.path"
        :base-path="handlePath(route.path)"
        :item="route"
      ></side-bar-item>
    </template>
  </component>
</template>

<script>
import Submenu from './Submenu';
import MenuItem from './MenuItem';
import { isExternal } from '@/utils/validate';
import path from 'path';

export default {
  name: 'SideBarItem',
  components: { Submenu, MenuItem },
  props: {
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    this.onlyOneChild = null;
    return {};
  },
  computed: {
    menuComponent() {
      if (
        this.handleChildren(this.item.children, this.item) &&
        (!this.onlyOneChildren.children || this.onlyOneChildren.notShowChildren) &&
        !this.item.alwaysShow
      ) {
        return 'MenuItem';
      } else {
        return 'Submenu';
      }
    },
  },
  methods: {
    handleChildren(children = [], parent) {
      if (children === null) children = [];
      const showChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          this.onlyOneChildren = item;
          return true;
        }
      });
      if (showChildren.length === 1) {
        return true;
      }

      if (showChildren.length === 0) {
        this.onlyOneChildren = {
          ...parent,
          path: '',
          notShowChildren: true,
        };
        return true;
      }
      return false;
    },
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

<style lang="scss" scoped>
.jy-nav-icon {
  margin-right: 4px;
}

::v-deep {
  .el-tag {
    margin-top: calc((#{$base-menu-item-height} - 16px) / 2);
    padding-left: 4px;
    padding-right: 4px;
    height: 16px;
    line-height: 16px;
    border: 0;
    float: right;
  }
}
</style>
