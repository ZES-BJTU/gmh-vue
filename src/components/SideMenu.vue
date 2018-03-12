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
                        <router-link to="/storeowner" v-if="role==='管理员'">
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
                        <router-link to="/appointment" v-if="role==='前台'">
                            <el-menu-item index="4" disabled>
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
      return this.getRoleSession();
    },
    activeMenu: function() {
      if (this.role === "管理员") {
        return "1";
      } else if (this.role === "店长") {
        return "3";
      } else if (this.role === "前台") {
        return "4";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>