<template>
  <div id="table">
    <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%">
      <el-table-column align="center" prop="id" label="编号" width="50"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width="80"></el-table-column>
      <el-table-column align="center" prop="company" label="公司" width="80"></el-table-column>
      <el-table-column align="center" prop="country" label="国家"></el-table-column>
      <el-table-column align="center" prop="email" label="邮箱" width="170"></el-table-column>
      <el-table-column align="center" prop="phone" label="电话" width="150"></el-table-column>
      <el-table-column align="center" prop="skype" label="skype" width="150"></el-table-column>
      <el-table-column align="center" prop="whatsapp" label="whatsapp" width="140"></el-table-column>
      <el-table-column align="center" prop="follow" width="70" label="跟单人"></el-table-column>
      <el-table-column align="center" prop="date" label="最后跟单日期" width="190"></el-table-column>
      <el-table-column align="center" label="操作" width="260">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="success" @click="handleChangeRecord(scope.$index, scope.row)">
            查看跟单记录
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, tableData)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        :total="tableData.length"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ['parentData'],
  watch: {
    // 监听父组件的变化
    parentData: function () {
      this.tableData.push(this.parentData[this.parentData.length - 1]);
    },
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: '王小虎1',
          company: '橘子科技',
          country: 'China',
          email: '3492989525@qq.com',
          phone: '17883736618',
          skype: 'lorem@gmail.com',
          whatsapp: '3492989525',
          date: '2021年02月13日 19:58:53',
          follow: '张三',
        },
        {
          id: 2,
          name: '王小虎2',
          company: '橘子科技',
          country: 'China',
          email: '3492989525@qq.com',
          phone: '17883736618',
          skype: 'lorem@gmail.com',
          whatsapp: '3492989525',
          date: '2021年02月13日 19:58:53',
          follow: '张三',
        },
        {
          id: 3,
          name: '王小虎3',
          company: '橘子科技',
          country: 'China',
          email: '3492989525@qq.com',
          phone: '17883736618',
          skype: 'lorem@gmail.com',
          whatsapp: '3492989525',
          date: '2021年02月13日 19:58:53',
          follow: '张三',
        },
        {
          id: 4,
          name: '王小虎4',
          company: '橘子科技',
          country: 'China',
          email: '3492989525@qq.com',
          phone: '17883736618',
          skype: 'lorem@gmail.com',
          whatsapp: '3492989525',
          date: '2021年02月13日 19:58:53',
          follow: '张三',
        },
        {
          id: 5,
          name: '王小虎5',
          company: '橘子科技',
          country: 'China',
          email: '3492989525@qq.com',
          phone: '17883736618',
          skype: 'lorem@gmail.com',
          whatsapp: '3492989525',
          date: '2021年02月13日 19:58:53',
          follow: '张三',
        },
        {
          id: 6,
          name: '王小虎6',
          company: '橘子科技',
          country: 'China',
          email: '3492989525@qq.com',
          phone: '17883736618',
          skype: 'lorem@gmail.com',
          whatsapp: '3492989525',
          date: '2021年02月13日 19:58:53',
          follow: '张三',
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
    // 获取当前行的数据，打开编辑
    handleEdit(index, row) {
      // console.log(index, row)
    },
    // 获取当前行的数据，跳转客户跟单传值
    handleChangeRecord(index, row) {
      console.log(index, row);
      this.$router.push({ path: '/record', query: { user: row } });
    },
    // 删除当前行
    handleDelete(index, row) {
      row.splice(index, 1);
    },
  },
};
</script>

<style></style>
