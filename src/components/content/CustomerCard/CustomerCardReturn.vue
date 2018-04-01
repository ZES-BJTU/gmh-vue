<template>
  <div class="CustomerCardReturn">
    <el-row class="page-title-row">
      <router-link to="/customer-card" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">退卡</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="returnCustomerCardForm" ref="returnCustomerCardForm" label-width="110px" 
          @keyup.enter.native="enterFlag && onSubmit('returnCustomerCardForm')" 
          v-loading="loading">
          <el-form-item label="退卡原因" prop="returnedReason">
            <el-input v-model.trim="returnCustomerCardForm.returnedReason" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="退卡金额(元)" prop="returnedMoney">
            <el-input v-model="returnCustomerCardForm.returnedMoney"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('returnCustomerCardForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CustomerCardReturn",
  data() {
    return {
      returnCustomerCardForm: {
        id: '',
        returnedReason: '',
        returnedMoney: '',
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
          this.$store.dispatch("returnCustomerCard", this.returnCustomerCardForm).then( res => {
            if( res.code === 0){
              this.$message.success('退卡成功');
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
      this.returnCustomerCardForm.id = customerCard.id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>