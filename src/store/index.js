import useUserStore from "./modules/user.js";
import useAppStore from "./modules/app.js";
import useSettingsStore from "./modules/settings.js";

const useStore = () => ({
  user: useUserStore(),
  app: useAppStore(),
  settings: useSettingsStore(),
});

export default useStore;
