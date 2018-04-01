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
            {{appointmentProject.beginTime}}
            <el-form-item label="请选择时间" prop="">
              <el-date-picker
                v-model="appointmentProject.beginTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="请选择员工">
              <el-select v-model.number="appointmentProject.employeeId" filterable 
                placeholder="请输入关键词">
                <el-option v-for="employee in employees" :key="employee.id" :label="employee.name" :value="employee.id">
                </el-option>
              </el-select>
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
        beginTime: '',
        endTime: '',
      },
      rules: {
        projectId: [
          { required: true, message: "库存不能为空", trigger: "blur" },
          { type: 'number', message: "库存必须是数字", trigger: "blur" }
        ],
        stockConsumptionAmount: [
          { required: true, message: "数量不能为空", trigger: "blur" },
          { type: 'number', message: "数量必须是数字", trigger: "blur" }
        ]
      }
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
          this.$emit('addProjectStock', this.projectStockParams);
          this.$emit('closeDialog', false);
          this.$refs[formName].resetFields();
        } else {
          return false;
        }
      });
    },
    onClose(formName){
      this.$emit('closeDialog', false);
      this.$refs[formName].resetFields();
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
    }
  },
  loadEmployeeByTopType(topType){
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>