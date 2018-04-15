<template>
  <div class="Schedule">
    <el-container>
      <el-header>
        <home-header></home-header>
      </el-header>
      <el-container class="home-container">
        <el-container>
          <el-main>
            <el-form :model="operatorForm" ref="operatorForm">
              <el-form-item>
                <el-select v-model.number="operatorForm.operatorId" placeholder="请查询操作员"
                  @change="loadAppointment" filterable>
                  <el-option v-for="employee in employees" :key="employee.id" :label="employee.name" :value="employee.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-card class="box-card appointment-box" v-for="(appointment,index) in appointmentData" :key="index">
              <div class="box">
                <div class="column">
                  <span class="item">{{ appointment.operatorName }}</span>
                  <span class="item">
                    <el-tag>{{ appointment.projectName }}</el-tag>
                  </span>
                </div>
                <div class="column">
                  <span class="item"><i class="el-icon-time time-icon"></i>{{ appointment.beginTime }}</span>
                  <span class="item"><i class="el-icon-time time-icon"></i>{{ appointment.endTime }}</span>
                </div>
              </div>
            </el-card>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomeHeader from './HomeHeader'
export default {
  name: "Schedule",
  data() {
    return {
      operatorForm: {
        operatorId: '',
      },
      employees: [{ id: '', name: '查询所有' }],
      loading: false,
      appointmentData: []
    };
  },
  methods: {
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
    loadAppointment(){
       this.appointmentData = [];
      this.$store.dispatch("loadAppointmentOperator", this.operatorForm).then( res => {
        for(let appointment of res.data){
          this.appointmentData.push({
            'operatorName': appointment.operatorName,
            'projectName': appointment.projectName,
            'beginTime': this.toDatetimeMin(appointment.beginTime),
            'endTime': this.toDatetimeMin(appointment.endTime)
          })
        }
      }).catch( err => {
        console.log(err);
      });
    },
    loadEmployeeAll(){
      this.$store.dispatch("loadEmployeeAll").then( res => {
        for(let employee of res.data){
          this.employees.push(employee);
        }
      }).catch( err => {
        console.log(err);
      });
    },
  },
  beforeMount: function(){
    this.loadEmployeeAll();
    this.loadAppointment();
  },
  components: {HomeHeader}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.account-item{
  float: right;
}
.home-container {
  margin-top: 1px;
}
.appointment-box{
  margin: 20px 0;
}
.box {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}

.column {
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
}
.item{
  margin: 10px 0;
}
.time-icon{
  margin-right: 5px;
}
</style>
