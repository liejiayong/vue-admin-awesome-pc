<template>
  <div class="userManagement-container">
    <jy-form-query>
      <jy-form-query-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">添加</el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">批量删除</el-button>
      </jy-form-query-left-panel>
      <jy-form-query-right-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input v-model.trim="queryForm.userName" placeholder="请输入用户名" clearable />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">查询</el-button>
          </el-form-item>
        </el-form>
      </jy-form-query-right-panel>
    </jy-form-query>

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>

      <el-table-column label="权限">
        <template #default="{ row }">
          <el-tag v-for="(item, index) in row.permissions" :key="index">
            {{ item }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="datatime" label="修改时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.pageNo"
      :page-size="queryForm.pageSize"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <edit ref="edit" @change="fetchData"></edit>
  </div>
</template>

<script>
import { getList, doDelete } from '@/api/userManagement';
import Edit from './components/user-edit';

export default {
  name: 'StaffUserManagement',
  components: { Edit },
  data() {
    return {
      list: null,
      listLoading: true,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      selectRows: '',
      elementLoadingText: '正在加载...',
      queryForm: {
        pageNo: 1,
        pageSize: 10,
        userName: '',
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    setSelectRows(val) {
      this.selectRows = val;
    },
    handleEdit(row) {
      if (row.id) {
        this.$refs['edit'].showEdit(row);
      } else {
        this.$refs['edit'].showEdit();
      }
    },
    handleDelete(row) {
      if (row.id) {
        this.$baseConfirm('你确定要删除当前项吗', null, async () => {
          const { msg } = await doDelete({ ids: row.id });
          this.$baseMessage(msg, 'success');
          this.fetchData();
        });
      } else {
        if (this.selectRows.length > 0) {
          // const ids = this.selectRows.map((item) => item.id).join()
          this.$baseConfirm('你确定要删除选中项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id });
            this.$baseMessage(msg, 'success');
            this.fetchData();
          });
        } else {
          this.$baseMessage('未选中任何行', 'error');
          return false;
        }
      }
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.queryForm.pageNo = val;
      this.fetchData();
    },
    queryData() {
      this.queryForm.pageNo = 1;
      this.fetchData();
    },
    async fetchData() {
      this.listLoading = true;
      const { data, totalCount } = await getList(this.queryForm);
      this.list = data;
      this.total = totalCount;
      setTimeout(() => {
        this.listLoading = false;
      }, 300);
    },
  },
};
</script>
