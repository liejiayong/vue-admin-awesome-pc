<template>
  <div class="nav-bar-container">
    <el-row :gutter="15">
      <el-col :xs="4" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="left-panel">
          <i
            :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            :title="collapse ? '展开' : '收起'"
            class="fold-unfold"
            @click="handleCollapse"
          ></i>
          <breadcrumb class="hidden-xs-only" />
        </div>
      </el-col>
      <el-col :xs="20" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="right-panel">
          <error-log></error-log>
          <full-screen-bar @refresh="refreshRoute"></full-screen-bar>
          <theme-bar></theme-bar>
          <jfas-icon title="重载所有路由" :pulse="pulse" :icon="['fas', 'redo']" @click="refreshRoute"></jfas-icon>
          <avatar></avatar>
          <!--  <jfas-icon
						title="退出系统"
						:icon="['fas', 'sign-out-alt']"
						@click="logout"
					/>-->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { Avatar, Breadcrumb, ErrorLog, FullScreenBar, ThemeBar } from '@/layouts/components';

export default {
  name: 'NavBar',
  components: {
    Avatar,
    Breadcrumb,
    ErrorLog,
    FullScreenBar,
    ThemeBar,
  },
  data() {
    return {
      pulse: false,
    };
  },
  computed: {
    ...mapGetters({
      collapse: 'settings/collapse',
      visitedRoutes: 'tabsBar/visitedRoutes',
      device: 'settings/device',
      routes: 'routes/routes',
    }),
  },
  methods: {
    handleCollapse() {
      this.$store.dispatch('settings/changeCollapse');
    },
    async refreshRoute() {
      this.$baseEventBus.$emit('reloadrouter');
      this.pulse = true;
      setTimeout(() => {
        this.pulse = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar-container {
  position: relative;
  height: $base-nav-bar-height;
  padding-right: $base-padding;
  padding-left: $base-padding;
  overflow: hidden;
  user-select: none;
  background: $base-color-white;
  box-shadow: $base-box-shadow;

  .left-panel {
    height: $base-nav-bar-height;
    display: flex;
    align-items: center;
    justify-items: center;

    .fold-unfold {
      font-size: 20px;
      color: $base-color-gray;
      cursor: pointer;
    }

    ::v-deep {
      .breadcrumb-container {
        margin-left: 10px;
      }
    }
  }

  .right-panel {
    height: $base-nav-bar-height;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;

    ::v-deep {
      svg {
        width: 1em;
        height: 1em;
        margin-right: 15px;
        font-size: $base-font-size-big;
        color: $base-color-gray;
        cursor: pointer;
        fill: $base-color-gray;
      }

      button {
        svg {
          margin-right: 0;
          color: $base-color-white;
          cursor: pointer;
          fill: $base-color-white;
        }
      }

      .el-badge {
        margin-right: 15px;
      }
    }
  }
}
</style>
