<template>
  <div class="ProductAmountConvert">
    <el-row class="page-title-row">
      <router-link to="/product-amount" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">转店</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="convertProductAmountForm" ref="convertProductAmountForm" label-width="110px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('convertProductAmountForm')" v-loading="loading">
          <el-form-item label="转化数量" prop="amount">
            <el-input v-model.number="convertProductAmountForm.amount" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="店铺">
            <el-select v-model="convertProductAmountForm.toStoreId" placeholder="请选择店铺">
              <el-option v-for="store in stores" :key="store.id" :label="store.name" :value="store.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('convertProductAmountForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ProductAmountConvert",
  data() {
    return {
      convertProductAmountForm: {
        productId: '',
        amount: '',
        toStoreId: ''
      },
      rules: {
        amount: [
          { required: true, message: "数量不能为空", trigger: "blur" },
          { type: "number", message: "数量必须是数字", trigger: "blur" },
        ],
        toStoreId: [
          { required: true, message: "店铺不能为空", trigger: "blur" },
          { type: "number", message: "店铺必须是数字", trigger: "blur" },
        ],
      },
      loading: false,
      enterFlag: true //true代表允许回车，false代表不允许回车，避免重复提交
    };
  },
  computed: {
    stores: function(){
      return this.$store.state.store.storesAll;
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store.dispatch("convertProductAmount", this.convertProductAmountForm).then(res => {
              if (res.code === 0) {
                this.$message.success("转店成功");
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({ path: "/product-amount" });
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
    },
    loadStoreAll(){
      this.$store.dispatch('loadStoreAll',this.convertProductAmountForm);
    },
  },
  beforeMount: function () {
    if(this.$store.state.productAmount.productAmounts.length === 0){
      //如果vuex中没有数据，则返回列表页
      this.$router.push({ path: '/product-amount' });
    }else{
      this.loadStoreAll();
      //从vuex中查询该id
      const productAmount = this.$store.getters.getProductAmountByPAId(this.$route.params.id);
      this.convertProductAmountForm.productId = productAmount.id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>