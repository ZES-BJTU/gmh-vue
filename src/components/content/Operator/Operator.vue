<template>
  <div class="Operator">
    <el-form :inline="true" :model="operatorSearch" ref="operatorSearch" class="demo-form-inline search-form" @keyup.enter.native="searchOperator('search')">
      <el-form-item>
        <!-- 添加隐藏的input 阻止一个input时的默认回车事件 -->
        <el-input style="display:none;"></el-input>
        <el-input v-model.trim="operatorSearch.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchOperator('search')" icon="el-icon-search" class="search-btn">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="operate-box">
      <router-link to="/operator/new">
        <el-button type="primary" icon="el-icon-plus">新建</el-button>
      </router-link>
    </div>
    <el-table :data="tableData" size="mini" v-loading="loading" style="width: 100%">
      <el-table-column prop="id" label="ID" v-if="false"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="手机"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column prop="remark" label="备注" :formatter="handleRemark"></el-table-column>
      <el-table-column label="操作" width="150px;" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="total, prev, pager, next" 
      :page-size="pageSize" :total="totalCount"
       @current-change="chagePage"></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Operator",
  data() {
    return {
      operatorSearch: {
        content: "",
        oldContent: "",//储存最近一次搜索的内容
        pageNum: '1',
        pageSize: '10',
        role: '4',//1.管理员 2.店长 3.前台 4.操作员
        type: ""
      },
      loading: false
    };
  },
  computed: {
    pageNum: function(){
      return this.$store.state.user.pageNum;
    },
    pageSize: function(){
      return this.$store.state.user.pageSize;
    },
    totalCount: function(){
      return this.$store.state.user.totalCount;
    },
    totalPages: function(){
      return this.$store.state.user.totalPages;
    },
    tableData: function(){
      return this.$store.state.user.users;
    }
  },
  methods: {
    searchOperator(type) {
      this.loading = true;
      if(type === 'search'){
        this.operatorSearch.oldContent = this.operatorSearch.content;
      }
      this.operatorSearch.type = type;
      this.$store.dispatch("loadUser", this.operatorSearch).then( res => {
        this.loading = false;
        this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    },
    chagePage(val){
      this.operatorSearch.pageNum = val;
      this.searchOperator('page');
    },
    handleRemark(row, column){
      if(!row.remark || row.remark === ''){
        return '暂无备注';
      }else{
        return row.remark;
      }
    },
    handleEdit(index, row){
      this.$router.push({ path: '/operator/' + row.id});
    },
    handleDelete(index, row){
      const h = this.$createElement;
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '此操作将会永久删除该记录！ ')
        ]),
        showCancelButton: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '删除中...';
            this.$store.dispatch("delUser", row.id).then( res => {
              done();
              instance.confirmButtonLoading = false;
              this.searchOperator('search');
            }).catch( err => {
              done();
              instance.confirmButtonLoading = false;
              console.log(err);
            });
          } else {
            done();
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        });
      });
    },
  },
  beforeMount: function () {
    this.searchOperator('search');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>