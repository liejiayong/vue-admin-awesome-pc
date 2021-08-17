<template>
  <div id="table">
    <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%">
      <el-table-column align="center" prop="id" label="编号" width="150"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width="200"></el-table-column>
      <el-table-column align="center" prop="email" label="邮箱"></el-table-column>
      <el-table-column align="center" prop="phone" label="电话"></el-table-column>
      <el-table-column align="center" prop="date" label="操作" width="220">
        <el-button-group>
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
        </el-button-group>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ['parentData', 'selectTableData'],
  watch: {
    // 监听父组件的变化
    parentData: function () {
      this.tableData.push(this.parentData[this.parentData.length - 1]);
    },
    selectTableData: function () {
      console.log('查询--', this.selectTableData);
    },
  },
  mounted() {
    this.$emit('get-children-status', this.parentData); // 将改变通知父组件(保证父子组件数据一致)
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: '王小虎',
          email: '3492989525@qq.com',
          phone: '12345678901',
        },
        {
          id: 2,
          name: '王小虎',
          email: '3492989525@qq.com',
          phone: '12345678901',
        },
        {
          id: 3,
          name: '王小虎',
          email: '3492989525@qq.com',
          phone: '12345678901',
        },
        {
          id: 4,
          name: '王小虎',
          email: '3492989525@qq.com',
          phone: '12345678901',
        },
        {
          id: 5,
          name: '王小虎',
          email: '3492989525@qq.com',
          phone: '12345678901',
        },
        {
          id: 6,
          name: '王小虎',
          email: '3492989525@qq.com',
          phone: '12345678901',
        },
      ],
      // 分页
      currentPage: 1, // 当前页
      pageSize: 5, // 每页显示多少条
    };
  },
  methods: {
    // 分页方法
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val;
    },
  },
};
</script>

<style></style>
