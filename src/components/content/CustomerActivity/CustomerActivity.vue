<template>
  <div class="CustomerActivity">
    <el-form :inline="true" :model="customerActivitySearch" ref="customerActivitySearch" class="demo-form-inline search-form" @keyup.enter.native="searchCustomerActivity('search')">
      <el-form-item>
        <!-- 添加隐藏的input 阻止一个input时的默认回车事件 -->
        <el-input style="display:none;"></el-input>
        <el-input v-model.trim="customerActivitySearch.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchCustomerActivity('search')" icon="el-icon-search" class="search-btn">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" size="mini" v-loading="loading" style="width: 100%">
      <el-table-column prop="id" label="ID" v-if="false"></el-table-column>
      <el-table-column prop="customerName" label="姓名"></el-table-column>
      <el-table-column prop="activityName" label="活动名称"></el-table-column>
      <el-table-column label="操作"  width="150" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini"
            @click="handleActivityContentDetail(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="total, prev, pager, next" 
      :page-size="pageSize" :total="totalCount"
       @current-change="chagePage"></el-pagination>
    <el-dialog title="活动内容详情" :visible.sync="activityContentVisible" :show-close="false"
    :close-on-click-modal="false" :close-on-press-escape="false">
      <el-table :data="activityContentDetail" size="mini" v-loading="loading" style="width: 100%">
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="name" label="内容"></el-table-column>
        <el-table-column prop="number" label="个数"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onClose('')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CustomerActivity",
  data() {
    return {
      customerActivitySearch: {
        content: '',
        oldContent: '',//储存最近一次搜索的内容
        pageNum: '1',
        pageSize: '10',
        type: ''
      },
      loading: false,
      activityContentDetail: [],
      activityContentVisible: false
    };
  },
  computed: {
    pageNum: function(){
      return this.$store.state.customerActivity.pageNum;
    },
    pageSize: function(){
      return this.$store.state.customerActivity.pageSize;
    },
    totalCount: function(){
      return this.$store.state.customerActivity.totalCount;
    },
    totalPages: function(){
      return this.$store.state.customerActivity.totalPages;
    },
    tableData: function(){
      return this.$store.state.customerActivity.customerActivities;
    }
  },
  methods: {
    searchCustomerActivity(type) {
      this.loading = true;
      if(type === 'search'){
        this.customerActivitySearch.oldContent = this.customerActivitySearch.content;
      }
      this.customerActivitySearch.type = type;
      this.$store.dispatch("loadCustomerActivity", this.customerActivitySearch).then( res => {
        this.loading = false;
        this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    },
    chagePage(val){
      this.customerActivitySearch.pageNum = val;
      this.searchCustomerActivity('page');
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
    handleCharge(index, row){
      this.$router.push({ path: '/customer-card-charge/' + row.id});
    },
    handleBuy(index, row){
      this.$router.push({ path: '/customer-card-buy/' + row.id});
    },
    handleTurn(index, row){
      this.$router.push({ path: '/customer-card-turn/' + row.id});
    },
    handleActivityContentDetail(index, row){// 显示客户会员卡详情
      let customerActivity = this.$store.getters.getCustomerActivityById(row.id);
      for( let customerActivityContent of customerActivity.customerActivityContents){
        let type, name;
        if(customerActivityContent.type === '项目'){
          name = customerActivityContent.relatedName;
        }else if(customerActivityContent.type === '会员卡'){
          name = customerActivityContent.relatedName;
        }else if(customerActivityContent.type === '产品'){
          name = customerActivityContent.relatedName;
        }else{
          type= 4;
          name = customerActivityContent.content;
        }
        this.activityContentDetail.push({
          'type': customerActivityContent.type,
          'name': name,
          'number': customerActivityContent.number,
          'remark': (customerActivityContent.remark === '' || !customerActivityContent.remark) ? '暂无备注' : customerActivityContent.remark
        })
      }
      this.activityContentVisible = true;
    },
    onClose(formName){
      this.activityContentVisible = false;
      this.activityContentDetail = [];
    }
  },
  beforeMount: function () {
    this.searchCustomerActivity('search');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>