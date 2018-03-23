<template>
  <div class="StockDetail">
    <el-row class="page-title-row">
      <router-link to="/stock" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">编辑库存</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="modStockForm" ref="modStockForm" label-width="110px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('modStockForm')" 
          v-loading="loading">
          <el-form-item label="名称" prop="name">
            <el-input v-model.trim="modStockForm.name" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="编码" prop="code">
            <el-input v-model.number="modStockForm.code" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="所属库存分类" prop="stockTypeId">
            <el-select v-model.number="modStockForm.stockTypeId" placeholder="请选择库存分类">
              <el-option v-for="stockType in stockTypes" :key="stockType.id" :label="stockType.name" :value="stockType.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计量单位名称" prop="unitName">
            <el-input v-model.trim="modStockForm.unitName" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('modStockForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "StockDetail",
  data() {
    return {
      modStockForm: {
        id: '',
        name: '',
        code: '',
        stockTypeId: '',
        unitName: ''
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
          { required: true, message: "库存分类不能为空", trigger: "blur" },
          { type: 'number', message: "库存分类必须是数字", trigger: "blur" }
        ],
        unitName: [
          { required: true, message: "计量单位名称不能为空", trigger: "blur" }
        ],
      },
      loading: false,
      enterFlag: true //true代表允许回车，false代表不允许回车，避免重复提交
    };
  }, 
  computed: {
    stockTypes: function(){
      return this.$store.state.stockType.stockTypesAll;
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store.dispatch("modStock", this.modStockForm).then( res => {
            if( res.code === 0){
              this.$message.success('修改成功');
              setTimeout(() => {
                this.loading = false;
                this.$router.push({ path: '/stock' });
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
    loadStockTypeAll(){
      this.$store.dispatch("loadStockTypeAll").then( res => {
        this.loading = false;
        this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    }
  },
  beforeMount: function () {
    if(this.$store.state.stock.stocks.length === 0){
      //如果vuex中没有数据，则返回列表页
      this.$router.push({ path: '/stock' });
    }else{
      this.loadStockTypeAll();
      //从vuex中查询该id
      const stock = this.$store.getters.getStockById(this.$route.params.id);
      this.modStockForm.id = stock.id;
      this.modStockForm.name = stock.name;
      this.modStockForm.code = Number.parseInt(stock.code);
      this.modStockForm.stockTypeId = stock.stockTypeId;
      this.modStockForm.unitName = stock.unitName;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>