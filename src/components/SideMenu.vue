<template>
    <div class="SideMenu">
        <el-aside class="home-aside" width="200px">
            <el-row>
                <el-col :span="24">
                    <el-menu :default-active="activeMenu">
                        <router-link to="/store" v-if="role==='管理员'">
                            <el-menu-item index="1" disabled>
                                <i class="el-icon-document"></i>
                                <span slot="title">店铺管理</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/principal" v-if="role==='管理员'">
                            <el-menu-item index="2" disabled>
                                <i class="el-icon-document"></i>
                                <span slot="title">店铺负责人管理</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/chart" v-if="role==='店长'">
                            <el-menu-item index="3" disabled>
                                <i class="el-icon-document"></i>
                                <span slot="title">首页</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/reception" v-if="role==='店长'">
                            <el-menu-item index="4" disabled>
                                <i class="el-icon-document"></i>
                                <span slot="title">前台管理</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/operator" v-if="role==='店长'">
                            <el-menu-item index="5" disabled>
                                <i class="el-icon-document"></i>
                                <span slot="title">操作员管理</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/appointment" v-if="role==='前台'">
                            <el-menu-item index="6" disabled>
                                <i class="el-icon-document"></i>
                                <span slot="title">预约管理</span>
                            </el-menu-item>
                        </router-link>
                    </el-menu>
                </el-col>
            </el-row>
        </el-aside>
    </div>
</template>

<script>
export default {
  name: "SideMenu",
  data() {
    return {};
  },
  computed: {
    role: function() {
      // 管理员 店长 前台 操作员
      return this.getRoleSession();
    },
    activeMenu: function() {
      const route = this.$route.fullPath;
      if( route.match('store') ) {// 管理员-店铺管理
        return "1";
      }else if( route.match('principal') ) {//管理员-店铺负责人管理
        return "2";
      }else if( route.match('chart') ) {// 店长-数据查看
        return "3";
      }else if( route.match('reception') ) {// 店长-前台管理
        return "4";
      }else if( route.match('operator') ) {// 店长-操作员管理
        return "5";
      }else if( route.match('appointment') ) {// 前台-预约管理管理
        return "6";
      }

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.SideMenu{
  position: fixed;
}
</style>