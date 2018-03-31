<template>
  <div class="ProjectStock">
    <el-dialog title="项目消耗品" :visible.sync="isVisible" :show-close="false"
      :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form :model="projectStockParams" ref="projectStockParams" :rules="rules">
          <el-form-item prop="stockId">
            <el-select v-model.number="projectStockParams.stockId" filterable 
              placeholder="请输入关键词">
              <el-option v-for="stock in stocks" :key="stock.id" :label="stock.name+'('+stock.unitName+')'" :value="stock.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="stockConsumptionAmount">
            <el-input v-model.number="projectStockParams.stockConsumptionAmount" placeholder="请输入数量"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose('projectStockParams')">取 消</el-button>
        <el-button type="primary" @click="onSubmit('projectStockParams')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ProjectStock",
  props: ['visible'],
  data() {
    return {
      projectStockParams: {
        stockId: '',
        stockConsumptionAmount: ''
      },
      rules: {
        stockId: [
          { required: true, message: "库存不能为空", trigger: "blur" },
          { type: 'number', message: "库存必须是数字", trigger: "blur" }
        ],
        stockConsumptionAmount: [
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
    stocks: function(){
      return this.$store.state.stock.stocksAll;
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('addProjectStock', this.projectStockParams);
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