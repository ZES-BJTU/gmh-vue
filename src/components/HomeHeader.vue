<template>
    <div class="HomeHeader">
        <el-menu class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">光美焕</el-menu-item>
            <el-submenu index="2" class="account-item">
                <template slot="title">{{name}}</template>
                <el-menu-item index="2-1">修改密码</el-menu-item>
                <el-menu-item index="2-3" @click="signout">退出登录</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
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
        this.clearAccountSession();
        this.$router.push({ path: '/Signin' });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.account-item {
  float: right;
}
</style>