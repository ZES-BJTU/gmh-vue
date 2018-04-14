<template>
  <div class="CustomerCardBuy">
    <el-row class="page-title-row">
      <router-link to="/customer-card" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">储值换疗程</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="buyCustomerCardForm" ref="buyCustomerCardForm" label-width="110px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('buyCustomerCardForm')" 
          v-loading="loading">
          <el-form-item label="项目" prop="projectId">
            <el-select v-model.number="buyCustomerCardForm.projectId" placeholder="请选择项目" 
              @change="handleProjectChange" filterable>
              <el-option v-for="project in projects" :key="project.id" :label="project.code+'-'+project.name" :value="project.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="次数" prop="projectTimes">
            <el-input-number v-model.number="projectTimes" controls-position="right" :min="1" :disabled="buyCustomerCardForm.projectId === ''" @change="handleTimesChange"></el-input-number>
          </el-form-item>
          <el-form-item label="使用储值" prop="useRemainMoney">
            <el-input v-model.number="buyCustomerCardForm.useRemainMoney"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('buyCustomerCardForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CustomerCardBuy",
  data() {
    return {
      buyCustomerCardForm: {
        cardId: '',
        projectId: '',
        projectTimes: 1,
        useRemainMoney: '',
      },
      rules: {
        projectId: [
          { required: true, message: "项目不能为空", trigger: "blur" },
          { type: "number", message: "项目必须是数字", trigger: "blur" },
        ],
        projectTimes: [
          { required: true, message: "次数不能为空", trigger: "blur" },
          { type: "number", message: "次数必须是数字", trigger: "blur" },
        ],
        useRemainMoney: [
          { required: true, message: "使用储值不能为空", trigger: "blur" },
          { type: "number", message: "使用储值必须是数字", trigger: "blur" },
        ],
      },
      loading: false,
      enterFlag: true, //true代表允许回车，false代表不允许回车，避免重复提交
      project: '',
      projectTimes: 1,
    };
  },
  computed: {
    projects: function(){
      return this.$store.state.project.projectsAll;
    },
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store.dispatch("buyCustomerCard", this.buyCustomerCardForm).then( res => {
            if( res.code === 0){
              this.$message.success('购买成功');
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
    handleTimesChange(val){
      this.buyCustomerCardForm.projectTimes = val;
      this.buyCustomerCardForm.useRemainMoney = this.project.unitPrice * this.buyCustomerCardForm.projectTimes;
    },
    handleProjectChange(val){
      this.project = this.$store.getters.getProjectFromAllById(val);
      this.buyCustomerCardForm.useRemainMoney = this.project.unitPrice * this.buyCustomerCardForm.projectTimes;
    },
    loadProjectAll(){
      this.$store.dispatch("loadProjectAll").then( res => {
        this.loading = false;
      }).catch( err => {
        console.log(err);
      });
    },
  },
  beforeMount: function () {
    if(this.$store.state.customerCard.customerCards.length === 0){
      //如果vuex中没有数据，则返回列表页
      this.$router.push({ path: '/customer-card' });
    }else{
      this.loadProjectAll();
      //从vuex中查询该id
      const customerCard = this.$store.getters.getCustomerCardById(this.$route.params.id);
      this.buyCustomerCardForm.cardId = customerCard.id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>