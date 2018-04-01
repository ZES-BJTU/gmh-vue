<template>
  <div class="ResetPWD">
    <el-row class="page-title-row">
      <span class="page-title">修改密码</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="resetPWDForm" ref="resetPWDForm" label-width="110px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('resetPWDForm')" v-loading="loading">
          <el-form-item label="旧密码" prop="originalPassword">
            <el-input v-model.trim="resetPWDForm.originalPassword" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model.trim="resetPWDForm.newPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('resetPWDForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ResetPWD",
  data() {
    return {
      resetPWDForm: {
        originalPassword: '',
        newPassword: ''
      },
      rules: {
        originalPassword: [
          { required: true, message: "旧密码不能为空", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" }
        ],
      },
      loading: false,
      enterFlag: true //true代表允许回车，false代表不允许回车，避免重复提交
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store.dispatch("modPWD", this.resetPWDForm).then(res => {
              if (res.code === 0) {
                this.$message.success("修改成功,请重新登录");
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({ path: "/signin" });
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>