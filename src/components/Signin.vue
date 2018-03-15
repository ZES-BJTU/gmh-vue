<template>
  <div class="signin">
    <el-container>
      <el-main class="main-container">
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="8" :md="6" :lg="5" :xl="3">
            <div class="signin-logo">
              <img src="../assets/images/logo-blue-2.png">
            </div>
            <el-form label-width="0px" :model="signinForm" ref="signinForm" :rules="rules" @keyup.enter.native="onSubmit('signinForm')" v-loading="loading">
              <el-form-item prop="account">
                <el-input class="signin-input" v-model.trim="signinForm.account" placeholder="EMAIL" :autofocus="true"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input class="signin-input" type="password" v-model.trim="signinForm.password" placeholder="PASSWORD"></el-input>
              </el-form-item>
              <el-row type="flex" justify="center">
                <el-button class="signin-btn" @click="onSubmit('signinForm')">GO</el-button>
              </el-row>
            </el-form>
            <el-row type="flex" justify="center">
              <div class="signin-link">
                忘记密码了？点此
                <router-link to="/resetpwd" class="forget-pwd ">重置密码</router-link>
              </div>
            </el-row>
          </el-col>
        </el-row>
      </el-main>
      <el-footer class="footer">
        <div>管理系统版权归北京光美焕科技有限责任公司所有</div>
        <div>
          <a target="_blank" href="http://www.brandnew-gmh.com">www.brandnew-gmh.com</a>
        </div>
      </el-footer>
    </el-container>
  </div>

</template>

<script>
import axios from 'axios'
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.baseURL = 'http://localhost:8080';

export default {
  name: "Signin",
  data() {
    return {
      signinForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      },
      loading: false
    };
  },
  methods: {
    onSubmit: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$store.dispatch("signin", {
          //   account: this.signinForm.account,
          //   password: this.signinForm.password,
          //   $router: this.$router
          // });
          this.loading = true;
          this.$http({
            method: 'post',
            url: '/users/login',
            data: {
              'account': this.signinForm.account,
              'password': this.signinForm.password
            }
          }).then( res => {
            this.loading = false;
            if( res.data.code === 0){
              this.loading = false;
              const data = res.data.data;
              this.setAccountSession(data.role,data.account,data.name,data.token);
              if(data.role==='管理员'){
                  this.$router.push({ path: '/store' });
              }else if (data.role==='店长'){
                  this.$router.push({ path: '/chart' });
              }else if (data.role==='前台'){
                  this.$router.push({ path: '/appointment' });
              }else if (data.role==='操作员'){
                  this.$router.push({ path: '/time' });
              }
            }
          }).catch( error => {
            this.loading = false;
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
.main-container {
  margin-top: 160px;
}
.signin-logo {
  text-align: center;
  margin-bottom: 15px;
  img {
    width: 14em;
  }
}
.signin-link {
  margin-top: 20px;
  .forget-pwd {
    color: #7bcad9;
  }
}
.footer {
  position: absolute;
  width: 100%;
  bottom: 30px;
  text-align: center;
  color: #909090;
  a {
    text-decoration: underline;
    color: #5d5d5d;
  }
}
</style>
