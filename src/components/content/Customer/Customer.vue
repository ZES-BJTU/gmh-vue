<template>
  <div class="Customer">
    <el-form :inline="true" :model="customerSearch" ref="customerSearch" class="demo-form-inline search-form" 
      @keyup.enter.native="searchCustomer('search')">
      <el-form-item>
        <!-- 添加隐藏的input 阻止一个input时的默认回车事件 -->
        <el-input style="display:none;"></el-input>
        <el-input v-model.trim="customerSearch.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchCustomer('search')" icon="el-icon-search" class="search-btn">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="operate-box">
      <router-link to="/customer/new">
        <el-button type="primary" icon="el-icon-plus">新建</el-button>
      </router-link>
      <el-button icon="el-icon-download" @click="exportCustomerVisible = true">导出顾客信息</el-button>
    </div>
    <el-table :data="tableData" size="mini" v-loading="loading" style="width: 100%">
      <el-table-column prop="id" label="ID" v-if="false"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column prop="mobile" label="手机"></el-table-column>
      <el-table-column prop="birthday" label="生日" :formatter="toDate"></el-table-column>
      <el-table-column prop="source" label="来源" :formatter="handleSource"></el-table-column>
      <el-table-column prop="remark" label="备注" :formatter="handleRemark"></el-table-column>
      <el-table-column label="操作"  width="150" fixed="right">
        <template slot-scope="scope">
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
    <el-dialog title="导出顾客信息" :visible.sync="exportCustomerVisible" :show-close="false"
      :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="exportCustomerForm" ref="exportCustomerForm"  v-loading="exportLoading">
        <el-form-item prop="exportTime">
          <el-date-picker
            v-model="exportCustomerForm.exportTime"
            type="daterange"
            align="center"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose('exportCustomerForm')">取 消</el-button>
        <el-button type="primary" @click="onExport('exportCustomerForm')">导 出</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import httpServer from '@/lib/axios'

export default {
  name: "Customer",
  data() {
    return {
      customerSearch: {
        content: '',
        oldContent: '',//储存最近一次搜索的内容
        pageNum: '1',
        pageSize: '10',
        type: ''
      },
      exportCustomerForm: {
        exportTime: '',
      },
      loading: false,
      exportCustomerVisible: false,
      exportLoading: false,
    };
  },
  computed: {
    pageNum: function(){
      return this.$store.state.customer.pageNum;
    },
    pageSize: function(){
      return this.$store.state.customer.pageSize;
    },
    totalCount: function(){
      return this.$store.state.customer.totalCount;
    },
    totalPages: function(){
      return this.$store.state.customer.totalPages;
    },
    tableData: function(){
      return this.$store.state.customer.customers;
    }
  },
  methods: {
    searchCustomer(type) {
      this.loading = true;
      if(type === 'search'){
        this.customerSearch.oldContent = this.customerSearch.content;
      }
      this.customerSearch.type = type;
      this.$store.dispatch("loadCustomer", this.customerSearch).then( res => {
        this.loading = false;
        this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    },
    chagePage(val){
      this.customerSearch.pageNum = val;
      this.searchStock('page');
    },
    toDate(row, column){
      if(!row.birthday || row.birthday === ''){
        return '暂无生日';
      }else{
        return this.toDatetimeDay(row.birthday);
      }
    },
    handleSource(row, column){
      if(!row.source || row.source === ''){
        return '暂无来源';
      }else{
        return row.source;
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
      this.$router.push({ path: '/customer/' + row.id});
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
            this.$store.dispatch("delCustomer", row.id).then( res => {
              done();
              instance.confirmButtonLoading = false;
              this.searchCustomer('search');
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
    onClose(formName){
      this.exportCustomerVisible = false;
      this.$refs[formName].resetFields();
    },
    onExport(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.exportLoading = true;
          let beginTime, endTime;
          if(this.exportCustomerForm.exportTime != ''){
            beginTime = this.toTimeStamp(this.exportCustomerForm.exportTime[0]);
            endTime = this.toTimeStamp(this.exportCustomerForm.exportTime[1]);
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
            // var href = this.$store.state.baseUrl+"http://39.106.234.57:8080/export/customer";
            var href = "http://39.106.234.57:8080/export/customer";
            href = href +'?beginTime='+ beginTime + '&endTime=' + endTime + '&token=' + token;
            window.location.href = href;
  
            setTimeout(() => {
              this.exportLoading = false;
              this.exportCustomerVisible = false;
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
    this.searchCustomer('search');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>