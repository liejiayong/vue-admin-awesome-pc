# zx-Keel

#基础功能演示地址：[基础功能演示地址](https://chuzhixin.github.io/zx-keel/) #集成框架演示地址：[集成框架演示地址](http://mpfhrd48.sanxing.uz7.cn/vue-admin-beautiful/#/login?redirect=%2F)

## 安装方法

```
cnpm i -S zx-Keel

```

### keel 组件 main.js 全局引入

```
import Vue from 'vue'
import {Keel,Heading,Img,Text} from 'zx-Keel'
Vue.component('byui-Keel', Keel)
Vue.component('byui-Keel-Heading', Heading)
Vue.component('byui-Keel-Img', Img)
Vue.component('byui-Keel-Text', Text)

```

### template 完整示例

```
<template>
	<div id="app">
		<byui-Keel v-if="show">
			<byui-Keel-Heading :Img="true" />
			<byui-Keel-Text :lines="5" />
		</byui-Keel>
	</div>
</template>

<script>
export default {
	name: 'app',
	data() {
		return {
			show: true
		};
	},
	mounted() {
		setTimeout(() => {
			this.show = false;
			alert('加载完成,关闭龙骨')
		}, 3000);
	}
};
</script>

<style>
body {
	margin: 0;
	padding: 0;
}
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	Text-align: center;
	color: #2c3e50;
	padding: 20px;
}
</style>


```
