<template>
  <el-dropdown @command="handleCommand">
    <span class="avatar-dropdown">
      <!--<el-avatar class="user-avatar" :src="avatar"></el-avatar>-->
      <img class="user-avatar" :src="avatar" alt="" />
      <div class="user-name hidden-md-and-down">
        {{ userName }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
    </span>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="userCenter">
        <jfas-icon :icon="['fas', 'user']"></jfas-icon>
        个人中心
      </el-dropdown-item>
      <el-dropdown-item command="logout" divided>
        <jfas-icon :icon="['fas', 'sign-out-alt']"></jfas-icon>
        退出登录
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Avatar',
  computed: {
    ...mapGetters({
      avatar: 'user/avatar',
      userName: 'user/userName',
    }),
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'logout':
          this.logout();
          break;
        case 'userCenter':
          this.navUserCenter();
          break;
      }
    },
    navUserCenter() {
      this.$router.push('/user/index');
    },
    logout() {
      this.$baseConfirm('您确定要退出' + this.$baseTitle + '吗?', null, async () => {
        await this.$store.dispatch('user/logout');
        const { recordRoute } = this.$confOpts;
        if (recordRoute) {
          const fullPath = this.$route.fullPath;
          this.$router.push(`/login?redirect=${fullPath}`);
        } else {
          this.$router.push('/login');
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar-dropdown {
  padding: 0;
  height: 50px;
  display: flex;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;

  .user-avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .user-name {
    margin-left: 5px;
    position: relative;
    margin-left: 5px;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>
