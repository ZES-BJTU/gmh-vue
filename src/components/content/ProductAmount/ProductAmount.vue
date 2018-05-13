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
    <div class="operate-box">
      <router-link to="/product-amount-convert-each">
        <el-button type="primary" icon="el-icon-plus">转化</el-button>
      </router-link>
      <el-button icon="el-icon-download" @click="exportProductsVisible = true">导出产品流水</el-button>
      <el-button icon="el-icon-download" @click="exportConvertVisible = true">导出库存产品转化流水</el-button>
    </div>
    <el-table :data="tableData" size="mini" v-loading="loading" style="width: 100%">
      <el-table-column prop="id" label="ID" v-if="false"></el-table-column>
      <el-table-column prop="productAmountId" label="productAmountId" v-if="false"></el-table-column>
      <el-table-column prop="code" label="编码"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="productTypeName" label="产品分类"></el-table-column>
      <el-table-column prop="amount" label="数量"></el-table-column>
      <el-table-column prop="unitName" label="计量单位"></el-table-column>
      <el-table-column prop="unitPrice" label="单价"></el-table-column>
      <el-table-column label="操作"  width="220" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="primary" size="mini"
            @click="handleSupply(scope.$index, scope.row)">补货</el-button>
          <el-button size="mini"
            @click="handleConvert(scope.$index, scope.row)">转店</el-button>
          <el-button size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="total, prev, pager, next" 
      :page-size="pageSize" :total="totalCount"
       @current-change="chagePage"></el-pagination>
    <el-dialog title="导出产品流水" :visible.sync="exportProductsVisible" :show-close="false"
      :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="exportProductsForm" ref="exportProductsForm" v-loading="exportProductsLoading">
        <el-form-item prop="exportTime">
          <el-date-picker
            v-model="exportProductsForm.exportTime"
            type="daterange"
            align="center"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose('exportProductsForm')">取 消</el-button>
        <el-button type="primary" @click="onExportProducts('exportProductsForm')">导 出</el-button>
      </span>
    </el-dialog>
    <el-dialog title="导出库存产品转化流水" :visible.sync="exportConvertVisible" :show-close="false"
      :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="exportConvertForm" ref="exportConvertForm" v-loading="exportConvertLoading">
        <el-form-item prop="exportTime">
          <el-date-picker
            v-model="exportConvertForm.exportTime"
            type="daterange"
            align="center"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose('exportConvertForm')">取 消</el-button>
        <el-button type="primary" @click="onExportConvert('exportConvertForm')">导 出</el-button>
      </span>
    </el-dialog>
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
      exportProductsForm: {
        exportTime: '',
      },
      exportConvertForm: {
        exportTime: '',
      },
      loading: false,
      exportProductsVisible: false,
      exportProductsLoading: false,
      exportConvertVisible: false,
      exportConvertLoading: false,
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
    handleConvert(index, row){
      this.$router.push({ path: '/product-amount-convert/' + row.productAmountId});
    },
    handleEdit(index, row){
      this.$router.push({ path: '/product-amount-detail/' + row.productAmountId});
    },
    onClose(formName){
      this.exportProductsVisible = false;
      this.exportConvertVisible = false;
      this.$refs[formName].resetFields();
    },
    onExportProducts(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.exportProductsLoading = true;

          let beginTime, endTime;
          if(this.exportProductsForm.exportTime != ''){
            beginTime = this.toTimeStamp(this.exportProductsForm.exportTime[0]);
            endTime = this.toTimeStamp(this.exportProductsForm.exportTime[1]);
          }else{
            beginTime = '';
            endTime = '';
          }
          if(beginTime != '' && endTime != '' && beginTime === endTime){
            this.$message.error('请选择不同的日期！');
            this.exportProductsLoading = false;
            this.$refs[formName].resetFields();
          }else{
            let token = sessionStorage.getItem('token');
            // var href = this.$store.state.baseUrl+"/export/products";
            var href = "http://39.106.234.57:8080/export/products";
            href = href +'?beginTime='+ beginTime + '&endTime=' + endTime + '&token=' + token;
            window.location.href = href;

            setTimeout(() => {
              this.exportProductsLoading = false;
              this.exportProductsVisible = false;
              this.$refs[formName].resetFields();
            },2000)
          }
        } else {
          return false;
        }
      });
    },
    onExportConvert(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.exportConvertLoading = true;

          let beginTime, endTime;
          if(this.exportConvertForm.exportTime != ''){
            beginTime = this.toTimeStamp(this.exportConvertForm.exportTime[0]);
            endTime = this.toTimeStamp(this.exportConvertForm.exportTime[1]);
          }else{
            beginTime = '';
            endTime = '';
          }
          if(beginTime != '' && endTime != '' && beginTime === endTime){
            this.$message.error('请选择不同的日期！');
            this.exportConvertLoading = false;
            this.$refs[formName].resetFields();
          }else{
            let token = sessionStorage.getItem('token');
            // var href = this.$store.state.baseUrl+"/export/products/stocks";
            var href = "http://39.106.234.57:8080/export/products/stocks";
            href = href +'?beginTime='+ beginTime + '&endTime=' + endTime + '&token=' + token;
            window.location.href = href;

            setTimeout(() => {
              this.exportConvertLoading = false;
              this.exportConvertVisible = false;
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
    this.searchProductAmount('search');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>