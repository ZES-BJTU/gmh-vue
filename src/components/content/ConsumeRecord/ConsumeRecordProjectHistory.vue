<template>
  <div class="ConsumeRecordProjectHistory">
    <el-form :inline="true" :model="consumeRecordProjectSearch" ref="consumeRecordProjectSearch" class="demo-form-inline search-form" 
      @keyup.enter.native="searchConsumeProjectRecord('search')">
      <el-form-item>
        <!-- 添加隐藏的input 阻止一个input时的默认回车事件 -->
        <el-input style="display:none;"></el-input>
        <el-input v-model.trim="consumeRecordProjectSearch.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="consumeRecordProjectSearch.projectId" placeholder="请选择" filterable>
          <el-option v-for="project in projects" :key="project.id" :label="project.code+'-'+project.name" :value="project.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchConsumeProjectRecord('search')" icon="el-icon-search" class="search-btn">查询</el-button>
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
    </el-table>
    <el-pagination layout="total, prev, pager, next" 
      :page-size="pageSize" :total="totalCount"
       @current-change="chagePage"></el-pagination>
    <el-dialog title="项目详情" :visible.sync="projectContentVisible" :show-close="false"
      :close-on-click-modal="false" :close-on-press-escape="false">
      <el-table :data="projectContentDetail" size="mini" v-loading="loading" style="width: 100%">
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
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
  name: "ConsumeRecordProjectHistory",
  data() {
    return {
      consumeRecordProjectSearch: {
        content: "",
        projectId: '',
        oldContent: "",//储存最近一次搜索的内容
        oldProjectId: "",//储存最近一次搜索的内容
        pageNum: 1,
        pageSize: 10,
        consumeType: 3,
      },
      loading: false,
      projectContentDetail: [],
      projectContentVisible: false
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
    },
    projects: function(){
      return [{'id':'','name':'查询全部','code':'无'}].concat(this.$store.state.project.projectsAll);
    }
  },
  methods: {
    searchConsumeProjectRecord(type) {
      this.loading = true;
      if(type === 'search'){
        this.consumeRecordProjectSearch.oldContent = this.consumeRecordProjectSearch.content;
        this.consumeRecordProjectSearch.oldProjectId = this.consumeRecordProjectSearch.projectId;
      }
      this.consumeRecordProjectSearch.type = type;
      this.$store.dispatch("loadConsumeRecordHistory", this.consumeRecordProjectSearch).then( res => {
        this.loading = false;
        this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    },
    chagePage(val){
      this.consumeRecordProjectSearch.pageNum = val;
      this.searchConsumeProjectRecord('page');
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
        this.$router.push({ path: '/print-project-record'});
      }).catch( err => {
        console.log(err);
      });
    },
    handleEdit(index, row){
      this.$router.push({ path: '/consume-record-project/' + row.id});
    },
    handleProjectDetail(index, row){// 显示产品详情
      this.projectContentDetail = [];
      let consumeRecord = this.$store.getters.getConsumeRecordById(row.id);
      for(let content of consumeRecord.consumeRecordDetailUnion){
        this.projectContentDetail.push({
          'projectName': content.projectName,
          'amount': content.amount,
        })
      }
      this.projectContentVisible = true;
    },
    loadProjectAll(){
      this.$store.dispatch("loadProjectAll");
    },
    onClose(formName){
      this.projectContentVisible = false;
      this.projectContentDetail = [];
    }
  },
  beforeMount: function () {
    this.loadProjectAll();
    this.searchConsumeProjectRecord('search');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>