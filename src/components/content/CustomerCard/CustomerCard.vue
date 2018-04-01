<template>
  <div class="CustomerCard">
    <el-form :inline="true" :model="customerCardSearch" ref="customerCardSearch" class="demo-form-inline search-form" @keyup.enter.native="searchCustomerCard('search')">
      <el-form-item>
        <!-- 添加隐藏的input 阻止一个input时的默认回车事件 -->
        <el-input style="display:none;"></el-input>
        <el-input v-model.trim="customerCardSearch.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchCustomerCard('search')" icon="el-icon-search" class="search-btn">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" size="mini" v-loading="loading" style="width: 100%">
      <el-table-column prop="id" label="ID" v-if="false"></el-table-column>
      <el-table-column prop="customerName" label="姓名"></el-table-column>
      <el-table-column prop="memberCardName" label="卡名"></el-table-column>
      <el-table-column prop="remainingMoney" label="余额"></el-table-column>
      <el-table-column prop="remainingTimes" label="剩余次数"></el-table-column>
      <el-table-column prop="isValid" label="是否有效"></el-table-column>
      <el-table-column prop="isTurned" label="是否换卡"></el-table-column>
      <el-table-column prop="turnedReason" label="换卡原因"></el-table-column>
      <el-table-column prop="turnedMoney" label="补/退金额"></el-table-column>
      <el-table-column prop="uniqueIdentifier" label="流水号"></el-table-column>
      <el-table-column label="操作"  width="220" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini"
            @click="handleTurn(scope.$index, scope.row)">转卡</el-button>
          <el-button size="mini"
            @click="handleChangeStore(scope.$index, scope.row)">转店</el-button>
          <el-button size="mini" type="danger" v-if="scope.row.isValid === '是'"
            @click="handleReturn(scope.$index, scope.row)">退卡</el-button>
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
  name: "CustomerCard",
  data() {
    return {
      customerCardSearch: {
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
      return this.$store.state.customerCard.pageNum;
    },
    pageSize: function(){
      return this.$store.state.customerCard.pageSize;
    },
    totalCount: function(){
      return this.$store.state.customerCard.totalCount;
    },
    totalPages: function(){
      return this.$store.state.customerCard.totalPages;
    },
    tableData: function(){
      return this.$store.state.customerCard.customerCards;
    }
  },
  methods: {
    searchCustomerCard(type) {
      this.loading = true;
      if(type === 'search'){
        this.customerCardSearch.oldContent = this.customerCardSearch.content;
      }
      this.customerCardSearch.type = type;
      this.$store.dispatch("loadCustomerCard", this.customerCardSearch).then( res => {
        this.loading = false;
        this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    },
    chagePage(val){
      this.customerCardSearch.pageNum = val;
      this.searchCustomerCard('page');
    },
    // handleRemainMoney(row, column){
    //   if(!row.project || row.project === ''){
    //     return '暂无项目';
    //   }else{
    //     return '￥' + row.project;
    //   }
    // },
    // handleTimes(row, column){
    //   if(!row.remainingMoney || row.remainingMoney === ''){
    //     return '暂无次数';
    //   }else{
    //     return row.remainingMoney;
    //   }
    // },
    // handleAmount(row, column){
    //   if(!row.amount || row.amount === ''){
    //     return '暂无储值';
    //   }else{
    //     return '￥' + row.amount;
    //   }
    // },
    handleTurn(index, row){
      this.$router.push({ path: '/customer-card-turn/' + row.id});
    },
    handleChangeStore(index, row){
      this.$router.push({ path: '/customer-card-change-store/' + row.id});
    },
    handleReturn(index, row){
      this.$router.push({ path: '/customer-card-return/' + row.id});
    },
  },
  beforeMount: function () {
    this.searchCustomerCard('search');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>