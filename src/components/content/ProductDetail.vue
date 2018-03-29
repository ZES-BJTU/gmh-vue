<template>
  <div class="ProductDetail">
    <el-row class="page-title-row">
      <router-link to="/product" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">编辑产品</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="modProductForm" ref="modProductForm" label-width="110px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('modProductForm')" 
          v-loading="loading">
          <el-form-item label="名称" prop="name">
            <el-input v-model.trim="modProductForm.name" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="编码" prop="code">
            <el-input v-model.number="modProductForm.code" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="所属产品分类" prop="productTypeId">
            <el-select v-model.number="modProductForm.productTypeId" placeholder="请选择产品分类">
              <el-option v-for="productType in productTypes" :key="productType.id" :label="productType.name" :value="productType.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计量单位名称" prop="unitName">
            <el-input v-model.trim="modProductForm.unitName" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="单价(元)" prop="unitName">
            <el-input v-model.trim="modProductForm.unitPrice" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('modProductForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ProductDetail",
  data() {
    return {
      modProductForm: {
        id: '',
        name: '',
        code: '',
        productTypeId: '',
        unitName: '',
        unitPrice: ''
      },
      rules: {
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        code: [
          { required: true, message: "编码不能为空", trigger: "blur" },
          { type: 'number', message: "编码必须是数字", trigger: "blur" }
        ],
        stockTypeId: [
          { required: true, message: "产品分类不能为空", trigger: "blur" },
          { type: 'number', message: "产品分类必须是数字", trigger: "blur" }
        ],
        unitName: [
          { required: true, message: "计量单位名称不能为空", trigger: "blur" }
        ],
        unitPrice: [
          { required: true, message: "单价不能为空", trigger: "blur" },
          { type: 'number', message: "单价必须是数字", trigger: "blur" }
        ],
      },
      loading: false,
      enterFlag: true //true代表允许回车，false代表不允许回车，避免重复提交
    };
  }, 
  computed: {
    productTypes: function(){
      return this.$store.state.productType.productTypesAll;
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store.dispatch("modProduct", this.modProductForm).then( res => {
            if( res.code === 0){
              this.$message.success('修改成功');
              setTimeout(() => {
                this.loading = false;
                this.$router.push({ path: '/product' });
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
    },
    loadProductTypeAll(){
      this.$store.dispatch("loadProductTypeAll").then( res => {
        this.loading = false;
        this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    }
  },
  beforeMount: function () {
    if(this.$store.state.product.products.length === 0){
      //如果vuex中没有数据，则返回列表页
      this.$router.push({ path: '/product' });
    }else{
      this.loadProductTypeAll();
      //从vuex中查询该id
      const product = this.$store.getters.getProductById(this.$route.params.id);
      this.modProductForm.id = product.id;
      this.modProductForm.name = product.name;
      this.modProductForm.code = Number.parseInt(product.code);
      this.modProductForm.productTypeId = product.productTypeId;
      this.modProductForm.unitName = product.unitName;
      this.modProductForm.unitPrice = product.unitPrice;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>