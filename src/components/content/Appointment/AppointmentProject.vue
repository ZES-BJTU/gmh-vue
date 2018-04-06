<template>
  <div class="AppointmentProject">
    <el-dialog title="项目" :visible.sync="isVisible" :show-close="false"
      :close-on-click-modal="false" :close-on-press-escape="false" >
      <el-row type="flex" justify="start">
        <el-col :xs="20">
          <el-form :model="appointmentProject" ref="appointmentProject" :rules="rules">
            <el-form-item label="请选择美容项目">
              <el-cascader :options="options" @change="handleChange"
                @active-item-change="handleProjectChange" filterable></el-cascader>
            </el-form-item>
            <el-form-item label="请选择时间" prop="">
              <el-date-picker
                v-model="appointmentProject.appointmentTime"
                type="datetimerange"
                align="center"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="请选择员工">
              <el-select v-model.number="appointmentProject.employeeId" filterable placeholder="请输入关键词">
                <el-option v-for="employee in employees" :key="employee.id" 
                  :label="employee.name" :value="employee.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="请选择查询日期">
              <el-date-picker v-model="employeeSchedule" type="date" 
                placeholder="查询员工日程" @change="handleDateChange">
              </el-date-picker>
              <div class="schedule">
                <div class="schedule-item" v-for="item of employeeSchedule" 
                  :key="item.beginTime" :class="item.isFree === 1 ? 'free' : 'occupy'"
                  :style="{ 'flex': '1 ' + item.percent + '%' }">
                  <div class="beginTime">
                    {{item.beginTime}}
                  </div>
                  <div class="line">-</div>
                  <div class="endTime">
                    {{item.endTime}}
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose('appointmentProject')">取 消</el-button>
        <el-button type="primary" @click="onSubmit('appointmentProject')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AppointmentProject",
  props: ['visible','options'],
  data() {
    return {
      appointmentProject: {
        projectId: '',
        employeeId: '',
        appointmentTime: '',
      },
      rules: {
        projectId: [
          { required: true, message: "库存不能为空", trigger: "blur" },
          { type: 'number', message: "库存必须是数字", trigger: "blur" }
        ],
        stockConsumptionAmount: [
          { required: true, message: "数量不能为空", trigger: "blur" },
          { type: 'number', message: "数量必须是数字", trigger: "blur" }
        ],
        appointmentTime: [
          { required: true, message: "预约时间不能为空", trigger: "blur" }
        ]
      },
      employeeSchedule: []
    }
  },
  computed: {
    isVisible: function(){
      return this.visible;
    },
    employees: function(){
      return this.$store.state.employee.employeesByTopType;
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('addAppointmentProject', this.appointmentProject);
          this.$emit('closeDialog', false);
          this.$refs[formName].resetFields();
        } else {
          return false;
        }
      });
    },
    onClose(formName){
      this.$emit('closeDialog', false);
      console.log(this.$refs[formName]);
      this.$refs[formName].resetFields();
      this.appointmentProject.appointmentTime = [];
    },
    handleChange(val){
      this.appointmentProject.projectId = val[2];
    },
    handleProjectChange(val) {
      this.$store.dispatch("loadEmployeeByTopType",val[0]).then( res => {
        // this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    },
    handleDateChange(val){
      if(this.appointmentProject.employeeId === '' || !this.appointmentProject.employeeId){
        this.$message.error("请选择员工");
      }else{
        this.$store.dispatch("getEmployeeTimeTable", {
          'employeeId':this.appointmentProject.employeeId,
          'date': this.toTimeStamp(val)
        }).then(res => {
          if (res.code === 0) {
            this.employeeSchedule = [];
            for(let item of res.data){
              item.beginTime = this.toMin(item.beginTime);
              item.endTime = this.toMin(item.endTime);
              this.employeeSchedule.push(item);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .schedule{
    display: flex;
    margin-top: 10px;
  }
  .schedule-item{
    flex: 1;
    height: 50px;
    line-height: 50px;
    padding: 5px 0;
    &.free{
      background: #49bfd6;
    }
    &.occupy{
      background: #8d8d8d;
    }

    & .line{
      height: 10px;
      line-height: 10px;
      text-align: center;
    }
    & .beginTime, & .endTime{
      height: 20px;
      line-height: 20px;
      text-align: center;
    }
    &:first-child{
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-child{
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
</style>