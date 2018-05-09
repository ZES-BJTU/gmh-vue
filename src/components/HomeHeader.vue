<template>
    <div class="HomeHeader">
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">
            <img class="header-logo" src="../assets/images/logo-blue-2.png" alt="">
            <router-link to="/"><span style="font-size:14px;">光美焕</span></router-link>
          </el-menu-item>
          <el-submenu index="2" class="account-item">
              <template slot="title"><span style="font-size:14px;">{{name}}</span></template>
              <router-link to="/modpwd">
								<el-menu-item index="2-1">
                  <span style="font-size:14px;">修改密码</span>
                </el-menu-item>
							</router-link>
              <el-menu-item index="2-3" @click="signout"><span style="font-size:14px;">退出登录</span></el-menu-item>
          </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import httpServer from '@/lib/axios'

export default {
  name: "HomeHeader",
  data() {
    return {};
  },
  computed: {
    name: function() {
      return this.getNameSession();
    }
  },
  methods: {
    signout: function() {
      httpServer.del('/users/logout').then( res => {
        this.clearAccountSession();
        this.$message.success('退出成功');
        this.$router.push({ path: "/signin" });
      }).catch( error => {
        console.log(error);
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.HomeHeader{
  position: fixed;
  z-index: 999;
  width: calc(100% - 40px);
  .header-logo{
    width: 60px;
    margin-left: -20px;
  }
}
.account-item {
  float: right;
}
</style>