<template>
  <div class="basemsg-container">
    <el-row>
      <el-col>
        <el-button @click="$baseLoading(6, '全局加载层')">默认按钮</el-button>
        <el-button
          type="primary"
          @click="$baseColorfullLoading(1, '全局多彩加载层')"
        >
          主要按钮
        </el-button>
        <el-button type="success" @click="$baseMessage('全局Message')">
          成功按钮
        </el-button>
        <el-button type="info" @click="$baseAlert('全局Alert')">
          信息按钮
        </el-button>
        <el-button type="warning" @click="$baseConfirm('全局Confirm')">
          警告按钮
        </el-button>
        <el-button type="danger" @click="$baseNotify('全局Notification')">
          危险按钮
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'GlobalMsgTest',
};
</script>

<style lang="scss"></style>
