<template>
  <div class="StoreDetail">
    <el-row class="page-title-row">
      <router-link to="/store" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">编辑店铺</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="modStoreForm" :rules="rules" ref="modStoreForm" label-width="80px" @keyup.enter.native="onSubmit('modStoreForm')" v-loading="loading">
          <el-form-item label="店铺名称" prop="name">
            <el-input v-model.trim="modStoreForm.name" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="店铺地址" prop="address">
            <el-input v-model.trim="modStoreForm.address"></el-input>
          </el-form-item>
          <el-form-item label="店铺电话">
            <el-input v-model.trim="modStoreForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="店铺备注">
            <el-input v-model.trim="modStoreForm.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="onSubmit('modStoreForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "StoreDetail",
  data() {
    return {
      modStoreForm: {
        id: 0,
        name: '',
        addreee: '',
        phone: '',
        remark: ''
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
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch("modStore", this.modStoreForm).then( res => {
            if( res.code === 0){
              this.$message.success('修改成功');
              setTimeout(() => {
                this.loading = false;
                this.$router.push({ path: '/store' });
              },2000)
            }
          }).catch( err => {
            this.loading = false;
            console.log(err);
          });
        } else {
          return false;
        }
      });
    }
  },
  beforeMount: function () {
    if(this.$store.state.store.stores.length === 0){
      //如果vuex中没有数据，则返回列表页
      this.$router.push({ path: '/store' });
    }else{
      //从vuex中查询该id
      this.modStoreForm = this.$store.getters.getStoreById(this.$route.params.id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>