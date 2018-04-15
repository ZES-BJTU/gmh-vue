<template>
  <div class="Appointment">
    <el-form :inline="true" :model="appointmentSearch" ref="appointmentSearch" class="demo-form-inline search-form" 
      @keyup.enter.native="searchAppointment('search')">
      <el-form-item>
        <!-- 添加隐藏的input 阻止一个input时的默认回车事件 -->
        <el-input style="display:none;"></el-input>
        <el-input v-model.trim="appointmentSearch.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchAppointment('search')" icon="el-icon-search" class="search-btn">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="operate-box">
      <router-link to="/appointment/new">
        <el-button type="primary" icon="el-icon-plus">新建</el-button>
      </router-link>
    </div>
    <el-table :data="tableData" size="mini" v-loading="loading" style="width: 100%">
      <el-table-column prop="id" label="ID" v-if="false"></el-table-column>
      <el-table-column prop="customerName" label="姓名"></el-table-column>
      <el-table-column prop="customerMobile" label="手机"></el-table-column>
      <el-table-column prop="customerGender" label="性别"></el-table-column>
      <el-table-column prop="isLine" label="点排"></el-table-column>
      <el-table-column prop="remark" label="备注" :formatter="handleRemark"></el-table-column>
      <el-table-column prop="projects" label="项目">
        <template slot-scope="scope">
            <div v-for="appointmentProject in scope.row.appointmentProjects">
              {{appointmentProject.projectName}}
            </div>
        </template>
      </el-table-column>
      <el-table-column prop="employees" label="员工">
        <template slot-scope="scope">
            <div v-for="appointmentProject in scope.row.appointmentProjects">
              {{appointmentProject.employeeName}}
            </div>
        </template>
      </el-table-column>
      <el-table-column prop="beginTime" label="开始时间" width="125px;" :formatter="handleBeginTime"></el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="125px;" :formatter="handleEndTime"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column label="操作" width="220px;" fixed="right">
        <template slot-scope="scope" v-if="scope.row.status === '未完成'">
          <el-button size="mini" type="success"
            @click="handleFinish(scope.$index, scope.row)">完成</el-button>
          <el-button size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger"
            @click="handleDelete(scope.$index, scope.row)">取消</el-button>
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
  name: "Appointment",
  data() {
    return {
      appointmentSearch: {
        content: "",
        oldContent: "",//储存最近一次搜索的内容
        pageNum: 1,
        pageSize: 10,
        type: ""
      },
      loading: false
    };
  },
  computed: {
    pageNum: function(){
      return this.$store.state.appointment.pageNum;
    },
    pageSize: function(){
      return this.$store.state.appointment.pageSize;
    },
    totalCount: function(){
      return this.$store.state.appointment.totalCount;
    },
    totalPages: function(){
      return this.$store.state.appointment.totalPages;
    },
    tableData: function(){
      return this.$store.state.appointment.appointments;
    }
  },
  methods: {
    searchAppointment(type) {
      this.loading = true;
      if(type === 'search'){
        this.appointmentSearch.oldContent = this.appointmentSearch.content;
      }
      this.appointmentSearch.type = type;
      this.$store.dispatch("loadAppointment", this.appointmentSearch).then( res => {
        this.loading = false;
        this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    },
    chagePage(val){
      this.appointmentSearch.pageNum = val;
      this.searchAppointment('page');
    },
    handleRemark(row, column){
      if(!row.remark || row.remark === ''){
        return '暂无备注';
      }else{
        return row.remark;
      }
    },
    handleBeginTime(row, column){
      let beginTimes = '';
      for( let appointmentProject of row.appointmentProjects){
        beginTimes += this.toDatetimeMin(appointmentProject.beginTime);
      }
      return beginTimes;
    },
    handleEndTime(row, column){
      let endTimes = '';
      for( let appointmentProject of row.appointmentProjects){
        endTimes += this.toDatetimeMin(appointmentProject.endTime);
      }
      return endTimes;
    },
    handleFinish(index, row){
      this.$router.push({ path: '/appointment-finish/' + row.id});
    },
    handleEdit(index, row){
      this.$router.push({ path: '/appointment-detail/' + row.id});
    },
    handleDelete(index, row){
      const h = this.$createElement;
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '此操作将会永久取消该预约！ ')
        ]),
        showCancelButton: true,
        confirmButtonText: '确认取消',
        cancelButtonText: '否',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '取消中...';
            this.$store.dispatch("cancelAppointment", {
              'appointmentId': row.id
            }).then( res => {
              done();
              instance.confirmButtonLoading = false;
              this.searchAppointment('search');
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
          message: '取消操作'
        });
      });
    },
  },
  beforeMount: function () {
    this.searchAppointment('search');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>