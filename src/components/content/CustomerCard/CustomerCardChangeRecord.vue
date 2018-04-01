<template>
  <div class="CustomerCardChangeRecord">
    <el-form :inline="true" :model="customerCardChangeRecordSearch" ref="customerCardChangeRecordSearch" 
      class="demo-form-inline search-form" @keyup.enter.native="searchCustomerCardChangeRecord('search')">
      <el-form-item>
        <!-- 添加隐藏的input 阻止一个input时的默认回车事件 -->
        <el-input style="display:none;"></el-input>
        <el-input v-model.trim="customerCardChangeRecordSearch.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchCustomerCardChangeRecord('search')" icon="el-icon-search" class="search-btn">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" size="mini" v-loading="loading" style="width: 100%">
      <el-table-column prop="customerName" label="姓名"></el-table-column>
      <el-table-column prop="memberCardName" label="卡名"></el-table-column>
      <el-table-column prop="remainingMoney" label="余额" :formatter="handleRemainMoney"></el-table-column>
      <el-table-column prop="remainingTimes" label="剩余次数" :formatter="handleRemainTimes"></el-table-column>
      <el-table-column prop="isValid" label="是否有效"></el-table-column>
      <el-table-column prop="isReturned" label="是否退卡" :formatter="handleIsReturned"></el-table-column>
      <el-table-column prop="returnedReason" label="退卡原因" :formatter="handleReturnedReason"></el-table-column>
      <el-table-column prop="returnedMoney" label="退卡金额" :formatter="handlReturnedMoney"></el-table-column>
      <el-table-column prop="projectDiscount" label="项目折扣" :formatter="handlProjectDiscount"></el-table-column>
      <el-table-column prop="productDiscount" label="产品折扣" :formatter="handlProductDiscount"></el-table-column>
      <el-table-column prop="isTurned" label="是否换卡" :formatter="handlIsTurned"></el-table-column>
      <el-table-column prop="turnedReason" label="换卡原因" :formatter="handlTurnedReason"></el-table-column>
      <el-table-column prop="turnedMoney" label="补/退金额" :formatter="handlTurnedMoney"></el-table-column>
      <el-table-column prop="uniqueIdentifier" label="流水号"></el-table-column>
    </el-table>
    <el-pagination layout="total, prev, pager, next" 
      :page-size="pageSize" :total="totalCount"
       @current-change="chagePage"></el-pagination>
  </div>
</template>

<script>
export default {
  name: "CustomerCardChangeRecord",
  data() {
    return {
      customerCardChangeRecordSearch: {
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
      return this.$store.state.customerCard.customerCardChanges;
    }
  },
  methods: {
    searchCustomerCardChangeRecord(type) {
      this.loading = true;
      if(type === 'search'){
        this.customerCardChangeRecordSearch.oldContent = this.customerCardChangeRecordSearch.content;
      }
      this.customerCardChangeRecordSearch.type = type;
      this.$store.dispatch("loadCustomerCardChangeList", this.customerCardChangeRecordSearch).then( res => {
        this.loading = false;
        this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    },
    chagePage(val){
      this.customerCardSearch.pageNum = val;
      this.searchCustomerCardChangeRecord('page');
    },
    handleRemainMoney(row, column){
      if(!row.remainingMoney || row.remainingMoney === ''){
        return '暂无';
      }else{
        return '￥' + row.remainingMoney;
      }
    },
    handleRemainTimes(row, column){
      if(!row.remainingTimes || row.remainingTimes === ''){
        return '暂无';
      }else{
        return row.remainingTimes + '次';
      }
    },
    handleIsReturned(row, column){
      if(!row.isReturned || row.isReturned === ''){
        return '否';
      }else{
        return row.isReturned;
      }
    },
    handleReturnedReason(row, column){
      if(!row.returnedReason || row.returnedReason === ''){
        return '暂无';
      }else{
        return row.returnedReason;
      }
    },
    handlReturnedMoney(row, column){
      if(!row.returnedMoney || row.returnedMoney === ''){
        return '暂无';
      }else{
        return '￥' + row.returnedMoney;
      }
    },
    handlProjectDiscount(row, column){
      if(!row.projectDiscount || row.projectDiscount === ''){
        return '暂无';
      }else{
        return row.projectDiscount;
      }
    },
    handlProductDiscount(row, column){
      if(!row.productDiscount || row.productDiscount === ''){
        return '暂无';
      }else{
        return row.productDiscount;
      }
    },
    handlIsTurned(row, column){
      if(!row.isTurned || row.isTurned === ''){
        return '暂无';
      }else{
        return row.isTurned;
      }
    },
    handlTurnedReason(row, column){
      if(!row.turnedReason || row.turnedReason === ''){
        return '暂无';
      }else{
        return row.turnedReason;
      }
    },
    handlTurnedMoney(row, column){
      if(!row.turnedMoney || row.turnedMoney === ''){
        return '暂无';
      }else{
        return '￥' + row.turnedMoney;
      }
    },
  },
  beforeMount: function () {
    this.searchCustomerCardChangeRecord('search');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>