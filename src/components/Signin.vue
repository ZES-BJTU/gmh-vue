<template>
  <div class="signin">
    <el-container>
      <el-main class="main-container">
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="8" :md="6" :lg="5" :xl="3">
            <div class="signin-logo">
              <img src="../assets/images/logo-blue-2.png">
            </div>
            <el-form label-width="0px" :model="signinForm" ref="signinForm" :rules="rules">
              <el-form-item prop="account">
                <el-input class="signin-input" v-model.trim="signinForm.account" placeholder="EMAIL"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input class="signin-input" type="password" v-model.trim="signinForm.password" placeholder="PASSWORD"></el-input>
              </el-form-item>
              <el-row type="flex" justify="center">
                <el-button class="signin-btn" @click="onSubmit('signinForm')">GO</el-button>
              </el-row>
              <el-row type="flex" justify="center">
                <div class="signin-link">
                  忘记密码了？点此
                  <router-link :to="{ path: '/resetPWD' }" class="forget-pwd ">重置密码</router-link>
                </div>
              </el-row>
            </el-form>
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
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://localhost:8080';

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
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$store.dispatch("signin", {
          //   account: this.signinForm.account,
          //   password: this.signinForm.password,
          //   $router: this.$router
          // });
          this.setAccountSession('893074711@qq.com','章琦','123456789');
          this.$router.push({ path: '/home' });
          // axios({
          //   method: 'post',
          //   url: '/user/login',
          //   data: {
          //     'account': this.signinForm.account,
          //     'password': this.signinForm.password
          //   }
          // }).then(function(res){
          //   this.$router.push({ path: '/home' });
          // })
          // .catch(function(err){
          //   console.log(err)
          // })
        } else {
          console.log('error submit!!');
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
  margin-top: 220px;
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
