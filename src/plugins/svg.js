import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon';

Vue.component('SvgIcon', SvgIcon);
const requireAll = (requireContext) => {
  /*let a = requireContext.keys().map(requireContext)
  let arr = []
  for (let i = 0 i < a.length i++) {
    console.log()
    let icon = a[i].default.id
    arr.push(icon)
  }
  console.log(JSON.stringify(arr))*/
  return requireContext.keys().map(requireContext);
};
const svg = require.context('../assets/svg', false, /\.svg$/);
const colorfull = require.context('../assets/colorful', false, /\.svg$/);
requireAll(svg);
requireAll(colorfull);
