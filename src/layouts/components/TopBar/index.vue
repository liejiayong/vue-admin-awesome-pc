<template>
  <div class="top-bar-container">
    <div class="jy-main">
      <el-row>
        <el-col :xl="6" :lg="6" :md="6" :sm="2" :xs="3">
          <logo />
        </el-col>
        <el-col :xl="14" :lg="13" :md="16" :sm="20" :xs="16">
          <el-menu
            :background-color="variables['menu-background']"
            :text-color="variables['menu-color']"
            :active-text-color="variables['menu-color-active']"
            :default-active="activeMenu"
            mode="horizontal"
            menu-trigger="hover"
          >
            <template v-for="route in routes">
              <side-bar-item
                v-if="!route.hidden"
                :key="route.path"
                :base-path="route.path"
                :item="route"
              ></side-bar-item>
            </template>
          </el-menu>
        </el-col>
        <el-col :xl="4" :lg="5" :md="2" :sm="2" :xs="5">
          <div class="right-panel">
            <error-log class="hidden-md-and-down" />
            <full-screen-bar class="hidden-md-and-down" @refresh="refreshRoute"></full-screen-bar>
            <theme-bar></theme-bar>
            <jfas-icon
              class="hidden-md-and-down"
              title="重载路由"
              :pulse="pulse"
              :icon="['fas', 'redo']"
              @click="refreshRoute"
            />
            <avatar></avatar>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import variables from '@/styles/variables.scss';
import { Avatar, ErrorLog, FullScreenBar, Logo, ThemeBar, SideBarItem } from '@/layouts/components';

export default {
  components: {
    Avatar,
    ErrorLog,
    FullScreenBar,
    ThemeBar,
    SideBarItem,
    Logo,
  },
  data() {
    return {
      pulse: false,
      menuTrigger: 'hover',
    };
  },
  computed: {
    ...mapGetters({
      routes: 'routes/routes',
      visitedRoutes: 'tabsBar/visitedRoutes',
    }),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return variables;
    },
  },
  methods: {
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
.top-bar-container {
  background: $base-menu-background;
  display: flex;
  align-items: center;
  justify-items: flex-end;
  height: $base-top-bar-height;

  .jy-main {
    background: $base-menu-background;

    ::v-deep {
      .el-menu {
        &.el-menu--horizontal {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          height: $base-top-bar-height;
          border-bottom: 0 solid transparent !important;

          .el-menu-item,
          .el-submenu__title {
            padding: 0 15px;
          }

          @media only screen and (max-width: 767px) {
            .el-menu-item,
            .el-submenu__title {
              padding: 0 8px;
            }
            li:nth-child(4),
            li:nth-child(5) {
              display: none !important;
            }
          }

          > .el-menu-item {
            height: $base-top-bar-height;
            line-height: $base-top-bar-height;
          }

          > .el-submenu {
            .el-submenu__title {
              height: $base-top-bar-height;
              line-height: $base-top-bar-height;
            }
          }
        }

        svg {
          width: 1rem;
          margin-right: 3px;
        }

        &--horizontal {
          .el-menu {
            .el-menu-item,
            .el-submenu__title {
              height: $base-menu-item-height;
              line-height: $base-menu-item-height;
            }
          }

          .el-submenu,
          .el-menu-item {
            &.is-active {
              border-bottom: 0 solid transparent !important;
              background-color: $base-color-blue !important;

              .el-submenu__title {
                border-bottom: 0 solid transparent !important;
              }
            }
          }

          > .el-menu-item {
            .el-tag {
              margin-top: calc(#{$base-top-bar-height} / 2 - 7.5px);
              margin-left: 5px;
            }

            @media only screen and (max-width: 1199px) {
              .el-tag {
                display: none;
              }
            }

            &.is-active {
              background-color: transparent !important;
              border-bottom: 3px solid $base-color-blue !important;
            }
          }
        }
      }
    }
  }

  .right-panel {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: $base-top-bar-height;

    ::v-deep {
      .user-name {
        color: rgba($base-color-white, 0.9);
      }

      .user-name + i {
        color: rgba($base-color-white, 0.9);
      }

      svg {
        width: 1em;
        height: 1em;
        margin-right: 15px;
        font-size: $base-font-size-big;
        color: rgba($base-color-white, 0.9);
        cursor: pointer;
        fill: rgba($base-color-white, 0.9);
      }

      button {
        svg {
          margin-right: 0;
          color: rgba($base-color-white, 0.9);
          cursor: pointer;
          fill: rgba($base-color-white, 0.9);
        }
      }

      .el-badge {
        margin-right: 15px;
      }
    }
  }
}
</style>
