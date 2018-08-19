<template>
  <div class="MemberCardDetail">
    <el-row class="page-title-row">
      <router-link to="/member-card" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">修改会员卡</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="modMemberCardForm" ref="modMemberCardForm" label-width="130px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('modMemberCardForm')" v-loading="loading">
          <el-form-item label="名称" prop="name">
            <el-input v-model.trim="modMemberCardForm.name" :autofocus="true" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="代码" prop="code">
            <el-input v-model.trim="modMemberCardForm.code" placeholder="请输入代码"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input v-model.number="modMemberCardForm.price" placeholder="请输入价格"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select v-model.number="modMemberCardForm.type" placeholder="请选择类型" @change="handleChangeType">
              <el-option v-for="cardType in cardTypes" :key="cardType.value" :label="cardType.name" :value="cardType.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="美容项目" prop="projectId" v-if="modMemberCardForm.type === 1 || modMemberCardForm.type === 3">
            <el-select v-model.number="modMemberCardForm.projectId" placeholder="请选择美容项目">
              <el-option v-for="project in projects" :key="project.id" :label="project.name" :value="project.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="次数" prop="times" v-if="modMemberCardForm.type === 1 || modMemberCardForm.type === 3">
            <el-input v-model.number="modMemberCardForm.times" placeholder="请输入次数"></el-input>
          </el-form-item>
          <el-form-item label="储值卡总额" prop="amount" v-if="modMemberCardForm.type === 2 || modMemberCardForm.type === 3">
            <el-input v-model.number="modMemberCardForm.amount" placeholder="请输入总额"></el-input>
          </el-form-item>
          <el-form-item label="项目折扣(1-100)" prop="projectDiscount">
            <el-input v-model.number="modMemberCardForm.projectDiscount" placeholder="请输入项目折扣"></el-input>
          </el-form-item>
          <el-form-item label="产品折扣(1-100)" prop="productDiscount">
            <el-input v-model.number="modMemberCardForm.productDiscount" placeholder="请输入产品折扣"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model.trim="modMemberCardForm.remark" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('modMemberCardForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "MemberCardDetail",
  data() {
    return {
      modMemberCardForm: {
        id: '',
        name: '',
        code: '',
        price: '',
        type: '',
        projectId: '',
        times: '',
        amount: '',
        projectDiscount: 100,
        productDiscount: 100,
        remark: '',
      },
      rules: {
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        code: [
          { required: true, message: "代码不能为空", trigger: "blur" }
        ],
        price: [
          { required: true, message: "价格不能为空", trigger: "blur" },
          { type: 'number', message: "价格必须是数字", trigger: "blur" }
        ],
        type: [
          { required: true, message: "类别不能为空", trigger: "blur" },
          { type: 'number', message: "类别必须是数字", trigger: "blur" },
        ],
        projectDiscount: [
          { required: true, message: "项目折扣不能为空", trigger: "blur" },
          { type: 'number',min: 1, max: 100, message: "折扣必须是1-100之间的数字", trigger: "blur" },
        ],
        productDiscount: [
          { required: true, message: "产品折扣不能为空", trigger: "blur" },
          { type: 'number',min: 1, max: 100, message: "折扣必须是1-100之间的数字", trigger: "blur" },
        ]
      },
      cardTypes: [
        {
          name: '次卡',
          value: 1
        },
        {
          name: '储值卡',
          value: 2
        },
        {
          name: '混合卡',
          value: 3
        }
      ],
      loading: false,
      enterFlag: true //true代表允许回车，false代表不允许回车，避免重复提交
    };
  },
  computed: {
    projects: function(){
      return this.$store.state.project.projectsAll;
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store.dispatch("modMemberCard", this.modMemberCardForm).then(res => {
              if (res.code === 0) {
                this.$message.success("修改成功");
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({ path: "/member-card" });
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
    handleChangeType(value){
      if( value === 1){
        this.modMemberCardForm.amount = '';
      }else if(value === 2){
        this.modMemberCardForm.times = '';
        this.modMemberCardForm.projectId = '';
      }
    },
    loadProjectAll(){
      this.$store.dispatch("loadProjectAll").then( res => {
        this.loading = false;
        this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    }
  },
  beforeMount: function () {
    if(this.$store.state.memberCard.memberCards.length === 0){
      //如果vuex中没有数据，则返回列表页
      this.$router.push({ path: '/member-card' });
    }else{
      this.loadProjectAll();
      //从vuex中查询该id
      const memberCard = this.$store.getters.getMemberCardById(this.$route.params.id);
      this.modMemberCardForm.id = memberCard.id;
      this.modMemberCardForm.name = memberCard.name;
      this.modMemberCardForm.code = memberCard.code;
      this.modMemberCardForm.price = memberCard.price;
      this.modMemberCardForm.type = memberCard.type;
      this.modMemberCardForm.projectId = memberCard.projectId;
      this.modMemberCardForm.times = memberCard.times;
      this.modMemberCardForm.amount = memberCard.amount;
      this.modMemberCardForm.projectDiscount = Number.parseInt(memberCard.projectDiscount*100);
      this.modMemberCardForm.productDiscount = Number.parseInt(memberCard.productDiscount*100);
      this.modMemberCardForm.remark = memberCard.remark;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>