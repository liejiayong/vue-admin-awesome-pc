import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

Vue.component('svg-icon', SvgIcon)
const req = require.context('../assets/svg', false, /\.svg$/)
const requireAll = (requireContext) => {
    /*let a = requireContext.keys().map(requireContext)
    let arr = []
    for (let i = 0 i < a.length i++) {
      console.log()
      let icon = a[i].default.id
      arr.push(icon)
    }
    console.log(JSON.stringify(arr))*/
    return requireContext.keys().map(requireContext)
}
requireAll(req)
