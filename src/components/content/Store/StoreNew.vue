<template>
  <div class="StoreNew">
    <el-row class="page-title-row">
      <router-link to="/store" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">新建店铺</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="newStoreForm" ref="newStoreForm" label-width="80px" :rules="rules" @keyup.enter.native="enterFlag && onSubmit('newStoreForm')" v-loading="loading">
          <el-form-item label="店铺名称" prop="name">
            <el-input v-model.trim="newStoreForm.name" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="店铺地址" prop="address">
            <el-input v-model.trim="newStoreForm.address"></el-input>
          </el-form-item>
          <el-form-item label="店铺电话">
            <el-input v-model.trim="newStoreForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="店铺备注">
            <el-input v-model.trim="newStoreForm.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="onSubmit('newStoreForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import httpServer from '@/lib/axios'
export default {
  name: "StoreNew",
  data() {
    return {
      newStoreForm: {
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
      loading: false,
      enterFlag: true//true代表允许回车，false代表不允许回车，避免重复提交
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store.dispatch("addStore", this.newStoreForm).then( res => {
            if( res.code === 0){
              this.$message.success('添加成功');
              setTimeout(() => {

                this.loading = false;
                this.$router.push({ path: '/store' });
              },1000)
            }
          }).catch( err => {
            this.loading = false;
            this.enterFlag = true;
            console.log(err);
          });
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