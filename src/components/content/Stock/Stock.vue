<template>
  <div class="Stock">
    <el-form :inline="true" :model="stockSearch" ref="stockSearch" class="demo-form-inline search-form" @keyup.enter.native="searchStock('search')">
      <el-form-item>
        <!-- 添加隐藏的input 阻止一个input时的默认回车事件 -->
        <el-input style="display:none;"></el-input>
        <el-input v-model.trim="stockSearch.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchStock('search')" icon="el-icon-search" class="search-btn">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="operate-box">
      <router-link to="/stock/new">
        <el-button type="primary" icon="el-icon-plus">新建</el-button>
      </router-link>
    </div>
    <el-table :data="tableData" size="mini" v-loading="loading" style="width: 100%">
      <el-table-column prop="id" label="ID" v-if="false"></el-table-column>
      <el-table-column prop="code" label="代码"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="stockTypeName" label="库存分类"></el-table-column>
      <el-table-column prop="unitName" label="计量单位"></el-table-column>
      <el-table-column label="操作"  width="250" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleNew(scope.$index, scope.row)">首次进货</el-button>
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
  name: "Stock",
  data() {
    return {
      stockSearch: {
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
      return this.$store.state.stock.pageNum;
    },
    pageSize: function(){
      return this.$store.state.stock.pageSize;
    },
    totalCount: function(){
      return this.$store.state.stock.totalCount;
    },
    totalPages: function(){
      return this.$store.state.stock.totalPages;
    },
    tableData: function(){
      return this.$store.state.stock.stocks;
    }
  },
  methods: {
    searchStock(type) {
      this.loading = true;
      if(type === 'search'){
        this.stockSearch.oldContent = this.stockSearch.content;
      }
      this.stockSearch.type = type;
      this.$store.dispatch("loadStock", this.stockSearch).then( res => {
        this.loading = false;
        this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    },
    chagePage(val){
      this.stockSearch.pageNum = val;
      this.searchStock('page');
    },
    handleNew(index, row){
      this.$router.push({ path: '/stock/new-amount/' + row.id});
    },
    handleEdit(index, row){
      this.$router.push({ path: '/stock/' + row.id});
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
            this.$store.dispatch("delStock", row.id).then( res => {
              done();
              instance.confirmButtonLoading = false;
              this.searchStock('search');
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
    this.searchStock('search');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>