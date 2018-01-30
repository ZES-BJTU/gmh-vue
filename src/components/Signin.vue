<template>
<div class="signin">
  <el-container>
    <el-main class="main-container">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="8" :md="6" :lg="4" :xl="3">
          <div class="signin-logo">
            <img src="../assets/images/logo-blue-2.png">
          </div>
          <el-form label-width="0px" :model="signinForm">
            <el-form-item>
              <el-input class="signin-input" v-model="signinForm.email" placeholder="EMAIL"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input class="signin-input" v-model="signinForm.password" placeholder="PASSWORD"></el-input>
            </el-form-item>
             <el-row type="flex" justify="center">
                    <el-button class="signin-btn" @click="onSubmit">GO</el-button>
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
  export default {
    name: 'Signin',
    data() {
      return {
        signinForm: {
          email: '',
          password: '',
        },
      }
    },
    methods: {
        onSubmit(){
            this.$router.push('/Home');
        }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .main-container{
        margin-top: 200px;
    }
    .signin-logo{
        text-align: center;
        margin-bottom: 15px;
        img{
            width: 7em;
        }
    }
    .footer{
        position: absolute;
        width: 100%;
        bottom: 30px;
        text-align: center;
        color:#909090;
        a{
            text-decoration:underline;
            color: #5d5d5d;
        }
    }
</style>
