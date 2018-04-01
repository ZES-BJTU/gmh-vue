<template>
  <div class="CustomerCardChangeStore">
    <el-row class="page-title-row">
      <router-link to="/customer-card" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">转店</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="changeStoreCustomerCardForm" ref="changeStoreCustomerCardForm" label-width="110px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('changeStoreCustomerCardForm')" 
          v-loading="loading">
          <el-form-item label="转店原因" prop="turnedReason">
            <el-input v-model.trim="changeStoreCustomerCardForm.turnedReason" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="转店金额(元)" prop="turnedMoney">
            <el-input v-model.number="changeStoreCustomerCardForm.turnedMoney"></el-input>
          </el-form-item>
          <el-form-item label="转到店铺" prop="newStoreId">
            <el-select v-model.number="changeStoreCustomerCardForm.newStoreId" filterable 
              placeholder="请输入店铺名">
              <el-option v-for="store in stores" :key="store.id" :label="store.name" :value="store.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('changeStoreCustomerCardForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CustomerCardChangeStore",
  data() {
    return {
      changeStoreCustomerCardForm: {
        id: '',
        turnedReason: '',
        turnedMoney: '',
        newStoreId: ''
      },
      rules: {
        turnedMoney: [
          { required: true, message: "退卡金额不能为空", trigger: "blur" },
          { type: "number", message: "退卡金额必须是数字", trigger: "blur" },
        ],
        newStoreId: [
          { required: true, message: "店铺不能为空", trigger: "blur" },
          { type: 'number', message: "库店铺必须是数字", trigger: "blur" }
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store.dispatch("changeStoreCustomerCard", this.changeStoreCustomerCardForm).then( res => {
            if( res.code === 0){
              this.$message.success('转店成功');
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
    loadStoreAll(){
      this.$store.dispatch("loadStoreAll").then( res => {
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
      this.loadStoreAll();
      //从vuex中查询该id
      const customerCard = this.$store.getters.getCustomerCardById(this.$route.params.id);
      this.changeStoreCustomerCardForm.id = customerCard.id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>