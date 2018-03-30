<template>
  <div class="CustomerDetail">
    <el-row class="page-title-row">
      <router-link to="/customer" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">编辑店铺负责人</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="modCustomerForm" ref="modCustomerForm" label-width="80px" :rules="rules" @keyup.enter.native="enterFlag && onSubmit('modCustomerForm')" v-loading="loading">
          <el-form-item label="姓名" prop="name">
            <el-input v-model.trim="modCustomerForm.name" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model.number="modCustomerForm.gender" placeholder="请选择性别">
              <el-option v-for="gender in genders" :key="gender.value" :label="gender.label" :value="gender.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model.number="modCustomerForm.mobile" placeholder="请输入手机"></el-input>
          </el-form-item>
          <el-form-item label="生日" prop="birthday">
            <el-date-picker v-model="modCustomerForm.birthday" align="center" 
              type="date" :editable="false" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="来源">
            <el-input v-model.trim="modCustomerForm.source" placeholder="请输入来源"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model.trim="modCustomerForm.remark" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('modCustomerForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CustomerDetail",
  data() {
    return {
      modCustomerForm: {
        id: '',
        name: '',
        gender: '',
        mobile: '',
        birthday: '',
        source: '',
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
      rules: {
        name: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        gender: [
          { required: true, message: "性别不能为空", trigger: "change" }
        ],
        mobile: [
          { required: true, message: "手机不能为空", trigger: "blur" },
          { type: "number", message: "请输入正确的手机", trigger: "blur" }
        ],
        birthday: [
          { required: true, message: "生日不能为空", trigger: "blur" },
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
          this.modCustomerForm.birthday = this.toTimeStamp(this.modCustomerForm.birthday);
          this.$store.dispatch("modCustomer", this.modCustomerForm).then( res => {
            if( res.code === 0){
              this.$message.success('修改成功');
              setTimeout(() => {
                this.loading = false;
                this.$router.push({ path: '/customer' });
              },2000)
            }
          }).catch( err => {
            this.loading = false;
            console.log(err);
          });
        } else {
          return false;
        }
      });
    }
  },
  beforeMount: function () {
    if(this.$store.state.customer.customers.length === 0){
      //如果vuex中没有数据，则返回列表页
      this.$router.push({ path: '/customer' });
    }else{
      //从vuex中查询该id
      const customer = this.$store.getters.getCustomerById(this.$route.params.id);
      this.modCustomerForm.id = customer.id;
      this.modCustomerForm.name = customer.name;
      this.modCustomerForm.gender = ( customer.gender === '男' ? 1 : 0);
      this.modCustomerForm.mobile = Number.parseInt(customer.mobile);
      this.modCustomerForm.birthday = customer.birthday;
      this.modCustomerForm.source = customer.source;
      this.modCustomerForm.remark = customer.remark;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>