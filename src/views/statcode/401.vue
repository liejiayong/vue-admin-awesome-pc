<template>
  <temp
    :interval="6"
    :code-url="require('@/assets/error_images/401.png')"
    oops="抱歉!"
    head="您没有操作权限..."
    info="当前帐号没有操作权限,请联系管理员。"
    btn="返回"
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
