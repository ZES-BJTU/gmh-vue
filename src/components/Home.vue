<template>
  <div class="home">
    <el-container>
      <el-header>
        <home-header></home-header>
      </el-header>
      <el-container class="home-container">
        <side-menu></side-menu>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomeHeader from './HomeHeader'
import SideMenu from './SideMenu'
export default {
  name: "Home",
  data() {
    return {
      activeIndex: "1"
    };
  },
  computed: {
    name: function(){
      return this.getNameSession();
    }
  },
  components: {HomeHeader, SideMenu}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.account-item{
  float: right;
}
.home-container {
  margin-top: 1px;
}
.el-main{
  height: 500px;
  // background-color: gray;
}
.el-footer{
  // background-color: red;
  position: fixed;
  bottom: 0px;
  width: calc(100% - 200px);
  text-align: center;
  line-height: 60px;
}
</style>
