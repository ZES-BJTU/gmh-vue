<template>
  <div class="EmployeeDetail">
    <el-row class="page-title-row">
      <router-link to="/employee" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">编辑员工</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="modEmployeeForm" ref="modEmployeeForm" label-width="80px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('modEmployeeForm')" v-loading="loading">
          <el-form-item label="姓名" prop="name">
            <el-input v-model.trim="modEmployeeForm.name" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model.number="modEmployeeForm.gender" placeholder="请选择性别">
              <el-option v-for="gender in genders" :key="gender.value" :label="gender.label" :value="gender.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model.number="modEmployeeForm.mobile" placeholder="请输入手机"></el-input>
          </el-form-item>
          <el-form-item label="入职日期" prop="entryTime">
            <el-date-picker v-model="modEmployeeForm.entryTime" align="center" 
              type="date" :editable="false" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="工种" prop="workTypes">
            <el-checkbox-group v-model="modEmployeeForm.workTypes">
              <el-checkbox v-for="workType in workTypes" :label="workType.value" :key="workType.value">{{workType.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model.trim="modEmployeeForm.remark" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('modEmployeeForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "EmployeeDetail",
  data() {
    return {
      modEmployeeForm: {
        id: '',
        name: '',
        gender: '',
        mobile: '',
        entryTime: '',
        workTypes: [],
        remark: ''
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
      workTypes: [
        {
          name: "美容师",
          value: 1
        },
        {
          name: "美甲师",
          value: 2
        },
        {
          name: "美睫师",
          value: 3
        },
        {
          name: "美容咨询师",
          value: 4
        },
        {
          name: "总监",
          value: 5
        }
      ],
      rules: {
        name: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        gender: [
          { required: true, message: "性别不能为空", trigger: "blur" },
          { type: 'number', message: "性别必须是数字", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "手机不能为空", trigger: "blur" },
          { type: "number", message: "请输入正确的手机", trigger: "blur" }
        ],
        entryTime: [
          { required: true, message: "入职日期不能为空", trigger: "blur" },
        ],
        workTypes: [
          { required: true, message: "工种不能为空", trigger: "blur" }
        ],
      },
      loading: false,
      enterFlag: true //true代表允许回车，false代表不允许回车，避免重复提交
    };
  }, 
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store.dispatch("modEmployee", {
            id: this.modEmployeeForm.id,
            name: this.modEmployeeForm.name,
            gender: this.modEmployeeForm.gender,
            mobile: this.modEmployeeForm.mobile,
            //考虑到接口失败的情况，不能直接修改把原来的日期转化成时间戳，否则getDate()失效
            entryTime: this.toTimeStamp(this.modEmployeeForm.entryTime),
            workTypes: this.modEmployeeForm.workTypes,
            remark: this.modEmployeeForm.remark
          }).then( res => {
            if( res.code === 0){
              this.$message.success('修改成功');
              setTimeout(() => {
                this.loading = false;
                this.$router.push({ path: '/employee' });
              },2000)
            }
          }).catch( err => {
            this.loading = false;
            this.enterFlag = true;
            console.log(err);
          });
        } else {
          return false;
        }
      });
    }
  },
  beforeMount: function () {
    if(this.$store.state.employee.employees.length === 0){
      //如果vuex中没有数据，则返回列表页
      this.$router.push({ path: '/employee' });
    }else{
      //从vuex中查询该id
      const employee = this.$store.getters.getEmployeeById(this.$route.params.id);
      this.modEmployeeForm.id = employee.id;
      this.modEmployeeForm.name = employee.name;
      this.modEmployeeForm.gender = ( employee.gender === '男' ? 1 : 0);
      this.modEmployeeForm.mobile = Number.parseInt(employee.mobile);
      this.modEmployeeForm.entryTime = this.toDateObject(employee.entryTime);
      for( let workType of employee.employeeWorkVos){
        this.modEmployeeForm.workTypes.push(Number.parseInt(workType.workType));
      }
      this.modEmployeeForm.remark = employee.remark;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>