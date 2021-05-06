<template>
  <div class="index-container">
    <!-- index<svg-icon  class="logo" :icon-class="'user'" /> -->
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-alert
          v-if="noticeList[0]"
          :title="noticeList[0].title"
          :closable="noticeList[0].closable"
        >
          <a target="_blank" href="https://github.com/liejiayong">
            <img
              style="height: 100%; margin-right: 10px"
              src="https://img.shields.io/github/stars/liejiayong/-liejy-vue-count"
            />
            <img
              style="height: 100%; margin-right: 10px"
              src=" https://img.shields.io/badge/Visitors-20/month-blue?style=flat-square&logo=Visual Studio Code"
            />
            <img
              style="height: 100%; margin-right: 10px"
              src="https://img.shields.io/github/last-commit/liejiayong/-liejy-vue-count?style=flat-square&label=Last Commit&logo=vue.js"
            />
          </a>
        </el-alert>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card shadow="never">
          <template #header><span>访问量</span></template>
          <echarts :autoresize="true" :options="pv" theme="jtheme"></echarts>
          <div class="bottom">
            <span>日均访问量:</span>
            <jcount :start-val="99" :end-val="9999" :duration="6000"></jcount>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card shadow="never">
          <template #header><span>授权量</span></template>
          <echarts
            :autoresize="true"
            :options="authcount"
            theme="jtheme"
          ></echarts>
          <div class="bottom">
            <span>总授权数:</span>
            <jcount :start-val="99" :end-val="99999" :duration="6000"></jcount>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card shadow="never">
          <template #header><span>词云</span></template>
          <echarts
            :autoresize="true"
            :options="cloudWord"
            theme="jtheme"
            @zr:click="handleZrWord"
            @click="handleWord"
          ></echarts>
          <div class="bottom">
            <span>词云数量:</span>
            <jcount :start-val="99" :end-val="99999" :duration="6000"></jcount>
          </div>
        </el-card>
      </el-col>

      <el-col
        v-for="(item, index) in iconList"
        :key="index"
        :xs="12"
        :sm="6"
        :md="3"
        :lg="3"
        :xl="3"
      >
        <router-link :to="item.link" target="_blank">
          <el-card class="icon-panel" shadow="never">
            <jfas-icon
              :style="{ color: item.color }"
              :icon="['fas', item.icon]"
            ></jfas-icon>
            <p>{{ item.title }}</p>
          </el-card>
        </router-link>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="13" :xl="13">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>GDP分布图</span>
          </div>
          <echarts :autoresize="true" theme="jtheme" :options="zgdt" />
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="11" :xl="11">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>依赖信息</span>
            <div style="float: right">部署时间:{{ updateTime }}</div>
          </div>
          <div class="bottom-btn">
            <el-popover placement="top" width="250" trigger="hover">
              <p>这是一个基础模板</p>
              <el-image
                src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
              ></el-image>
              <a slot="reference" target="_blank">
                <el-button type="primary">建议</el-button>
              </a>
            </el-popover>
            <a @click="$baseEventBus.$emit('theme')">
              <el-button type="success">修改主题和布局</el-button>
            </a>
            <a target="_blank" href="https://github.com/liejiayong">
              <el-button type="fail">
                github下载源码点star（实时更新）
              </el-button>
            </a>
            <a target="_blank" href="https://gitee.com/liejiayong">
              <el-button type="warning">码云下载源码点star</el-button>
            </a>
          </div>
          <table class="table">
            <tr>
              <td>@vue/cli版本</td>
              <td>{{ devDependencies['@vue/cli-service'] }}</td>
              <td>vue版本</td>
              <td>{{ dependencies['vue'] }}</td>
            </tr>
            <tr>
              <td>vuex版本</td>
              <td>{{ dependencies['vuex'] }}</td>
              <td>vue-router版本</td>
              <td>{{ dependencies['vue-router'] }}</td>
            </tr>
            <tr>
              <td>element-ui版本</td>
              <td>{{ dependencies['element-ui'] }}</td>
              <td>axios版本</td>
              <td>{{ dependencies['axios'] }}</td>
            </tr>
            <tr>
              <td>eslint版本</td>
              <td>{{ devDependencies['eslint'] }}</td>
              <td>prettier版本</td>
              <td>{{ devDependencies['prettier'] }}</td>
            </tr>
            <tr>
              <td>sass版本</td>
              <td>{{ devDependencies['sass'] }}</td>
              <td>mockjs版本</td>
              <td>{{ dependencies['mockjs'] }}</td>
            </tr>
          </table>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>更新日志</span>
          </div>
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
              :color="activity.color"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card shadow="never">
          <div slot="header">
            <span>其他信息</span>
          </div>
          <div style="text-align: center">
            <h1 style="font-size: 30px">vue-admin-awesome</h1>
          </div>
          <div v-for="(item, index) in noticeList" :key="index">
            <el-alert
              v-if="index !== 0"
              :title="item.title"
              :type="item.type"
              :closable="item.closable"
            ></el-alert>
            <br />
          </div>
          <el-alert :closable="false" :title="userAgent" type="info"></el-alert>
          <br />
        </el-card>
        <el-card shadow="never">
          <div slot="header">
            <span>关于开发者</span>
          </div>
          <img
            src="https://github-readme-stats.vercel.app/api?username=chuzhixin"
            alt=""
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getList } from '@/api/changeLog';
import { getNoticeList } from '@/api/notice';
import echarts from '@/plugins/echarts';
import { dependencies, devDependencies } from '../../../package.json';
import dayjs from 'dayjs';

export default {
  name: 'Index',
  components: { echarts },
  data() {
    return {
      timer: 0,
      updateTime: dayjs().format('YYYY-M-D HH:mm:ss'),
      nodeEnv: process.env.NODE_ENV,
      dependencies: dependencies,
      devDependencies: devDependencies,
      noticeList: [],
      pv: {
        grid: {
          top: '4%',
          left: '2%',
          right: '4%',
          bottom: '0%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: '访问量',
            type: 'line',
            data: [],
            smooth: true,
            areaStyle: {},
          },
        ],
      },
      authcount: {
        grid: {
          top: '4%',
          left: '2%',
          right: '4%',
          bottom: '0%',
          containLabel: true,
        },
        legend: [['admin']],
        xAxis: [
          {
            type: 'category',
            /*boundaryGap: false,*/
            data: ['0时', '4时', '8时', '12时', '16时', '20时', '24时'],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: 'admin',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 20, 33, 39, 33, 22],
          },
        ],
      },
      cloudWord: {
        grid: {
          top: '4%',
          left: '2%',
          right: '4%',
          bottom: '0%',
        },
        series: [
          {
            type: 'wordCloud',
            gridSize: 15,
            sizeRange: [12, 40],
            rotationRange: [0, 0],
            width: '100%',
            height: '100%',
            textStyle: {
              normal: {
                color() {
                  const arr = [
                    '#1890FF',
                    '#36CBCB',
                    '#4ECB73',
                    '#FBD437',
                    '#F2637B',
                    '#975FE5',
                  ];
                  let index = Math.floor(Math.random() * arr.length);
                  return arr[index];
                },
              },
            },
            data: [
              {
                name: 'vue-admin-JyLie',
                value: 15000,
              },
              {
                name: 'element',
                value: 10081,
              },
              {
                name: 'JyLie-blog',
                value: 9386,
              },

              {
                name: 'vue',
                value: 6500,
              },
              {
                name: 'JyLie',
                value: 6000,
              },
              {
                name: 'good',
                value: 4500,
              },
              {
                name: 'success',
                value: 3800,
              },
              {
                name: 'never',
                value: 6000,
              },
              {
                name: 'boy',
                value: 2500,
              },
              {
                name: 'girl',
                value: 2300,
              },
              {
                name: 'github',
                value: 2000,
              },
              {
                name: 'hbuilder',
                value: 1900,
              },
              {
                name: 'dcloud',
                value: 1800,
              },
              {
                name: 'china',
                value: 1700,
              },
              {
                name: '809206619',
                value: 1600,
              },
              {
                name: '18820785794',
                value: 1500,
              },
              {
                name: 'young',
                value: 1200,
              },
              {
                name: 'old',
                value: 1100,
              },
              {
                name: 'vuex',
                value: 900,
              },
              {
                name: 'router',
                value: 800,
              },
              {
                name: 'money',
                value: 700,
              },
              {
                name: 'qingdao',
                value: 800,
              },
              {
                name: 'yantai',
                value: 9000,
              },
              {
                name: 'author is very cool',
                value: 9200,
              },
            ],
          },
        ],
      },
      //中国地图
      zgdt: {
        title: {
          text: '2099年全国GDP分布',
          subtext: '数据来自vue-admin-beautiful杜撰',
        },
        tooltip: {
          trigger: 'item',
        },
        dataRange: {
          orient: 'horizontal',
          min: 0,
          max: 55000,
          text: ['高', '低'],
          splitNumber: 0,
        },
        series: [
          {
            name: '2099年全国GDP分布',
            type: 'map',
            roam: false,
            zoom: 1.25,
            mapType: 'china',
            mapLocation: {
              x: 'center',
            },
            selectedMode: 'multiple',
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
            },
            data: [
              { name: '西藏', value: 605.83 },
              { name: '青海', value: 1670.44 },
              { name: '宁夏', value: 2102.21 },
              { name: '海南', value: 2522.66 },
              { name: '甘肃', value: 5020.37 },
              { name: '贵州', value: 5701.84 },
              { name: '新疆', value: 6610.05 },
              { name: '云南', value: 8893.12 },
              { name: '重庆', value: 10011.37 },
              { name: '吉林', value: 10568.83 },
              { name: '山西', value: 11237.55 },
              { name: '天津', value: 11307.28 },
              { name: '江西', value: 11702.82 },
              { name: '广西', value: 11720.87 },
              { name: '陕西', value: 12512.3 },
              { name: '黑龙江', value: 12582 },
              { name: '内蒙古', value: 14359.88 },
              { name: '安徽', value: 15300.65 },
              { name: '北京', value: 16251.93 },
              { name: '福建', value: 17560.18 },
              { name: '上海', value: 19195.69 },
              { name: '湖北', value: 19632.26 },
              { name: '湖南', value: 19669.56 },
              { name: '四川', value: 21026.68 },
              { name: '辽宁', value: 22226.7 },
              { name: '河北', value: 24515.76 },
              { name: '河南', value: 26931.03 },
              { name: '浙江', value: 32318.85 },
              { name: '山东', value: 45361.85, selected: true },
              { name: '江苏', value: 49110.27 },
              { name: '广东', value: 53210.28 },
            ],
          },
        ],
      },
      //卡片图标
      iconList: [
        {
          icon: 'video',
          title: '视频播放器',
          link: '/vab/player',
          color: '#ffc069',
        },
        {
          icon: 'table',
          title: '表格',
          link: '/vab/table/comprehensiveTable',
          color: '#5cdbd3',
        },
        {
          icon: 'laptop-code',
          title: '源码',
          link: 'https://github.com/liejiayong',
          color: '#b37feb',
        },
        {
          icon: 'book',
          title: '书籍',
          link: '',
          color: '#69c0ff',
        },
        {
          icon: 'bullhorn',
          title: '公告',
          link: '',
          color: '#ff85c0',
        },
        {
          icon: 'gift',
          title: '礼物',
          link: '',
          color: '#ffd666',
        },

        {
          icon: 'balance-scale-left',
          title: '公平的世界',
          link: '',
          color: '#ff9c6e',
        },
        {
          icon: 'coffee',
          title: '休息一下',
          link: '',
          color: '#95de64',
        },
      ],
      //更新日志
      reverse: true,
      activities: [],
      userAgent: navigator.userAgent,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  mounted() {
    this.initPV();
  },
  methods: {
    handleZrWord() {},
    handleWord() {},
    initPV() {
      let base = +new Date(2020, 1, 1);
      let oneDay = 24 * 3600 * 1000;
      let date = [];

      let data = [Math.random() * 1500];
      let now = new Date(base);

      const addData = (shift) => {
        now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
        date.push(now);
        data.push(this.$baseLodash.random(20000, 60000));

        if (shift) {
          date.shift();
          data.shift();
        }

        now = new Date(+new Date(now) + oneDay);
      };

      for (let i = 1; i < 6; i++) {
        addData();
      }
      addData(true);
      this.pv.xAxis[0].data = date;
      this.pv.series[0].data = data;
      this.timer = setInterval(() => {
        addData(true);
        this.pv.xAxis[0].data = date;
        this.pv.series[0].data = data;
      }, 6000);
    },
    async fetchData() {
      const { data } = await getList();
      data.map((item, index) => {
        if (index === data.length - 1) {
          item.color = '#0bbd87';
        }
      });
      this.activities = data;
      const res = await getNoticeList();
      this.noticeList = res.data;
      /* getRepos({
        token: "1061286824f978ea3cf98b7b8ea26fe27ba7cea1",
      }).then((res) => {
        const per_page = Math.ceil(res.data.stargazers_count / 100);
        alert(per_page);
        getStargazers({
          token: "1061286824f978ea3cf98b7b8ea26fe27ba7cea1",
          page: 1,
          per_page: res.per_page,
        }).then((res) => {
          alert(JSON.stringify(res));
        });
      }); */
    },
  },
};
</script>

<style lang="scss" scoped>
.index-container {
  padding: 0 !important;
  margin: 0 !important;
  background: #f5f7f8 !important;

  ::v-deep {
    .el-alert {
      padding: $base-padding;

      &--info.is-light {
        min-height: 82px;
        padding: $base-padding;
        margin-bottom: 15px;
        color: #909399;
        background-color: $base-color-white;
        border: 1px solid #ebeef5;
      }
    }

    .el-card__body {
      .echarts {
        width: 100%;
        height: 125px;
      }
    }
  }

  .card {
    min-height: 400px;

    ::v-deep {
      .el-card__body {
        .echarts {
          width: 100%;
          height: 305px;
        }
      }
    }
  }

  .bottom {
    padding-top: 20px;
    margin-top: 5px;
    color: #595959;
    text-align: left;
    border-top: 1px solid $base-border-color;
  }

  .table {
    width: 100%;
    color: #666;
    border-collapse: collapse;
    background-color: #fff;

    td {
      position: relative;
      min-height: 20px;
      padding: 9px 15px;
      font-size: 14px;
      line-height: 20px;
      border: 1px solid #e6e6e6;

      &:nth-child(odd) {
        width: 20%;
        text-align: right;
        background-color: #f7f7f7;
      }
    }
  }

  .icon-panel {
    height: 100px;
    text-align: center;
    cursor: pointer;

    svg {
      font-size: 40px;
    }

    p {
      margin-top: 10px;
    }
  }

  .bottom-btn {
    button {
      margin: 5px 10px 15px 0;
    }
  }
}
</style>
