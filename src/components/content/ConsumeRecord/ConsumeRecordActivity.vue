<template>
  <div class="ConsumeRecordCard">
    <el-form :inline="true" :model="consumeRecordActivitySearch" ref="consumeRecordActivitySearch" class="demo-form-inline search-form" 
      @keyup.enter.native="searchConsumeActivityRecord('search')">
      <el-form-item>
        <!-- 添加隐藏的input 阻止一个input时的默认回车事件 -->
        <el-input style="display:none;"></el-input>
        <el-input v-model.trim="consumeRecordActivitySearch.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchConsumeActivityRecord('search')" icon="el-icon-search" class="search-btn">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="operate-box">
      <router-link to="/consume-record-activity/new-activity">
        <el-button type="primary" icon="el-icon-plus">参加活动</el-button>
      </router-link>
    </div>
    <el-table :data="tableData" size="mini" v-loading="loading" style="width: 100%">
      <el-table-column prop="id" label="ID" v-if="false"></el-table-column>
      <el-table-column prop="tradeSerialNumber" label="流水号"></el-table-column>
      <el-table-column prop="customerName" label="姓名"></el-table-column>
      <el-table-column prop="customerMobile" label="手机"></el-table-column>
      <el-table-column prop="consumeMoney" label="消费金额"></el-table-column>
      <el-table-column prop="activityName" label="活动名称"></el-table-column>
      <el-table-column prop="paymentWayName" label="支付方式"></el-table-column>
      <el-table-column prop="isModified" label="是否修改" :formatter="handleModified"></el-table-column>
      <el-table-column prop="remark" label="备注" :formatter="handleRemark"></el-table-column>=
      <el-table-column label="操作" width="220px;" fixed="right">
        <template slot-scope="scope">
          <!-- <el-button size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button size="mini"
            @click="handlePrint(scope.$index, scope.row)">打印</el-button>
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
  name: "ConsumeRecordCard",
  data() {
    return {
      consumeRecordActivitySearch: {
        content: "",
        oldContent: "",//储存最近一次搜索的内容
        pageNum: 1,
        pageSize: 10,
        consumeType: 4,
      },
      loading: false,
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
      return this.$store.state.consumeRecord.consumeRecords;
    }
  },
  methods: {
    searchConsumeActivityRecord(type) {
      this.loading = true;
      if(type === 'search'){
        this.consumeRecordActivitySearch.oldContent = this.consumeRecordActivitySearch.content;
      }
      this.consumeRecordActivitySearch.type = type;
      this.$store.dispatch("loadConsumeRecord", this.consumeRecordActivitySearch).then( res => {
        this.loading = false;
        this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    },
    chagePage(val){
      this.consumeRecordActivitySearch.pageNum = val;
      this.searchConsumeActivityRecord('page');
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
        this.$router.push({ path: '/print-activity-record'});
      }).catch( err => {
        console.log(err);
      });
    },
    handleModified(row, column){
      if(row.isModified === 0){
        return '否';
      }else{
        return '是';
      }
    },
    handleRemark(row, column){
      if(!row.remark || row.remark === ''){
        return '暂无备注';
      }else{
        return row.remark;
      }
    },
    handleEdit(index, row){
      // this.$router.push({ path: '/appointment-detail/' + row.id});
    },
    onClose(formName){
      this.cardGiftContentVisible = false;
      this.cardGiftContentDetail = [];
    }
  },
  beforeMount: function () {
    this.searchConsumeActivityRecord('search');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>