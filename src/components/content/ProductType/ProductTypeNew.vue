<template>
  <div class="ProductTypeNew">
    <el-row class="page-title-row">
      <router-link to="/product-type" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">新建产品分类</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="newProductTypeForm" ref="newProductTypeForm" label-width="80px" :rules="rules" @keyup.enter.native="enterFlag && onSubmit('newProductTypeForm')" v-loading="loading">
          <el-form-item label="名称" prop="name">
            <!-- 添加隐藏的input 阻止一个input时的默认回车事件 -->
            <el-input style="display:none;"></el-input>
            <el-input v-model.trim="newProductTypeForm.name" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('newProductTypeForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ProductTypeNew",
  data() {
    return {
      newProductTypeForm: {
        name: "",
      },
      rules: {
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ]
      },
      loading: false,
      enterFlag: true //true代表允许回车，false代表不允许回车，避免重复提交
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store
            .dispatch("addProductType", this.newProductTypeForm)
            .then(res => {
              if (res.code === 0) {
                this.$message.success("添加成功");
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({ path: "/product-type" });
                }, 1000);
              }
            })
            .catch(err => {
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