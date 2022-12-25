<template>
  <div class="lie__tab">
    <ul class="lie__tab__title">
      <div ref="tabParent" class="lie__tab__title-box">
        <div ref="tabWrappers" class="lie__tab__title-wrapper">
          <li @click="onSelect(item)" v-for="item in menus" :key="item" :class="{ active: item.name === curMenu.name }">
            <span class="lie__tab-active"></span>
            <span class="title">{{ item?.meta?.title }}</span>
            <i class="lie__tab-close">×</i>
          </li>
        </div>
      </div>
    </ul>
    <div class="lie__tab-control">
      <li @click="onTabLt" class="lie__tab__btn lie__tab-prev"></li>
      <li @click="onTabRt" class="lie__tab__btn lie__tab-next"></li>
      <li class="lie__tab__btn lie__tab__down">
        <ul class="lie__nav">
          <li class="lie__nav__item">
            <a href="javascript:;" class="lie__tab__btn lie__tab-more"></a>
            <dl class="lie__nav__child">
              <dd><a href="javascript:;">关 闭 当 前</a></dd>
              <dd><a href="javascript:;">关 闭 其 他</a></dd>
              <dd><a href="javascript:;">关 闭 全 部</a></dd>
            </dl>
          </li>
        </ul>
      </li>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const curMenu = ref({});
const menus = ref([]);
function onSelect(item) {
  curMenu.value = item;
}
// test
menus.value = Array(30)
  .fill({
    path: "n",
    name: "n1",
    meta: { title: "n" },
  })
  .map((v, i) => ({
    path: v.path + i,
    name: v.name + i,
    meta: { title: v.meta.title + i },
  }));

// animation
const tabParent = ref();
const tabWrappers = ref();
let tabPerWidth = 0,
  tabTotalWidth = 0;
let tabCol = 0,
  tabColAll = 0;
function getTranslate(width) {
  return `-webkit-transform:translate(${width}px,0);transform:translate(${width}px,0);`;
}
function onTabLt() {
  if (tabCol === 0) return;
  --tabCol;
  tabWrappers.value.style = getTranslate(-tabCol * tabPerWidth);
}
function onTabRt() {
  if (tabCol === tabColAll) return;
  ++tabCol;
  tabWrappers.value.style = getTranslate(-tabCol * tabPerWidth);
}
onMounted(() => {
  tabPerWidth = tabParent.value.offsetWidth;
  tabTotalWidth = Array.from(tabWrappers.value.children).reduce((total, pre) => {
    return total + pre.offsetWidth;
  }, 0);
  tabCol = 0;
  tabColAll = Math.ceil(tabTotalWidth / tabPerWidth);
});
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
    &-box {
      position: relative;
      overflow: hidden;
    }
    &-wrapper {
      position: relative;
      display: flex;
      -webkit-transition: transform 0.3s;
      transition: transform 0.3s;
      // zoom: 1;
      // &:after {
      //   content: "\0020";
      //   clear: both;
      //   display: block;
      //   height: 0;
      //   visibility: hidden;
      //   opacity: 0;
      //   font-size: 0;
      // }
    }
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
      flex-shrink: 0;
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
    display: block;
    border-left: 0;
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
  &__down {
    right: 0;
    border-left: 1px solid whitesmoke;
  }
  &__btn {
    position: absolute;
    top: 0px;
    height: 40px;
    line-height: 40px;
    width: 40px;
    text-align: center;
    z-index: 5;
    background: #fff;
    box-sizing: border-box;
    // border-top: whitesmoke 1px solid;
    // border-bottom: whitesmoke 1px solid;
    border: whitesmoke 1px solid;
    cursor: pointer;
  }
}
@keyframes lie-upbit {
  0% {
    transform: translate3d(0, 30px, 0);
    opacity: 0.3;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
.lie__nav {
  position: relative;
  &__item {
    position: relative;
  }
  &__child {
    margin: 0;
    display: none;
    position: absolute;
    left: auto;
    top: 45px;
    right: 3px;
    width: 120px;
    min-width: 100%;
    line-height: 36px;
    padding: 5px 0;
    box-shadow: 0 2px 4px rgb(0 0 0 / 12%);
    border: 1px solid whitesmoke;
    background-color: #fff;
    z-index: 100;
    border-radius: 2px;
    white-space: nowrap;
    dd {
      margin: 0;
      padding: 0 20px;
      &:hover {
        background-color: #f6f6f6;
        color: rgba(0, 0, 0, 0.8);
      }
    }
    .lie__tab__down:hover,
    .lie__tab__down.is-show {
      & {
        display: block;
        animation: lie-upbit 0.3s both;
      }
    }
  }
}
</style>
