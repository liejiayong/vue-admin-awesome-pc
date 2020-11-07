<template>
  <div class="index-container">
    <!-- index<svg-icon  class="logo" :icon-class="'user'" />
		<jcount :end-val="9999999"></jcount> -->
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-alert
          v-if="noticeList[0]"
          :title="noticeList[0].title"
          :closable="noticeList[0].closable"
        >
          <a
            target="_blank"
            href="https://github.com/chuzhixin/vue-admin-beautiful"
          >
            <img
              style="height: 100%; margin-right: 10px"
              src="https://img.shields.io/github/stars/chuzhixin/vue-admin-beautiful?style=flat-square&label=Stars&logo=github"
            />
            <img
              style="height: 100%; margin-right: 10px"
              src=" https://img.shields.io/badge/Visitors-79.3k/month-blue?style=flat-square&logo=Visual Studio Code"
            />
            <img
              style="height: 100%; margin-right: 10px"
              src="https://img.shields.io/github/last-commit/chuzhixin/vue-admin-beautiful?style=flat-square&label=Last Commit&logo=vue.js"
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
            <jcount :start-val="99" :end-val="9999" :duration="3000"></jcount>
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
            <jcount :start-val="99" :end-val="99999" :duration="3000"></jcount>
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
            <jcount :start-val="99" :end-val="99999" :duration="3000"></jcount>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getList } from '@/api/changeLog';
import { getNoticeList } from '@/api/notice';
import echarts from '@/plugins/echarts';

export default {
  name: 'Index',
  components: { echarts },
  data() {
    return {
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
                value: 3000,
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
      }, 3000);
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
