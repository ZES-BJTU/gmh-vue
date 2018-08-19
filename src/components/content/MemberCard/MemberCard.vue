<template>
  <div class="MemberCard">
    <el-form :inline="true" :model="memberCardSearch" ref="memberCardSearch" class="demo-form-inline search-form" @keyup.enter.native="searchMemberCard('search')">
      <el-form-item>
        <!-- 添加隐藏的input 阻止一个input时的默认回车事件 -->
        <el-input style="display:none;"></el-input>
        <el-input v-model.trim="memberCardSearch.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchMemberCard('search')" icon="el-icon-search" class="search-btn">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="operate-box">
      <router-link to="/member-card/new">
        <el-button type="primary" icon="el-icon-plus">新建</el-button>
      </router-link>
    </div>
    <el-table :data="tableData" size="mini" v-loading="loading" style="width: 100%">
      <el-table-column prop="id" label="ID" v-if="false"></el-table-column>
      <el-table-column prop="code" label="代码"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="typeDesc" label="类型"></el-table-column>
      <el-table-column prop="projectName" label="美容项目名称" :formatter="handleProject"></el-table-column>
      <el-table-column prop="times" label="次数" :formatter="handleTimes"></el-table-column>
      <el-table-column prop="amount" label="储值" :formatter="handleAmount"></el-table-column>
      <el-table-column prop="projectDiscount" label="项目折扣" :formatter="handleProjectDiscount"></el-table-column>
      <el-table-column prop="productDiscount" label="产品折扣" :formatter="handleProductDiscount"></el-table-column>
      <el-table-column prop="remark" label="备注" :formatter="handleRemark"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column label="操作"  width="250" fixed="right">
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
  name: "MemberCard",
  data() {
    return {
      memberCardSearch: {
        content: '',
        oldContent: '',//储存最近一次搜索的内容
        pageNum: '1',
        pageSize: '10',
        type: ''
      },
      loading: false
    };
  },
  computed: {
    pageNum: function(){
      return this.$store.state.memberCard.pageNum;
    },
    pageSize: function(){
      return this.$store.state.memberCard.pageSize;
    },
    totalCount: function(){
      return this.$store.state.memberCard.totalCount;
    },
    totalPages: function(){
      return this.$store.state.memberCard.totalPages;
    },
    tableData: function(){
      return this.$store.state.memberCard.memberCards;
    }
  },
  methods: {
    searchMemberCard(type) {
      this.loading = true;
      if(type === 'search'){
        this.memberCardSearch.oldContent = this.memberCardSearch.content;
      }
      this.memberCardSearch.type = type;
      this.$store.dispatch("loadMemberCard", this.memberCardSearch).then( res => {
        this.loading = false;
        this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    },
    chagePage(val){
      this.memberCardSearch.pageNum = val;
      this.searchMemberCard('page');
    },
    handleProject(row, column){
      if(!row.projectName || row.projectName === ''){
        return '暂无项目';
      }else{
        return row.projectName;
      }
    },
    handleTimes(row, column){
      if(!row.times || row.times === ''){
        return '暂无次数';
      }else{
        return row.times;
      }
    },
    handleAmount(row, column){
      if(!row.amount || row.amount === ''){
        return '暂无储值';
      }else{
        return '￥' + row.amount;
      }
    },
    handleProjectDiscount(row, column){
      return Number.parseInt(row.projectDiscount*100);
    },
    handleProductDiscount(row, column){
      return Number.parseInt(row.productDiscount*100);
    },
    handleRemark(row, column){
      if(!row.remark || row.remark === ''){
        return '暂无备注';
      }else{
        return row.remark;
      }
    },
    handleEdit(index, row){
      this.$router.push({ path: '/member-card/' + row.id});
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
            this.$store.dispatch("delMemberCard", row.id).then( res => {
              done();
              instance.confirmButtonLoading = false;
              this.searchMemberCard('search');
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
    this.searchMemberCard('search');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>