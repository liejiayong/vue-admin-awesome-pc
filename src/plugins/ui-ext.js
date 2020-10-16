import Vue from 'vue';
// import ZXIcon from 'zx-icon'
import JYIcon from 'vue-fas-icon';
import JyQueryForm from '@/components/FormQuery';
import JyQueryFormTopPanel from '@/components/FormQuery/TopPanel';
import JyQueryFormBottomPanel from '@/components/FormQuery/BottomPanel';
import JyQueryFormLeftPanel from '@/components/FormQuery/LeftPanel';
import JyQueryFormRightPanel from '@/components/FormQuery/RightPanel';
import jcount from '@/components/count';

// Vue.component("Jy-icon", ZXIcon)
Vue.use(JYIcon, { name: 'jfas-icon' });
Vue.use(jcount);
Vue.component('JyFormQuery', JyQueryForm);
Vue.component('JyFormQueryLeftPanel', JyQueryFormLeftPanel);
Vue.component('JyFormQueryRightPanel', JyQueryFormRightPanel);
Vue.component('JyFormQueryTopPanel', JyQueryFormTopPanel);
Vue.component('JyFormQueryBottomPanel', JyQueryFormBottomPanel);
