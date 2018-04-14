<template>
  <div class="CustomerCardCharge">
    <el-row class="page-title-row">
      <router-link to="/customer-card" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">充值</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="chargeCustomerCardForm" ref="chargeCustomerCardForm" label-width="110px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('chargeCustomerCardForm')" 
          v-loading="loading">
          <el-form-item label="充值金额(元)" prop="rechargeMoney">
            <!-- 添加隐藏的input 阻止一个input时的默认回车事件 -->
            <el-input style="display:none;"></el-input>
            <el-input v-model.number="chargeCustomerCardForm.rechargeMoney"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('chargeCustomerCardForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CustomerCardCharge",
  data() {
    return {
      chargeCustomerCardForm: {
        cardId: '',
        rechargeMoney: '',
      },
      rules: {
        rechargeMoney: [
          { required: true, message: "充值金额不能为空", trigger: "blur" },
          { type: "number", message: "充值金额必须是数字", trigger: "blur" },
        ]
      },
      loading: false,
      enterFlag: true //true代表允许回车，false代表不允许回车，避免重复提交
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store.dispatch("chargeCustomerCard", this.chargeCustomerCardForm).then( res => {
            if( res.code === 0){
              this.$message.success('充值成功');
              setTimeout(() => {
                this.loading = false;
                this.$router.push({ path: '/customer-card' });
              },2000)
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
    },
  },
  beforeMount: function () {
    if(this.$store.state.customerCard.customerCards.length === 0){
      //如果vuex中没有数据，则返回列表页
      this.$router.push({ path: '/customer-card' });
    }else{
      //从vuex中查询该id
      const customerCard = this.$store.getters.getCustomerCardById(this.$route.params.id);
      this.chargeCustomerCardForm.cardId = customerCard.id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>