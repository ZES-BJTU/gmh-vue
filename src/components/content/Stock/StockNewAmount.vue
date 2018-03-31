<template>
  <div class="StockNewAmount">
    <el-row class="page-title-row">
      <router-link to="/stock" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">首次进货</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="newStockAmountForm" ref="newStockAmountForm" label-width="110px" :rules="rules" @keyup.enter.native="enterFlag && onSubmit('newStockAmountForm')" v-loading="loading">
          <el-form-item label="进货数量" prop="amount">
            <!-- 添加隐藏的input 阻止一个input时的默认回车事件 -->
            <el-input style="display:none;"></el-input>
            <el-input v-model.number="newStockAmountForm.amount" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('newStockAmountForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "StockNewAmount",
  data() {
    return {
      newStockAmountForm: {
        stockId: '',
        amount: '',
      },
      rules: {
        amount: [
          { required: true, message: "进货数量不能为空", trigger: "blur" },
          { type: "number", message: "进货数量必须是数字", trigger: "blur" },
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
          this.$store.dispatch("addStockAmount", this.newStockAmountForm).then(res => {
              if (res.code === 0) {
                this.$message.success("首次进货成功");
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({ path: "/stock" });
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
  },
  beforeMount: function () {
    if(this.$store.state.stock.stocks.length === 0){
      //如果vuex中没有数据，则返回列表页
      this.$router.push({ path: '/stock' });
    }else{
      //从vuex中查询该id
      const stock = this.$store.getters.getStockById(this.$route.params.id);
      this.newStockAmountForm.stockId = stock.id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>