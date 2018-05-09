<template>
  <div class="ResetPWD">
    <el-row class="page-title-row" type="flex" justify="center">
      <span class="page-title">重置密码</span>
    </el-row>

    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="8" :md="8" style="text-align:center">
        <el-form :inline="true" class="reset-form" :model="resetPWDForm" ref="resetPWDForm" label-width="110px" :rules="rules" @keyup.enter.native="enterFlag && onSubmit('resetPWDForm')" v-loading="loading">
          <el-form-item prop="mobile">
            <el-input style="width: 165px;" v-model.number="resetPWDForm.mobile" :autofocus="true" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 150px;" @click="sendMessage" :disabled="isDisabled">{{conutText}}</el-button>
          </el-form-item>
          <el-form-item prop="authCode">
            <el-input style="width: 330px;" v-model.number="resetPWDForm.authCode" placeholder="请输入验证码"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="onSubmit('resetPWDForm')" class="reset-btn">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import httpServer from '@/lib/axios'

export default {
  name: "ResetPWD",
  data() {
    return {
      resetPWDForm: {
        mobile: '',
        authCode: ''
      },
      rules: {
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { type: "number", message: "手机号必须是数字", trigger: "blur" }
        ],
        authCode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
        ]
      },
      count: 60,
      conutText: '发送验证码',
      conutText1: '请',
      conutText2: 's后重新发送',
      isDisabled: false,
      st:'',
      loading: false,
      enterFlag: true //true代表允许回车，false代表不允许回车，避免重复提交
    };
  },
  methods: {
    sendMessage() {
      httpServer.get('/users/applyAuthCode?mobile=' + this.resetPWDForm.mobile).then( res => {
        console.log(res);
        if(res.code === 0){
          this.$message.success('验证码发送成功！');
          this.isDisabled = true;
          this.conutText = this.conutText1 + this.count + this.conutText2;
          this.setTime();
        }else{
          this.$message.error(res.message);
        }
      })
    },
    setTime(){
      this.st = setInterval(() => {
        if(this.count > 0){
          this.count --;
          this.conutText = this.conutText1 + this.count + this.conutText2;
        }else{
          this.stopTime();
        }
      },1000)
    },
    stopTime(){
      clearTimeout(this.st);
      this.conutText = '发送验证码';
      this.count = 10;
      this.isDisabled = false;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          httpServer.patch('/users/resetPassword',this.resetPWDForm).then( res => {
            console.log(res);
            if(res.code === 0){
              this.$message.success("密码已重置为123456");
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({ path: "/signin" });
                }, 1000);
            }else{
              this.$message.error(res.message);
            }
          }).catch( error => {
            this.loading = false;
            this.enterFlag = true;
          })
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.page-title-row {
  margin-top: 200px;
}
.reset-form {
  text-align: center;
  margin-top: 30px;
}
.reset-btn {
  width: 330px;
  margin-left: -10px;
}
</style>