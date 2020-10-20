<template>
  <div class="error-container">
    <div class="error-content">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="pic-error">
            <img alt="401" class="pic-error-parent" :src="codeUrl" />
            <img
              alt="401"
              class="pic-error-child left"
              src="@/assets/error_images/cloud.png"
            />
            <img
              alt="401"
              class="pic-error-child"
              src="@/assets/error_images/cloud.png"
            />
            <img
              alt="401"
              class="pic-error-child"
              src="@/assets/error_images/cloud.png"
            />
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="bullshit">
            <div class="bullshit-oops">
              {{ oops }}
            </div>
            <div class="bullshit-headline">
              {{ head }}
            </div>
            <div class="bullshit-info">
              {{ info }}
            </div>
            <a class="bullshit-return-home" href="#/index">
              {{ interval }}s&nbsp;{{ btn }}
            </a>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageStatusCode',
  props: {
    interval: {
      type: Number,
      default: 6,
    },
    head: {
      type: String,
      default: '当前页面不存在...',
    },
    info: {
      type: String,
      default: '请检查您输入的网址是否正确，或点击下面的按钮返回首页。',
    },
    oops: {
      type: String,
      default: '抱歉!',
    },
    btn: {
      type: String,
      default: '返回首页',
    },
    codeUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  beforeMount() {
    this.timer = null;
  },
  mounted() {
    this.timeChange();
    document.body.style.background = '#ffffff';
  },
  beforeDestroy() {
    clearInterval(this.timer);
    document.body.style.background = '#f2f2f2';
  },
  methods: {
    timeChange() {
      let interval = this.interval;
      this.timer = setInterval(() => {
        if (this.interval) {
          interval--;
        } else {
          this.$router.push({ path: '/' });
          this.$store.dispatch('tagsBar/delOthersRoutes', {
            path: '/',
          });
          clearInterval(this.timer);
        }
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
@import './index.scss';
</style>
