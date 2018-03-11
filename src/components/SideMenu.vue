<template>
    <div class="SideMenu">
        <el-aside class="home-aside" width="200px">
            <el-row>
                <el-col :span="24">
                    <el-menu>
                        <router-link to="/home/store">
                            <el-menu-item index="1" disabled>
                                <i class="el-icon-document"></i>
                                <span slot="title">店铺管理</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/home/storeowner">
                            <el-menu-item index="2" disabled>
                                <i class="el-icon-document"></i>
                                <span slot="title">店铺负责人管理</span>
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
    name: function() {
      return this.getNameSession();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>