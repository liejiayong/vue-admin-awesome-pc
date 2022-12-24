<template>
  <div class="lie__tab">
    <ul class="lie__tab__title">
      <li class="active">
        <span class="lie__tab-active"></span>
        <span class="title">百度一下</span>
        <i class="lie__tab-close">×</i>
      </li>
      <li>
        <span class="lie__tab-active"></span>
        <span class="title">百度一下</span>
        <i class="lie__tab-close">×</i>
      </li>
    </ul>
    <div class="lie__tab-control">
      <li class="lie__tab__btn lie__tab-prev"></li>
      <li class="lie__tab__btn lie__tab-next"></li>
      <li class="lie__tab__btn lie__tab-more"></li>
    </div>
    <div class="layui-tab-control">
      <li class="layui-tab-prev layui-icon layui-icon-left"></li>
      <li class="layui-tab-next layui-icon layui-icon-right"></li>
      <li class="layui-tab-tool layui-icon layui-icon-down">
        <ul class="layui-nav" lay-filter="">
          <li class="layui-nav-item">
            <a href="javascript:;"><i class="layui-icon layui-icon-down layui-nav-more"></i></a>
            <dl class="layui-nav-child layui-anim layui-anim-upbit">
              <dd id="closeThis"><a href="#">关 闭 当 前</a></dd>
              <dd id="closeOther"><a href="#">关 闭 其 他</a></dd>
              <dd id="closeAll"><a href="#">关 闭 全 部</a></dd>
            </dl>
          </li>
          <span class="layui-nav-bar" style="left: 0px; width: 0px; opacity: 0"></span>
        </ul>
      </li>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
</script>
<style lang="scss" scoped>
.lie__tab {
  position: relative;
  margin: 0 auto;
  background-color: white;
  // title
  &__title {
    padding: 0 80px 0 40px;
    position: relative;
    left: 0;
    height: 40px;
    white-space: nowrap;
    font-size: 0;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
    border: 1px solid whitesmoke;

    &-none {
      padding: 0;
    }
    li {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      transition: all 0.2s;
      -webkit-transition: all 0.2s;
      line-height: 40px;
      min-width: 65px;
      padding: 0 15px;
      border-right: 1px solid whitesmoke;
      color: dimgray;
      font-size: 13.5px;
      list-style: none;
      text-align: center;
      cursor: pointer;

      .title {
      }
    }
  }
  &-active {
    display: inline-block;
    background-color: lightgray;
    width: 8px;
    height: 8px;
    border-radius: 30px;
    margin-right: 12px;
    .lie__tab li.active & {
      background-color: #36b368 !important;
    }
  }
  &-close {
    position: relative;
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: 20px;
    margin-left: 8px;
    top: 1px;
    text-align: center;
    font-size: 14px;
    color: #c2c2c2;
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
    user-select: none;
    font-family: layui-icon !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  // control
  &-control {
  }
  &-prev {
    border-right: 1px solid whitesmoke;
    &::before {
      content: "";
      display: block;
      border: solid black;
      border-width: 0 1px 1px 0;
      display: inline-block;
      padding: 4px;
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
    }
  }
  &-next {
    right: 40px;
    border-left: 1px solid whitesmoke;
    &::before {
      content: "";
      display: block;
      border: solid black;
      border-width: 0 1px 1px 0;
      display: inline-block;
      padding: 4px;
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }
  }
  &-more {
    right: 0;
    border-left: 1px solid whitesmoke;
    &::before {
      content: "";
      display: block;
      border: solid black;
      border-width: 0 1px 1px 0;
      display: inline-block;
      padding: 4px;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
    }
  }
  &__btn {
    position: absolute;
    top: 0px;
    height: 40px;
    line-height: 40px;
    width: 40px;
    text-align: center;
    border-top: whitesmoke 1px solid;
    border-bottom: whitesmoke 1px solid;
    cursor: pointer;
  }
}
</style>
