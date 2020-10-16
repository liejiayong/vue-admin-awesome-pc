import 'echarts';
import 'echarts/map/js/china';
import 'echarts/map/js/world';

import 'echarts-wordcloud';

import echart from 'vue-echarts';
import jtheme from './echarts-theme.json';

echart.registerTheme('jtheme', jtheme);
export default echart;
