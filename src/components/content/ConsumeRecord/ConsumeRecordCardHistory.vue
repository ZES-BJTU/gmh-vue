<template>
  <div class="ConsumeRecordCardHistory">
    <el-form :inline="true" :model="consumeRecordCardSearch" ref="consumeRecordCardSearch" class="demo-form-inline search-form" 
      @keyup.enter.native="searchConsumeCardRecord('search')">
      <el-form-item>
        <!-- 添加隐藏的input 阻止一个input时的默认回车事件 -->
        <el-input style="display:none;"></el-input>
        <el-input v-model.trim="consumeRecordCardSearch.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchConsumeCardRecord('search')" icon="el-icon-search" class="search-btn">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" size="mini" v-loading="loading" style="width: 100%">
      <el-table-column prop="id" label="ID" v-if="false"></el-table-column>
      <el-table-column prop="tradeSerialNumber" label="流水号"></el-table-column>
      <el-table-column prop="customerName" label="姓名"></el-table-column>
      <el-table-column prop="customerMobile" label="手机"></el-table-column>
      <el-table-column prop="consumeMoney" label="消费金额"></el-table-column>
      <el-table-column prop="paymentWayName" label="支付方式"></el-table-column>
      <el-table-column prop="employee" label="销售员">
        <template slot-scope="scope">
            <div v-for="(employee,index) in scope.row.consumeSaleEmployees" :key="index">
              {{employee.employeeName}}
            </div>
        </template>
      </el-table-column>
      <el-table-column prop="percent" label="绩效">
        <template slot-scope="scope">
            <div v-for="(employee,index) in scope.row.consumeSaleEmployees" :key="index">
              {{employee.percent}}
            </div>
        </template>
      </el-table-column>
      <el-table-column prop="isModified" label="是否修改" :formatter="handleModified"></el-table-column>
      <el-table-column prop="remark" label="备注" :formatter="handleRemark"></el-table-column>
      <el-table-column prop="consumeRecordDetailUnion" label="卡名" :formatter="handleCardName"></el-table-column>
    </el-table>
    <el-pagination layout="total, prev, pager, next" 
      :page-size="pageSize" :total="totalCount"
       @current-change="chagePage"></el-pagination>
    <el-dialog title="办卡赠品详情" :visible.sync="cardGiftContentVisible" :show-close="false"
      :close-on-click-modal="false" :close-on-press-escape="false">
      <el-table :data="cardGiftContentDetail" size="mini" v-loading="loading" style="width: 100%">
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="name" label="内容/金额"></el-table-column>
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
  name: "ConsumeRecordCardHistory",
  data() {
    return {
      consumeRecordCardSearch: {
        content: "",
        oldContent: "",//储存最近一次搜索的内容
        pageNum: 1,
        pageSize: 10,
        consumeType: 1,
      },
      loading: false,
      cardGiftContentDetail: [],
      cardGiftContentVisible: false
    };
  },
  computed: {
    pageNum: function(){
      return this.$store.state.consumeRecord.pageNum;
    },
    pageSize: function(){
      return this.$store.state.consumeRecord.pageSize;
    },
    totalCount: function(){
      return this.$store.state.consumeRecord.totalCount;
    },
    totalPages: function(){
      return this.$store.state.consumeRecord.totalPages;
    },
    tableData: function(){
      return this.$store.state.consumeRecord.consumeRecordsHistory;
    }
  },
  methods: {
    searchConsumeCardRecord(type) {
      this.loading = true;
      if(type === 'search'){
        this.consumeRecordCardSearch.oldContent = this.consumeRecordCardSearch.content;
      }
      this.consumeRecordCardSearch.type = type;
      this.$store.dispatch("loadConsumeRecordHistory", this.consumeRecordCardSearch).then( res => {
        this.loading = false;
        this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    },
    chagePage(val){
      this.consumeRecordCardSearch.pageNum = val;
      this.searchConsumeCardRecord('page');
    },
    handleRemark(row, column){
      if(!row.remark || row.remark === ''){
        return '暂无备注';
      }else{
        return row.remark;
      }
    },
    handleModified(row, column){
      if(row.isModified === 0){
        return '否';
      }else{
        return '是';
      }
    },
    handleCardName(row, column){
      if(!row.consumeRecordDetailUnion[0]){
        return '充值';
      }else{
        return row.consumeRecordDetailUnion[0].cardName;
      }
    },
    handleEdit(index, row){
      this.$router.push({ path: '/consume-record-card/' + row.id});
    },
    handlePrint(index, row){
      this.$message({
        message: '打印数据加载中',
        iconClass: 'el-icon-loading',
        duration: 0
      });

      this.$store.dispatch("printConsumeRecord", {
        'consumeRecordId': row.id
      }).then( res => {
        console.log(this.$store.state.consumeRecord.consumeRecordPrint);
        this.$message.closeAll();
        this.$router.push({ path: '/print-card-record'});
      }).catch( err => {
        console.log(err);
      });
    },
    handleCardGiftDetail(index, row){// 显示卡礼物详情
      this.cardGiftContentDetail = [];
      let consumeRecord = this.$store.getters.getConsumeRecordById(row.id);
      for(let content of consumeRecord.consumeRecordGiftUnion){
        if(content.productId){
          this.cardGiftContentDetail.push({
            'type': '产品',
            'name': content.productName,
            'amount': content.productAmount,
          })
        }else if(content.projectId){
          this.cardGiftContentDetail.push({
            'type': '项目',
            'name': content.projectName,
            'amount': content.projectAmount,
          })
        }else{
          this.cardGiftContentDetail.push({
            'type': '代金券',
            'name': content.couponMoney,
            'amount': content.couponAmount,
          })
        }
      }
      this.cardGiftContentVisible = true;
    },
    onClose(formName){
      this.cardGiftContentVisible = false;
      this.cardGiftContentDetail = [];
    }
  },
  beforeMount: function () {
    this.searchConsumeCardRecord('search');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>