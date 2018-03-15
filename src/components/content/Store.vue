<template>
  <div class="Store">
    <el-form :inline="true" :model="storeSearch" class="demo-form-inline search-form">
      <el-form-item>
        <el-input v-model="storeSearch.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchStore" icon="el-icon-search" class="search-btn">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="operate-box">
      <router-link to="/store/new">
        <el-button type="primary" icon="el-icon-plus">新建</el-button>
      </router-link>
    </div>
    <el-table :data="tableData" fixed style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="1000">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Store",
  data() {
    return {
      storeSearch: {
        content: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  computed: {},
  methods: {
    // signout: function() {
    //     this.clearAccountSession();
    //     this.$router.push({ path: '/Signin' });
    // }
    searchStore: () => {
      alert(1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>