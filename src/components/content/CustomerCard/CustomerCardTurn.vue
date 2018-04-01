<template>
  <div class="CustomerCardTurn">
    <el-row class="page-title-row">
      <router-link to="/customer-card" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">转卡</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="turnCustomerCardForm" ref="turnCustomerCardForm" label-width="110px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('turnCustomerCardForm')" 
          v-loading="loading">
          <el-form-item label="转卡原因" prop="turnedReason">
            <el-input v-model.trim="turnCustomerCardForm.turnedReason" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="转卡金额(元)" prop="turnedMoney">
            <el-input v-model.number="turnCustomerCardForm.turnedMoney"></el-input>
          </el-form-item>
          <el-form-item label="新会员卡卡" prop="newCardId">
            <el-select v-model.number="turnCustomerCardForm.newCardId" filterable 
              placeholder="请输入卡名">
              <el-option v-for="memberCard in memberCards" :key="memberCard.id" :label="memberCard.name" :value="memberCard.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('turnCustomerCardForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CustomerCardTurn",
  data() {
    return {
      turnCustomerCardForm: {
        id: '',
        turnedReason: '',
        turnedMoney: '',
        newCardId: ''
      },
      rules: {
        turnedMoney: [
          { required: true, message: "退卡金额不能为空", trigger: "blur" },
          { type: "number", message: "退卡金额必须是数字", trigger: "blur" },
        ],
        newCardId: [
          { required: true, message: "会员卡不能为空", trigger: "blur" },
          { type: 'number', message: "会员卡必须是数字", trigger: "blur" }
        ],
      },
      loading: false,
      enterFlag: true //true代表允许回车，false代表不允许回车，避免重复提交
    };
  },
  computed: {
    memberCards: function(){
      return this.$store.state.memberCard.memberCardsAll;
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store.dispatch("turnCustomerCard", this.turnCustomerCardForm).then( res => {
            if( res.code === 0){
              this.$message.success('转卡成功');
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
    loadMemberCardAll(){
      this.$store.dispatch("loadMemberCardAll").then( res => {
        this.loading = false;
        // this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    }
  },
  beforeMount: function () {
    if(this.$store.state.customerCard.customerCards.length === 0){
      //如果vuex中没有数据，则返回列表页
      this.$router.push({ path: '/customer-card' });
    }else{
      this.loadMemberCardAll();
      //从vuex中查询该id
      const customerCard = this.$store.getters.getCustomerCardById(this.$route.params.id);
      this.turnCustomerCardForm.id = customerCard.id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>