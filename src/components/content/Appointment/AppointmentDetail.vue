<template>
  <div class="AppointmentDetail">
    <el-row class="page-title-row">
      <router-link to="/appointment" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">修改预约</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="18" :md="12">
        <el-form class="new-form" :model="modAppointmentForm" ref="modAppointmentForm" label-width="110px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('modAppointmentForm')" v-loading="loading">
          <el-form-item label="姓名" prop="customerName">
            <el-input v-model.trim="modAppointmentForm.customerName" placeholder="请输入姓名" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="customerMobile">
            <el-input v-model.number="modAppointmentForm.customerMobile" placeholder="请输入手机"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="customerGender">
            <el-select v-model.number="modAppointmentForm.customerGender" placeholder="请选择性别">
              <el-option v-for="gender in genders" :key="gender.value" :label="gender.label" :value="gender.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="点排" prop="isLine">
            <el-select v-model.number="modAppointmentForm.isLine" placeholder="请选择点排">
              <el-option v-for="isLine in isLines" :key="isLine.value" :label="isLine.label" :value="isLine.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model.trim="modAppointmentForm.remarks" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item label="项目">
            <el-table :data="appointmentProjectsCopy" size="mini" v-loading="loading" style="width: 100%">
              <el-table-column prop="projectId" label="项目ID" v-if="false"></el-table-column>
              <el-table-column prop="projectName" label="名称"></el-table-column>
              <!-- <el-table-column prop="projectCode" label="代码"></el-table-column> -->
              <el-table-column prop="employeeId" label="员工ID" v-if="false"></el-table-column>
              <el-table-column prop="employeeName" label="员工姓名"></el-table-column>
              <el-table-column prop="beginTime" label="开始时间"></el-table-column>
              <el-table-column prop="endTime" label="结束时间"></el-table-column>
              <el-table-column label="操作" width="50px;" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger"
                    @click="handleDelete(scope.$index, scope.row)">x</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleOpenDialog">添加项目</el-button>
            <el-button type="primary" @click="onSubmit('modAppointmentForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <AppointmentProject :visible="appointmentProjectDialog"
      v-on:closeDialog="appointmentProjectDialog = false" :options="options"
      v-on:addAppointmentProject="handleAddAppointmentProject"></AppointmentProject>
  </div>
</template>

<script>
import AppointmentProject from './AppointmentProject'
export default {
  name: "AppointmentDetail",
  data() {
    return {
      modAppointmentForm: {
        id: '',
        customerName: '',
        customerMobile: '',
        customerGender: '',
        isLine: '',
        remarks: '',
        appointmentProjectParams: []
      },
      rules: {
        customerName: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        customerMobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { type: 'number', message: "手机号必须是数字", trigger: "blur" }
        ],
        customerGender: [
          { required: true, message: "性别不能为空", trigger: "blur" },
          { type: 'number', message: "性别必须是数字", trigger: "blur" }
        ],
        isLine: [
          { required: true, message: "点排不能为空", trigger: "blur" },
          { type: 'number', message: "点排 必须是数字", trigger: "blur" }
        ],
      },
      genders: [
        {
          label: "男",
          value: 1
        },
        {
          label: "女",
          value: 0
        }
      ],
      isLines: [
        {
          label: "是",
          value: 1
        },
        {
          label: "否",
          value: 0
        }
      ],
      loading: false,
      enterFlag: true, //true代表允许回车，false代表不允许回车，避免重复提交
      appointmentProjectDialog: false,
      appointmentProjectsCopy: [],
      options: [],
    };
  },
  computed: {
    projectTypes: function(){
      return this.$store.state.projectType.projectTypesAll;
    },
    projects: function(){
      return this.$store.state.project.projectsAll;
    },
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store
            .dispatch("modAppointment", this.modAppointmentForm)
            .then(res => {
              if (res.code === 0) {
                this.$message.success("修改成功");
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({ path: "/appointment" });
                }, 1000);
              }
            })
            .catch(err => {
              this.loading = false;
              this.enterFlag = true;
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    handleBeginTime(row, column){
      return this.toDatetimeMin(row.beginTime);
    },
    handleEndTime(row, column){
      return this.toDatetimeMin(row.endTime);
    },
    handleOpenDialog(){
      this.options = [
        {
          value: 1,
          label: '美容',
          children: []
        },
        {
          value: 2,
          label: '美甲',
          children: []
        },
        {
          value: 3,
          label: '美睫',
          children: []
        },
      ];
      var arr1 = this.projectTypes.filter(projectType => projectType.topType === 1);
      var arr2 = this.projectTypes.filter(projectType => projectType.topType === 2);
      var arr3 = this.projectTypes.filter(projectType => projectType.topType === 3);
      this.fillOption(arr1,0);
      this.fillOption(arr2,1);
      this.fillOption(arr3,2);
      this.appointmentProjectDialog = true
    },
    fillOption(arr,num){
      for( let projectType of  arr){
        let projects = this.projects.filter(project => project.projectTypeId === Number.parseInt(projectType.id));
        let child = [];
        for( let project of projects ){
          child.push({
            'value': project.id,
            'label': project.code + '-' + project.name, 
          })
        }
        this.options[num].children.push({
          'value': projectType.id,
          'label': projectType.name,
          'children': child
        })
      }
    },
    handleAddAppointmentProject(payload){
      // console.log(payload);
      let employee = this.$store.getters.getEmployeeFromAllById(payload.employeeId);
      let project = this.$store.getters.getProjectFromAllById(payload.projectId);
      let beginTimeStamp = this.toTimeStamp(payload.appointmentTime[0]);
      let beginTimeString = this.toDatetimeMin(beginTimeStamp);
      let endTimeStamp = this.toTimeStamp(payload.appointmentTime[1]);
      let endTimeString = this.toDatetimeMin(endTimeStamp);
      this.appointmentProjectsCopy.push({
        'projectId': project.id,
        'projectName': project.name,
        'projectCode': project.code,
        'employeeId': employee.id,
        'employeeName': employee.name,
        'beginTime': beginTimeString,
        'endTime': endTimeString,
      })
      this.modAppointmentForm.appointmentProjectParams.push({
        'projectId': project.id,
        'projectCode': project.code,
        'employeeId': employee.id,
        'beginTime': beginTimeStamp,
        'endTime': endTimeStamp,
      })
    },
    handleDelete(index, row){
      var arrIndex = this.appointmentProjectsCopy.findIndex((appointmentProject, index, arr) => {
        return appointmentProject.id === row.id;
      })
      this.appointmentProjectsCopy.splice(arrIndex,1);
      this.modAppointmentForm.appointmentProjectParams.splice(arrIndex,1);
    },
    loadProjectTypeAll(){
      this.$store.dispatch("loadProjectTypeAll").then( res => {
        this.loading = false;
        // this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    },
    loadProjectAll(){
      this.$store.dispatch("loadProjectAll").then( res => {
        this.loading = false;
        // this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    },
    loadEmployeeAll(){
      this.$store.dispatch("loadEmployeeAll").then( res => {
        this.loading = false;
        // this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    }
  },
  beforeMount: function () {
    if(this.$store.state.appointment.appointments.length === 0){
      //如果vuex中没有数据，则返回列表页
      this.$router.push({ path: '/appointment' });
    }else{
      this.loadProjectTypeAll();
      this.loadProjectAll();
      this.loadEmployeeAll();
      //从vuex中查询该id
      const app = this.$store.getters.getAppointmentById(this.$route.params.id);
      console.log(app);
      this.modAppointmentForm.id = app.id;
      this.modAppointmentForm.customerName = app.customerName;
      this.modAppointmentForm.customerMobile = Number.parseInt(app.customerMobile);
      this.modAppointmentForm.customerGender = ( app.gender === '男' ? 1 : 0);
      this.modAppointmentForm.isLine = ( app.isLine === '是' ? 1 : 0);
      this.modAppointmentForm.remarks = app.remarks;
      for( let appointmentProject of app.appointmentProjects){
        this.modAppointmentForm.appointmentProjectParams.push({
          'projectId': appointmentProject.projectId,
          // 'projectCode': appointmentProject.code,
          'employeeId': appointmentProject.employeeId,
          'beginTime': appointmentProject.beginTime,
          'endTime': appointmentProject.endTime,
        })
        this.appointmentProjectsCopy.push({
          'projectId': appointmentProject.projectId,
          'projectName': appointmentProject.projectName,
          // 'projectCode': appointmentProject.projectCode,
          'employeeId': appointmentProject.employeeId,
          'employeeName': appointmentProject.employeeName,
          'beginTime': this.toDatetimeMin(appointmentProject.beginTime),
          'endTime': this.toDatetimeMin(appointmentProject.endTime)
        })
      }
    }
  },
  components: {AppointmentProject}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>