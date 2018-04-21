<template>
  <div class="ProductAmountConvertEach">
    <el-row class="page-title-row">
      <router-link to="/product-amount" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">产品库存转化</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="convertForm" ref="convertForm" label-width="110px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('convertForm')" v-loading="loading">
          <el-form-item label="类型" prop="type">
            <el-select v-model.number="convertForm.type" placeholder="请选择类型" filterable>
              <el-option v-for="convertType in convertTypes" :key="convertType.value" :label="convertType.name" :value="convertType.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品" prop="productId">
            <el-select v-model.number="convertForm.productId" placeholder="请输入关键词">
              <el-option v-for="product in productsStoreAll" :key="product.id" :label="product.code+'-'+product.name" :value="product.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品数量" prop="productAmount">
            <el-input v-model.number="convertForm.productAmount" placeholder="请输入产品数量"></el-input>
          </el-form-item>
          <el-form-item label="库存" prop="stockId">
            <el-select v-model.number="convertForm.stockId" placeholder="请输入关键词" filterable>
              <el-option v-for="stock in stocksStoreAll" :key="stock.id" :label="stock.code+'-'+stock.name" :value="stock.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="库存数量" prop="stockAmount">
            <el-input v-model.number="convertForm.stockAmount" placeholder="请输入库存数量"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('convertForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ProductAmountConvertEach",
  data() {
    return {
      convertForm: {
        type: '',
        productId: '',
        productAmount: '',
        stockId: '',
        stockAmount: '',
      },
      rules: {
        productId: [
          { required: true, message: "产品不能为空", trigger: "blur" },
          { type: "number", message: "产品必须是数字", trigger: "blur" },
        ],
        productAmount: [
          { required: true, message: "产品数量不能为空", trigger: "blur" },
          { type: "number", message: "产品数量必须是数字", trigger: "blur" },
        ],
        stockId: [
          { required: true, message: "库存不能为空", trigger: "blur" },
          { type: "number", message: "库存必须是数字", trigger: "blur" },
        ],
        stockAmount: [
          { required: true, message: "库存数量不能为空", trigger: "blur" },
          { type: "number", message: "库存数量必须是数字", trigger: "blur" },
        ],
      },
      convertTypes: [
        {
          name: '产品转库存',
          value: '1'
        },
        {
          name: '库存转产品',
          value: '2'
        },
      ],
      loading: false,
      enterFlag: true //true代表允许回车，false代表不允许回车，避免重复提交
    };
  },
  computed: {
    productsStoreAll: function(){
      return this.$store.state.product.productsStoreAll;
    },
    stocksStoreAll: function(){
      return this.$store.state.stock.stocksStoreAll;
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store.dispatch("convertEach", this.convertForm).then(res => {
              if (res.code === 0) {
                this.$message.success("转化成功");
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
    loadData(){
      this.$store.dispatch("loadProductStoreAll").then( res => { return Promise.resolve(1) } )
        .then(res => {
          this.$store.dispatch("loadStockStoreAll");
        })
    }
  },
  beforeMount: function () {
    this.loadData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>