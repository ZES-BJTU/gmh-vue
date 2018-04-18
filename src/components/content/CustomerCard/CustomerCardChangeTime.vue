<template>
  <div class="CustomerCardChangeTime">
    <el-row class="page-title-row">
      <router-link to="/customer-card" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">改期</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="changeTimeCustomerCardForm" ref="changeTimeCustomerCardForm" label-width="110px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('changeTimeCustomerCardForm')" 
          v-loading="loading">
          <el-form-item label="有效期" prop="validDate">
            <!-- 添加隐藏的input 阻止一个input时的默认回车事件 -->
            <el-date-picker v-model="changeTimeCustomerCardForm.validDate" align="center" 
              type="date" :editable="false" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('changeTimeCustomerCardForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CustomerCardChangeTime",
  data() {
    return {
      changeTimeCustomerCardForm: {
        id: '',
        validDate: '',
      },
      rules: {
        validDate: [
          { required: true, message: "日期不能为空", trigger: "blur" },
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
          this.$store.dispatch("chargeTimeCustomerCard", {
            'id': this.changeTimeCustomerCardForm.id,
            'validDate': this.toTimeStamp(this.changeTimeCustomerCardForm.validDate)
          }).then( res => {
            if( res.code === 0){
              this.$message.success('改期成功');
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
      this.changeTimeCustomerCardForm.id = customerCard.id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>