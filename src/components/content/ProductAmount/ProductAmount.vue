<template>
  <div class="ProductAmount">
    <el-form :inline="true" :model="productAmountSearch" ref="productAmountSearch" class="demo-form-inline search-form" @keyup.enter.native="searchProductAmount('search')">
      <el-form-item>
        <!-- 添加隐藏的input 阻止一个input时的默认回车事件 -->
        <el-input style="display:none;"></el-input>
        <el-input v-model.trim="productAmountSearch.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchProductAmount('search')" icon="el-icon-search" class="search-btn">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- <div class="operate-box">
      <router-link to="/stock/new">
        <el-button type="primary" icon="el-icon-plus">新建</el-button>
      </router-link>
    </div> -->
    <el-table :data="tableData" size="mini" v-loading="loading" style="width: 100%">
      <el-table-column prop="id" label="ID" v-if="false"></el-table-column>
      <el-table-column prop="productAmountId" label="SroductAmountId" v-if="false"></el-table-column>
      <el-table-column prop="code" label="编码"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="productTypeName" label="产品分类"></el-table-column>
      <el-table-column prop="amount" label="数量"></el-table-column>
      <el-table-column prop="unitName" label="计量单位"></el-table-column>
      <el-table-column prop="unitPrice" label="单价"></el-table-column>
      <el-table-column label="操作"  width="150" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="primary" size="mini"
            @click="handleSupply(scope.$index, scope.row)">补货</el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- <el-button
            size="mini"
            type="danger"
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
  name: "ProductAmount",
  data() {
    return {
      productAmountSearch: {
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
      return this.$store.state.productAmount.pageNum;
    },
    pageSize: function(){
      return this.$store.state.productAmount.pageSize;
    },
    totalCount: function(){
      return this.$store.state.productAmount.totalCount;
    },
    totalPages: function(){
      return this.$store.state.productAmount.totalPages;
    },
    tableData: function(){
      return this.$store.state.productAmount.productAmounts;
    }
  },
  methods: {
    searchProductAmount(type) {
      this.loading = true;
      if(type === 'search'){
        this.productAmountSearch.oldContent = this.productAmountSearch.content;
      }
      this.productAmountSearch.type = type;
      this.$store.dispatch("loadProductAmount", this.productAmountSearch).then( res => {
        this.loading = false;
        this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    },
    chagePage(val){
      this.productAmountSearch.pageNum = val;
      this.searchProductAmount('page');
    },
    handleSupply(index, row){
      this.$router.push({ path: '/product-amount-supply/' + row.productAmountId});
    },
    handleEdit(index, row){
      this.$router.push({ path: '/product-amount-detail/' + row.productAmountId});
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
    //         this.$store.dispatch("delStock", row.id).then( res => {
    //           done();
    //           instance.confirmButtonLoading = false;
    //           this.searchStock('search');
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
    this.searchProductAmount('search');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>