<template>
  <div class="CRProduct">
    <el-dialog title="产品" :visible.sync="isVisible" :show-close="false"
      :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form :model="productParams" ref="productParams" :rules="rules">
          <el-form-item prop="productId">
            <el-select v-model.number="productParams.productId" filterable 
              placeholder="请输入关键词">
              <el-option v-for="product in products" :key="product.id" :label="product.name+'('+product.unitName+')'" :value="product.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="amount">
            <el-input v-model.number="productParams.amount" placeholder="请输入数量"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose('productParams')">取 消</el-button>
        <el-button type="primary" @click="onSubmit('productParams')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CRProduct",
  props: ['visible'],
  data() {
    return {
      productParams: {
        productId: '',
        amount: ''
      },
      rules: {
        productId: [
          { required: true, message: "产品不能为空", trigger: "blur" },
          { type: 'number', message: "产品必须是数字", trigger: "blur" }
        ],
        amount: [
          { required: true, message: "数量不能为空", trigger: "blur" },
          { type: 'number', message: "数量必须是数字", trigger: "blur" }
        ]
      },
      
    }
  },
  computed: {
    isVisible: function(){
      return this.visible;
    },
    products: function(){
      return this.$store.state.product.productsAll;
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('addCRProduct', this.productParams);
          this.$emit('closeDialog', false);
          this.$refs[formName].resetFields();
        } else {
          return false;
        }
      });
    },
    onClose(formName){
      this.$emit('closeDialog', false);
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>