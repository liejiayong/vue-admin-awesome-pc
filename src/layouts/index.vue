<template>
  <div class="app-layout-wrapper" :class="classObj">
    <div
      v-if="'horizontal' === layout"
      class="layout-container-horizontal"
      :class="{
        fixed: header === 'fixed',
        'no-tabs-bar': tabsBar === 'false' || tabsBar === false,
      }"
    >
      <div :class="header === 'fixed' ? 'fixed-header' : ''">
        <top-bar></top-bar>
        <div
          v-if="tabsBar === 'true' || tabsBar === true"
          :class="{ 'tag-view-show': tabsBar }"
        >
          <div class="jy-main">
            <tabs-bar></tabs-bar>
          </div>
        </div>
      </div>
      <div class="jy-main main-padding">
        <app-main></app-main>
      </div>
    </div>
    <div
      v-else
      class="layout-container-vertical"
      :class="{
        fixed: header === 'fixed',
        'no-tabs-bar': tabsBar === 'false' || tabsBar === false,
      }"
    >
      <div
        v-if="device === 'mobile' && collapse === false"
        class="mask"
        @click="handleFoldSideBar"
      />
      <menu-bar></menu-bar>
      <div class="jy-main" :class="collapse ? 'is-collapse-main' : ''">
        <div :class="header === 'fixed' ? 'fixed-header' : ''">
          <nav-bar></nav-bar>
          <tabs-bar v-if="tabsBar === 'true' || tabsBar === true" />
        </div>
        <app-main></app-main>
      </div>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import { Media, AppMain, NavBar, MenuBar, TabsBar, TopBar } from './components';
import { mapActions, mapGetters } from 'vuex';
import { tokenName } from '@/config/settings';

export default {
  name: 'Layout',
  components: {
    TopBar,
    NavBar,
    MenuBar,
    AppMain,
    TabsBar,
  },
  mixins: [Media],
  data() {
    return { oldLayout: '' };
  },
  computed: {
    ...mapGetters({
      layout: 'settings/layout',
      tabsBar: 'settings/tabsBar',
      collapse: 'settings/collapse',
      header: 'settings/header',
      device: 'settings/device',
    }),
    classObj() {
      return {
        mobile: this.device === 'mobile',
      };
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  mounted() {
    this.oldLayout = this.layout;
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Juejin')) {
      this.$baseAlert(
        '不支持在掘金内置浏览器演示，请手动复制以下地址到浏览器中查看http://xxx'
      );
    }
    const isMobile = this.handleIsMobile();
    if (isMobile) {
      if (isMobile) {
        //横向布局时如果是手机端访问那么改成纵向版
        this.$store.dispatch('settings/changeLayout', 'vertical');
      } else {
        this.$store.dispatch('settings/changeLayout', this.oldLayout);
      }
      this.$store.dispatch('settings/toggleDevice', 'mobile');
      setTimeout(() => {
        this.$store.dispatch('settings/foldSideBar');
      }, 2000);
    } else {
      this.$store.dispatch('settings/openSideBar');
    }
    this.$nextTick(() => {
      window.addEventListener(
        'storage',
        (e) => {
          if (e.key === tokenName || e.key === null) window.location.reload();
          if (e.key === tokenName && e.value === null) window.location.reload();
        },
        false
      );
    });
  },
  methods: {
    handleIsMobile() {
      return document.body.getBoundingClientRect().width - 1 < 992;
    },
    handleResize() {
      if (!document.hidden) {
        const isMobile = this.handleIsMobile();
        if (isMobile) {
          //横向布局时如果是手机端访问那么改成纵向版
          this.$store.dispatch('settings/changeLayout', 'vertical');
        } else {
          this.$store.dispatch('settings/changeLayout', this.oldLayout);
        }

        this.$store.dispatch(
          'settings/toggleDevice',
          isMobile ? 'mobile' : 'desktop'
        );
      }
    },
    ...mapActions({
      handleFoldSideBar: 'settings/foldSideBar',
    }),
  },
};
</script>

<style lang="scss" scoped>
@mixin fix-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: $base-z-index - 2;
  width: 100%;
  overflow: hidden;
}

.app-layout-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .layout-container-horizontal {
    position: relative;

    &.fixed {
      padding-top: calc(#{$base-top-bar-height} + #{$base-tabs-bar-height});
    }

    &.fixed.no-tabs-bar {
      padding-top: $base-top-bar-height;
    }

    ::v-deep {
      .jy-main {
        width: 88%;
        margin: auto;
      }

      .fixed-header {
        @include fix-header;
      }

      .tag-view-show {
        background: $base-color-white;
        box-shadow: $base-box-shadow;
      }

      .nav-bar-container {
        .fold-unfold {
          display: none;
        }
      }

      .main-padding {
        margin-top: 15px;
        margin-bottom: 15px;

        .app-main-container {
          min-height: calc(100vh - 180px);
          background: $base-color-white;
        }
      }
    }
  }

  .layout-container-vertical {
    position: relative;

    .mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: $base-z-index - 1;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #000;
      opacity: 0.5;
    }

    &.fixed {
      padding-top: calc(#{$base-nav-bar-height} + #{$base-tabs-bar-height});
    }

    &.fixed.no-tabs-bar {
      padding-top: $base-nav-bar-height;
    }

    .jy-main {
      position: relative;
      min-height: 100%;
      margin-left: $base-left-menu-width;
      background: #f6f8f9;
      transition: $base-transition;

      ::v-deep {
        .fixed-header {
          @include fix-header;

          left: $base-left-menu-width;
          width: $base-right-content-width;
          box-shadow: $base-box-shadow;
          transition: $base-transition;
        }

        .nav-bar-container {
          position: relative;
          box-sizing: border-box;
        }

        .tabs-bar-container {
          box-sizing: border-box;
        }

        .app-main-container {
          width: calc(100% - #{$base-padding} - #{$base-padding});
          margin: $base-padding auto;
          background: $base-color-white;
          border-radius: $base-border-radius;
        }
      }

      &.is-collapse-main {
        margin-left: $base-left-menu-width-min;

        ::v-deep {
          .fixed-header {
            left: $base-left-menu-width-min;
            width: calc(100% - 65px);
          }
        }
      }
    }
  }

  /* 手机端开始 */
  &.mobile {
    ::v-deep {
      .el-pager,
      .el-pagination__jump {
        display: none;
      }

      .layout-container-vertical {
        .el-scrollbar.side-bar-container.is-collapse {
          width: 0;
        }

        .jy-main {
          width: 100%;
          margin-left: 0;
        }
      }

      .jy-main {
        .fixed-header {
          left: 0 !important;
          width: 100% !important;
        }
      }
    }
  }

  /* 手机端结束 */
}
</style>
