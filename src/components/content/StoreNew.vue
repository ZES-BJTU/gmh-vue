[]<template>
  <div class="StoreNew">
    <el-row class="page-title-row">
      <router-link to="/store" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">新建店铺</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="newStoreform" :rules="rules" ref="newStoreform" label-width="80px" @keyup.enter.native="onSubmit('newStoreform')" v-loading="loading">
          <el-form-item label="店铺名称" prop="name">
            <el-input v-model="newStoreform.name" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="店铺地址" prop="address">
            <el-input v-model="newStoreform.address"></el-input>
          </el-form-item>
          <el-form-item label="店铺电话">
            <el-input v-model="newStoreform.phone"></el-input>
          </el-form-item>
          <el-form-item label="店铺备注">
            <el-input v-model="newStoreform.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="onSubmit('newStoreform')">新建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "StoreNew",
  data() {
    return {
      newStoreform: {
        name: "",
        address: "",
        phone: "",
        remark: ""
      },
      rules: {
        name: [
          { required: true, message: "店铺名称不能为空", trigger: "blur" }
        ],
        address: [
          { required: true, message: "店铺地址不能为空", trigger: "blur" }
        ]
      },
      loading: false
    };
  },
  computed: {},
  methods: {
    onSubmit: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.$store.dispatch("signin", {
          //   account: this.signinForm.account,
          //   password: this.signinForm.password,
          //   $router: this.$router
          // });
          this.loading = true;
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

</style>