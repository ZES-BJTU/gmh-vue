<template>
  <div class="Activity">
    <el-form :inline="true" :model="activitySearch" ref="activitySearch" class="demo-form-inline search-form" 
      @keyup.enter.native="searchActivity('search')">
      <el-form-item>
        <!-- 添加隐藏的input 阻止一个input时的默认回车事件 -->
        <el-input style="display:none;"></el-input>
        <el-input v-model.trim="activitySearch.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchActivity('search')" icon="el-icon-search" class="search-btn">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="operate-box">
      <router-link to="/activity/new">
        <el-button type="primary" icon="el-icon-plus">新建</el-button>
      </router-link>
    </div>
    <el-table :data="tableData" size="mini" v-loading="loading" style="width: 100%">
      <el-table-column prop="id" label="ID" v-if="false"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="code" label="代码"></el-table-column>
      <el-table-column prop="projectTypeName" label="美容项目分类"></el-table-column>
      <el-table-column prop="unitPrice" label="单价"></el-table-column>
      <el-table-column prop="integral" label="积分"></el-table-column>
      <el-table-column prop="internIntegral" label="实习生积分"></el-table-column>
      <el-table-column prop="remark" label="备注" :formatter="handleRemark"></el-table-column>
      <el-table-column prop="projectStockVos" label="项目消耗品">
        <template slot-scope="scope">
            <div v-for="vo in scope.row.projectStockVos" :key="vo.stockId">
              {{vo.stockName + ' : ' + vo.stockConsumptionAmount + vo.unitName}}
            </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px;" fixed="right">
        <template slot-scope="scope">
          <el-button  size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- <el-button size="mini" type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
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
  name: "Activity",
  data() {
    return {
      activitySearch: {
        content: "",
        oldContent: "",//储存最近一次搜索的内容
        pageNum: 1,
        pageSize: 10,
        type: ""
      },
      loading: false
    };
  },
  computed: {
    pageNum: function(){
      return this.$store.state.activity.pageNum;
    },
    pageSize: function(){
      return this.$store.state.activity.pageSize;
    },
    totalCount: function(){
      return this.$store.state.activity.totalCount;
    },
    totalPages: function(){
      return this.$store.state.activity.totalPages;
    },
    tableData: function(){
      return this.$store.state.activity.activities;
    }
  },
  methods: {
    searchActivity(type) {
      this.loading = true;
      if(type === 'search'){
        this.activitySearch.oldContent = this.activitySearch.content;
      }
      this.activitySearch.type = type;
      this.$store.dispatch("loadActivity", this.activitySearch).then( res => {
        this.loading = false;
        this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    },
    chagePage(val){
      this.activitySearch.pageNum = val;
      this.searchActivity('page');
    },
    handleRemark(row, column){
      if(!row.remark || row.remark === ''){
        return '暂无备注';
      }else{
        return row.remark;
      }
    },
    handleProjectStocks(row, column){
      if(!row.projectStockVos || row.projectStockVos === ''){
        return '暂无消耗品';
      }else{
        let ps = '';
        for( let vo of row.projectStockVos){
          ps += vo.stockName + ':' + vo.stockConsumptionAmount + vo.unitName + '\<br /\>'
        }
        return ps;
      }
    },
    handleEdit(index, row){
      this.$router.push({ path: '/project/' + row.id});
    },
    // handleDelete(index, row){
    //   const h = this.$createElement;
    //   this.$msgbox({
    //     title: '提示',
    //     message: h('p', null, [
    //       h('span', null, '此操作将会永久删除该记录！ ')
    //     ]),
    //     showCancelButton: true,
    //     confirmButtonText: '删除',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //     beforeClose: (action, instance, done) => {
    //       if (action === 'confirm') {
    //         instance.confirmButtonLoading = true;
    //         instance.confirmButtonText = '删除中...';
    //         this.$store.dispatch("delProject", row.id).then( res => {
    //           done();
    //           instance.confirmButtonLoading = false;
    //           this.searchActivity('search');
    //         }).catch( err => {
    //           done();
    //           instance.confirmButtonLoading = false;
    //           console.log(err);
    //         });
    //       } else {
    //         done();
    //       }
    //     }
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '取消删除'
    //     });
    //   });
    // },
  },
  beforeMount: function () {
    this.searchActivity('search');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>