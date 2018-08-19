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
      <el-table-column prop="remainingMoney" label="余额" :formatter="handleRemainMoney"></el-table-column>
      <el-table-column prop="isValid" label="是否有效"></el-table-column>
      <el-table-column prop="validDate" label="有效期至" :formatter="handleValidDate"></el-table-column>
      <el-table-column prop="isReturned" label="是否退卡" :formatter="handleIsReturned"></el-table-column>
      <el-table-column prop="returnedReason" label="退卡原因" :formatter="handleReturnedReason"></el-table-column>
      <el-table-column prop="returnedMoney" label="退卡金额" :formatter="handleReturnedMoney"></el-table-column>
      <el-table-column prop="projectDiscount" label="项目折扣" :formatter="handleProjectDiscount"></el-table-column>
      <el-table-column prop="productDiscount" label="产品折扣" :formatter="handleProductDiscount"></el-table-column>
      <el-table-column prop="isTurned" label="是否换卡" :formatter="handleIsTurned"></el-table-column>
      <el-table-column prop="turnedReason" label="换卡原因" :formatter="handleTurnedReason"></el-table-column>
      <el-table-column prop="turnedMoney" label="补/退金额" :formatter="handleTurnedMoney"></el-table-column>
      <el-table-column prop="uniqueIdentifier"  width="150" label="流水号"></el-table-column>
      <el-table-column label="操作"  width="530" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini"
            @click="handleCardContentDetail(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" v-if="scope.row.isValid === '是'"
            @click="handleCharge(scope.$index, scope.row)">充值</el-button>
          <el-button size="mini" v-if="scope.row.isValid === '是'"
            @click="handleChangeTime(scope.$index, scope.row)">改期</el-button>
          <el-button size="mini" v-if="scope.row.isValid === '是'"
            @click="handleBuy(scope.$index, scope.row)">换疗程</el-button>
          <el-button size="mini" v-if="scope.row.isValid === '是'"
            @click="handleTurn(scope.$index, scope.row)">转卡</el-button>
          <el-button size="mini" v-if="scope.row.isValid === '是'"
            @click="handleChangeStore(scope.$index, scope.row)">转店</el-button>
          <el-button size="mini" type="danger" v-if="scope.row.isValid === '是'"
            @click="handleReturn(scope.$index, scope.row)">退卡</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="total, prev, pager, next" 
      :page-size="pageSize" :total="totalCount"
       @current-change="chagePage"></el-pagination>
    <el-dialog title="会员卡内容详情" :visible.sync="cardContentVisible" :show-close="false"
    :close-on-click-modal="false" :close-on-press-escape="false">
      <el-table :data="cardContentDetail" size="mini" v-loading="loading" style="width: 100%">
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="name" label="内容"></el-table-column>
        <el-table-column prop="amount" label="个数"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onClose('')">确 定</el-button>
      </span>
    </el-dialog>
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
      loading: false,
      cardContentDetail: [],
      cardContentVisible: false
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
    handleValidDate(row,column){
      return this.toDatetimeDay(row.validDate);
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
    handleReturnedMoney(row, column){
      if(!row.returnedMoney || row.returnedMoney === ''){
        return '暂无';
      }else{
        return '￥' + row.returnedMoney;
      }
    },
    handleIsTurned(row, column){
      if(!row.isTurned || row.isTurned === ''){
        return '暂无';
      }else{
        return row.isTurned;
      }
    },
    handleTurnedReason(row, column){
      if(!row.turnedReason || row.turnedReason === ''){
        return '暂无';
      }else{
        return row.turnedReason;
      }
    },
    handleTurnedMoney(row, column){
      if(!row.turnedMoney || row.turnedMoney === ''){
        return '暂无';
      }else{
        return '￥' + row.turnedMoney;
      }
    },
    handleProjectDiscount(row, column){
      return Number.parseInt(row.projectDiscount*100);
    },
    handleProductDiscount(row, column){
      return Number.parseInt(row.productDiscount*100);
    },
    handleCharge(index, row){
      this.$router.push({ path: '/customer-card-charge/' + row.id});
    },
    handleChangeTime(index, row){
      this.$router.push({ path: '/customer-card-change-time/' + row.id});
    },
    handleBuy(index, row){
      this.$router.push({ path: '/customer-card-buy/' + row.id});
    },
    handleTurn(index, row){
      this.$router.push({ path: '/customer-card-turn/' + row.id});
    },
    handleCardContentDetail(index, row){// 显示客户会员卡详情
      let card = this.$store.getters.getCustomerCardById(row.id);
      for(let content of card.customerMemberCardContent){
        if(content.relatedName){
          this.cardContentDetail.push({
            'type': '项目',
            'name': content.relatedName,
            'amount': content.amount,
          })
        }else{
          this.cardContentDetail.push({
            'type': '代金券',
            'name': content.content,
            'amount': content.amount,
          })
        }
      }
      this.cardContentVisible = true;
    },
    handleChangeStore(index, row){
      this.$router.push({ path: '/customer-card-change-store/' + row.id});
    },
    handleReturn(index, row){
      this.$router.push({ path: '/customer-card-return/' + row.id});
    },
    onClose(formName){
      this.cardContentVisible = false;
      this.cardContentDetail = [];
    }
  },
  beforeMount: function () {
    this.searchCustomerCard('search');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>