# zx-player(作者:初志鑫<1204505056@qq.com>)

## 注意事项

```
只能用于Vue CLI项目

```

## 鸣谢

```
努力了这么久,终于成了一名合格的代码搬运工,我只是有幸站在了巨人的肩膀上,感谢自己,感谢巨人...

```

## 实现功能

```
1.实现了blob加密video的src
2.实现了flv的html5播放
3.实现了hls(m3u8)的html5播放

```

### 商务合作与赞赏

```
邮箱  1204505056@qq.com
QQ 1204505056

如果你觉得这个项目帮助到了你，你可以赞赏一下作者:
```

![image](https://raw.githubusercontent.com/chuzhixin/donate/master/donation.png)

## 安装方法

```
cnpm i -S zx-player

```

### Mp4 组件 main.js 全局引入

```
import Vue from 'vue'
import {Mp4} from 'zx-player'
Vue.component('byui-player-Mp4', Mp4)

```

### Hls(m3u8)组件 main.js 全局引入

```
import Vue from 'vue'
import {Hls} from 'zx-player'
Vue.component('byui-player-Hls', Hls)

```

### Flv 组件 main.js 全局引入

```
import Vue from 'vue'
import {Flv} from 'zx-player'
Vue.component('byui-player-Flv', Flv)

```

### template 完整示例(不要忘记改成自己的视频路径)

```
<template>
	<div id="app">
		<byui-player-Mp4 :config="config1" @player="Player1 = $event" />
		<byui-player-Hls :config="config2" @player="Player2 = $event" />
		<byui-player-Flv :config="config3" @player="Player3 = $event" />
	</div>
</template>

<script>
export default {
	name: 'app',
	data() {
		return {
			config1: {
				id: 'mse1',
				url: '/video/boyun.Mp4'
			},
			Player1: null,
			config2: {
				id: 'mse2',
				url: '/video/boyun.m3u8'
			},
			Player2: null,
			config3: {
				id: 'mse3',
				url: '/video/boyun.Flv'
			},
			Player3: null
		};
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
	text-align: center;
	color: #2c3e50;
}
</style>

```
