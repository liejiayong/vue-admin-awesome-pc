import Vue from 'vue'
// import ZXIcon from 'zx-icon'
import JYIcon from 'vue-fas-icon'
import JyQueryForm from "@/components/FormQuery"
import JyQueryFormTopPanel from "@/components/FormQuery/TopPanel"
import JyQueryFormBottomPanel from "@/components/FormQuery/BottomPanel"
import JyQueryFormLeftPanel from "@/components/FormQuery/LeftPanel"
import JyQueryFormRightPanel from "@/components/FormQuery/RightPanel"


// Vue.component("Jy-icon", ZXIcon)
Vue.use(JYIcon, { name: "jfas-icon" })
Vue.component("jy-form-query", JyQueryForm);
Vue.component("jy-form-query-left-panel", JyQueryFormLeftPanel);
Vue.component("jy-form-query-right-panel", JyQueryFormRightPanel);
Vue.component("jy-form-query-top-panel", JyQueryFormTopPanel);
Vue.component("jy-form-query-bottom-panel", JyQueryFormBottomPanel);
