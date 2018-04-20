<template>
  <div class="Employee">
    <el-form :inline="true" :model="employeeSearch" ref="employeeSearch" class="demo-form-inline search-form" @keyup.enter.native="searchEmployee('search')">
      <el-form-item>
        <!-- 添加隐藏的input 阻止一个input时的默认回车事件 -->
        <el-input style="display:none;"></el-input>
        <el-input v-model.trim="employeeSearch.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchEmployee('search')" icon="el-icon-search" class="search-btn">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="operate-box">
      <router-link to="/employee/new">
        <el-button type="primary" icon="el-icon-plus">新建</el-button>
      </router-link>
      <el-button icon="el-icon-download" @click="exportPerformanceVisible = true">导出绩效</el-button>
      <el-button icon="el-icon-download" @click="exportAchievenmentVisible = true">导出业绩</el-button>
    </div>
    <el-table :data="tableData" size="mini" v-loading="loading" style="width: 100%">
      <el-table-column prop="id" label="ID" v-if="false"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column prop="mobile" label="手机"></el-table-column>
      <el-table-column prop="entryTime" label="入职日期" :formatter="toDate"></el-table-column>
      <el-table-column prop="employeeWorkVos" label="工种" :formatter="toWorkType"></el-table-column>
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
    <el-dialog title="导出绩效" :visible.sync="exportPerformanceVisible" :show-close="false"
      :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="exportPerformanceForm" ref="exportPerformanceForm" v-loading="exportPerformanceLoading">
        <el-form-item prop="exportTime">
          <el-date-picker
            v-model="exportPerformanceForm.exportTime"
            type="daterange"
            align="center"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose('exportPerformanceForm')">取 消</el-button>
        <el-button type="primary" @click="onExportPerformence('exportPerformanceForm')">导 出</el-button>
      </span>
    </el-dialog>
    <el-dialog title="导出业绩" :visible.sync="exportAchievenmentVisible" :show-close="false"
      :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="exportAchievementForm" ref="exportAchievementForm" v-loading="exportAchievenmentLoading">
        <el-form-item prop="exportTime">
          <el-date-picker
            v-model="exportAchievementForm.exportTime"
            type="daterange"
            align="center"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose('exportAchievementForm')">取 消</el-button>
        <el-button type="primary" @click="onExportAchievement('exportAchievementForm')">导 出</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Employee",
  data() {
    return {
      employeeSearch: {
        content: '',
        oldContent: '',//储存最近一次搜索的内容
        pageNum: '1',
        pageSize: '10',
        type: ''
      },
      exportPerformanceForm: {
        exportTime: '',
      },
      exportAchievementForm: {
        exportTime: '',
      },
      loading: false,
      exportPerformanceVisible: false,
      exportPerformanceLoading: false,
      exportAchievenmentVisible: false,
      exportAchievenmentLoading: false,
    };
  },
  computed: {
    pageNum: function(){
      return this.$store.state.employee.pageNum;
    },
    pageSize: function(){
      return this.$store.state.employee.pageSize;
    },
    totalCount: function(){
      return this.$store.state.employee.totalCount;
    },
    totalPages: function(){
      return this.$store.state.employee.totalPages;
    },
    tableData: function(){
      return this.$store.state.employee.employees;
    }
  },
  methods: {
    searchEmployee(type) {
      this.loading = true;
      if(type === 'search'){
        this.employeeSearch.oldContent = this.employeeSearch.content;
      }
      this.employeeSearch.type = type;
      this.$store.dispatch("loadEmployee", this.employeeSearch).then( res => {
        this.loading = false;
        this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    },
    chagePage(val){
      this.employeeSearch.pageNum = val;
      this.searchEmployee('page');
    },
    toDate(row, column){
      return this.toDatetimeDay(row.entryTime);
    },
    toWorkType(row, column){
      let workTypes = [];
      for( let workType of row.employeeWorkVos){
        workTypes.push(workType.workTypeDesc);
      }
      return workTypes.join(',');
    },
    handleRemark(row, column){
      if(!row.remark || row.remark === ''){
        return '暂无备注';
      }else{
        return row.remark;
      }
    },
    handleEdit(index, row){
      this.$router.push({ path: '/employee/' + row.id});
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
            this.$store.dispatch("delEmployee", row.id).then( res => {
              done();
              instance.confirmButtonLoading = false;
              this.searchEmployee('search');
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
      this.exportPerformanceVisible = false;
      this.$refs[formName].resetFields();
    },
    onExportPerformence(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.exportPerformanceLoading = true;
          let beginTime, endTime;
          if(this.exportPerformanceForm.exportTime != ''){
            beginTime = this.toTimeStamp(this.exportPerformanceForm.exportTime[0]);
            endTime = this.toTimeStamp(this.exportPerformanceForm.exportTime[1]);
          }else{
            beginTime = '';
            endTime = '';
          }
          if(beginTime != '' && endTime != '' && beginTime === endTime){
            this.$message.error('请选择不同的日期！');
            this.exportPerformanceLoading = false;
            this.$refs[formName].resetFields();
          }else{
            let token = sessionStorage.getItem('token');
            var href = "http://localhost:8080/export/employeePerformance";
            href = href +'?beginTime='+ beginTime + '&endTime=' + endTime + '&token=' + token;
            window.location.href = href;

            setTimeout(() => {
              this.exportPerformanceLoading = false;
              this.exportPerformanceVisible = false;
              this.$refs[formName].resetFields();
            },2000)
          }
        } else {
          return false;
        }
      });
    },
    onExportAchievement(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.exportAchievenmentLoading = true;
          let beginTime, endTime;
          if(this.exportAchievementForm.exportTime != ''){
            beginTime = this.toTimeStamp(this.exportAchievementForm.exportTime[0]);
            endTime = this.toTimeStamp(this.exportAchievementForm.exportTime[1]);
          }else{
            beginTime = '';
            endTime = '';
          }
          if(beginTime != '' && endTime != '' && beginTime === endTime){
            this.$message.error('请选择不同的日期！');
            this.exportAchievenmentLoading = false;
            this.$refs[formName].resetFields();
          }else{
            let token = sessionStorage.getItem('token');
            var href = "http://localhost:8080/export/employeeSale";
            href = href +'?beginTime='+ beginTime + '&endTime=' + endTime + '&token=' + token;
            window.location.href = href;

            setTimeout(() => {
              this.exportAchievenmentLoading = false;
              this.exportAchievenmentVisible = false;
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
    this.searchEmployee('search');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>