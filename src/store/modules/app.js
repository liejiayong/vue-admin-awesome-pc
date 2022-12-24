import { defineStore } from "pinia";

const app_sidebar = localStorage.getItem("app_sidebar");

const useAppStore = defineStore("app", {
  state: () => ({
    sidebar: {
      opened: app_sidebar ? !!+app_sidebar.split("-")[0] : true,
      withoutAnimation: app_sidebar ? !!+app_sidebar.split("-")[1] : false,
    },
  }),
  actions: {
    toggleSidebar(opened, withoutAnimation) {
      const _opened = opened ? opened : !this.sidebar.opened;
      const _widthoutAnimation = withoutAnimation ? withoutAnimation : this.sidebar.withoutAnimation;
      const cache = `${_opened}-${_widthoutAnimation}`;
      localStorage.setItem("app_sidebar", cache);
      this.sidebar.opened = _opened;
      this.sidebar.withoutAnimation = _widthoutAnimation;
    },
  },
});

export default useAppStore;
