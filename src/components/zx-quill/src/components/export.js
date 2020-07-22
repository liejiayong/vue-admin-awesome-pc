import ZxQuill from "./index.vue";
export default ZxQuill;
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.component("zx-quill", ZxQuill);
}
