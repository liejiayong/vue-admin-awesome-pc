<template>
  <temp
    :interval="6"
    :code-url="require('@/assets/error_images/401.png')"
    oops="抱歉!"
    head="当前页面不存在..."
    info="请检查您输入的网址是否正确，或点击下面的按钮返回首页。"
    btn="返回首页"
  ></temp>
</template>

<script>
  import Temp from './template';

  export default {
    name: 'Page401',
    components: { temp: Temp },
    data() {
      return {};
    },
    beforeMount() {},
    mounted() {},
    beforeDestroy() {},
    methods: {},
  };
</script>

<style lang="scss">
  @import './index.scss';
</style>
