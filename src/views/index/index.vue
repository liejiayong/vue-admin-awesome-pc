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
    </el-row>
  </div>
</template>

<script>
import { getList } from '@/api/changeLog';
import { getNoticeList } from '@/api/notice';
export default {
  data() {
    return {
      noticeList: [],
    };
  },
  beforeMount() {
    this.fetchData();
  },
  mounted() {},
  methods: {
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

<style></style>
