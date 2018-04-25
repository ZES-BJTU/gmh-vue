<template>
  <div class="StockAmount">
    <el-form :inline="true" :model="stockAmountSearch" ref="stockAmountSearch" class="demo-form-inline search-form" @keyup.enter.native="searchStockAmount('search')">
      <el-form-item>
        <!-- 添加隐藏的input 阻止一个input时的默认回车事件 -->
        <el-input style="display:none;"></el-input>
        <el-input v-model.trim="stockAmountSearch.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchStockAmount('search')" icon="el-icon-search" class="search-btn">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="operate-box">
      <el-button icon="el-icon-download" @click="exportStocksVisible = true">导出库存流水</el-button>
    </div>
    <el-table :data="tableData" size="mini" v-loading="loading" style="width: 100%">
      <el-table-column prop="id" label="ID" v-if="false"></el-table-column>
      <el-table-column prop="stockAmountId" label="StockAmountId" v-if="false"></el-table-column>
      <el-table-column prop="code" label="代码"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="stockTypeName" label="库存分类"></el-table-column>
      <el-table-column prop="amount" label="数量"></el-table-column>
      <el-table-column prop="unitName" label="计量单位"></el-table-column>
      <el-table-column label="操作"  width="220" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini"
            @click="handleSupply(scope.$index, scope.row)">补货</el-button>
          <el-button size="mini"
            @click="handleConvert(scope.$index, scope.row)">转店</el-button>
          <el-button  size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="total, prev, pager, next" 
      :page-size="pageSize" :total="totalCount"
       @current-change="chagePage"></el-pagination>
    <el-dialog title="导出库存流水" :visible.sync="exportStocksVisible" :show-close="false"
      :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="exportStocksForm" ref="exportStocksForm" v-loading="exportLoading">
        <el-form-item prop="exportTime">
          <el-date-picker
            v-model="exportStocksForm.exportTime"
            type="daterange"
            align="center"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose('exportStocksForm')">取 消</el-button>
        <el-button type="primary" @click="onExport('exportStocksForm')">导 出</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "StockAmount",
  data() {
    return {
      stockAmountSearch: {
        content: '',
        oldContent: '',//储存最近一次搜索的内容
        pageNum: '1',
        pageSize: '10',
        type: ''
      },
      exportStocksForm: {
        exportTime: '',
      },
      loading: false,
      exportStocksVisible: false,
      exportLoading: false,
    };
  },
  computed: {
    pageNum: function(){
      return this.$store.state.stockAmount.pageNum;
    },
    pageSize: function(){
      return this.$store.state.stockAmount.pageSize;
    },
    totalCount: function(){
      return this.$store.state.stockAmount.totalCount;
    },
    totalPages: function(){
      return this.$store.state.stockAmount.totalPages;
    },
    tableData: function(){
      return this.$store.state.stockAmount.stockAmounts;
    }
  },
  methods: {
    searchStockAmount(type) {
      this.loading = true;
      if(type === 'search'){
        this.stockAmountSearch.oldContent = this.stockAmountSearch.content;
      }
      this.stockAmountSearch.type = type;
      this.$store.dispatch("loadStockAmount", this.stockAmountSearch).then( res => {
        this.loading = false;
        this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    },
    chagePage(val){
      this.stockAmountSearch.pageNum = val;
      this.searchStockAmount('page');
    },
    handleSupply(index, row){
      console.log(row.stockAmountId);
      this.$router.push({ path: '/stock-amount-supply/' + row.stockAmountId});
    },
    handleConvert(index, row){
      this.$router.push({ path: '/stock-amount-convert/' + row.stockAmountId});
    },
    handleEdit(index, row){
      this.$router.push({ path: '/stock-amount-detail/' + row.stockAmountId});
    },
    onClose(formName){
      this.exportStocksVisible = false;
      this.$refs[formName].resetFields();
    },
    onExport(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.exportLoading = true;

          let beginTime, endTime;
          if(this.exportStocksForm.exportTime != ''){
            beginTime = this.toTimeStamp(this.exportStocksForm.exportTime[0]);
            endTime = this.toTimeStamp(this.exportStocksForm.exportTime[1]);
          }else{
            beginTime = '';
            endTime = '';
          }
          if(beginTime != '' && endTime != '' && beginTime === endTime){
            this.$message.error('请选择不同的日期！');
            this.exportLoading = false;
            this.$refs[formName].resetFields();
          }else{
            let token = sessionStorage.getItem('token');
            var href = this.$store.state.baseUrl+"/export/stocks";
            href = href +'?beginTime='+ beginTime + '&endTime=' + endTime + '&token=' + token;
            window.location.href = href;

            setTimeout(() => {
              this.exportLoading = false;
              this.exportStocksVisible = false;
              this.$refs[formName].resetFields();
            },2000)
          }
        } else {
          return false;
        }
      });
    },
  },
  beforeMount: function () {
    this.searchStockAmount('search');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>