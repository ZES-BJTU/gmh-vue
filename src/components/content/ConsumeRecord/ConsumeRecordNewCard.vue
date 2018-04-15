<template>
  <div class="ConsumeRecordNewCard">
    <el-row class="page-title-row">
      <router-link to="/consume-record-card" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">办卡</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="18" :md="12">
        <el-form class="new-form" :model="newCard" ref="newCard" label-width="120px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('newCard')" v-loading="loading">
          <el-form-item label="手机" prop="customerMobile">
            <el-input v-model.number="newCard.customerMobile" placeholder="请输入手机" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="会员卡">
            <el-select v-model.number="newCard.cardId" placeholder="请输入会员卡名" 
              @change="handleCardSelect" filterable>
              <el-option v-for="memberCard in memberCards" :key="memberCard.id" :label="memberCard.name" :value="memberCard.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="消费金额(￥)" prop="consumeMoney">
            <el-input v-model.number="newCard.consumeMoney" placeholder="请输入消费金额"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model.trim="newCard.remark" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item label="顾问">
            <el-select v-model.number="newCard.consultantId" placeholder="请输入顾问名称" filterable>
              <el-option v-for="consultant in consultants" :key="consultant.id" :label="consultant.name" :value="consultant.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售员">
            <el-select v-model.number="newCard.salesManId" placeholder="请输入销售员名称" filterable>
              <el-option v-for="salesMan in salesMans" :key="salesMan.id" :label="salesMan.name" :value="salesMan.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select v-model.number="newCard.type" placeholder="请选择类型" @change="handleChangeType" :disabled="true">
              <el-option v-for="cardType in cardTypes" :key="cardType.value" :label="cardType.name" :value="cardType.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目" prop="projectId" v-if="newCard.type === 1 || newCard.type === 3">
            <el-select v-model.number="newCard.projectId" placeholder="请选择项目" filterable>
              <el-option v-for="project in projects" :key="project.id" :label="project.code+'-'+project.name" :value="project.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="次数" prop="times" v-if="newCard.type === 1 || newCard.type === 3">
            <el-input v-model.number="newCard.times" placeholder="请输入次数"></el-input>
          </el-form-item>
          <el-form-item label="储值卡总额" prop="amount" v-if="newCard.type === 2 || newCard.type === 3">
            <el-input v-model.number="newCard.amount" placeholder="请输入总额"></el-input>
          </el-form-item>
          <el-form-item label="项目折扣(0-100)" prop="projectDiscount">
            <el-input v-model.number="newCard.projectDiscount" placeholder="请输入项目折扣"></el-input>
          </el-form-item>
          <el-form-item label="产品折扣(0-100)" prop="productDiscount">
            <el-input v-model.number="newCard.productDiscount" placeholder="请输入产品折扣"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model.trim="newCard.cardRemark" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item label="赠品">
            <el-table :data="cardGiftsCopy" size="mini" v-loading="loading" style="width: 100%">
              <el-table-column prop="type" label="类型"></el-table-column>
              <el-table-column prop="name" label="名称/金额"></el-table-column>
              <el-table-column prop="amount" label="数量"></el-table-column>
              <el-table-column label="操作" width="50px;" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger"
                    @click="handleDelete(scope.$index, scope.row)">x</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item>
            <el-button @click="cardGiftsDialog = true">添加赠品</el-button>
            <el-button type="primary" @click="onSubmit('newCard')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <CardGift :visible="cardGiftsDialog"
      v-on:closeDialog="cardGiftsDialog = false"
      v-on:addCardGift="handleAddCardGift"></CardGift>
  </div>
</template>

<script>
import CardGift from './CardGift'
export default {
  name: "ConsumeRecordNewCard",
  data() {
    return {
      newCard: {
        customerMobile: '',
        consumeType: 1,// 办卡
        consumeMoney: '',
        paymentWay: 3,// 现金
        remark: '',
        cardId: '',
        amount: 1,
        consultantId: '',
        salesManId: '',
        id: '',
        type: '',
        projectId: '',
        times: '',
        amount: '',
        projectDiscount: '',
        productDiscount: '',
        cardRemark: '',
        gifts: []
      },
      rules: {
        customerMobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { type: 'number', message: "手机号必须是数字", trigger: "blur" }
        ],
        consumeMoney: [
          { required: true, message: "消费金额不能为空", trigger: "blur" },
          { type: 'number', message: "消费金额必须是数字", trigger: "blur" }
        ],
        cardId: [
          { required: true, message: "会员卡不能为空", trigger: "blur" },
          { type: 'number', message: "会员卡必须是数字", trigger: "blur" }
        ],
        consultantId: [
          { required: true, message: "顾问不能为空", trigger: "blur" },
          { type: 'number', message: "顾问必须是数字", trigger: "blur" }
        ],
        salesManId: [
          { required: true, message: "销售员为空", trigger: "blur" },
          { type: 'number', message: "销售员必须是数字", trigger: "blur" }
        ],
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
      enterFlag: true, //true代表允许回车，false代表不允许回车，避免重复提交
      cardGiftsDialog: false,
      cardGiftsCopy: [],
    };
  },
  computed: {
    memberCards: function(){
      return this.$store.state.memberCard.memberCardsAll;
    },
    consultants: function(){
      return this.$store.state.employee.consultants;
    },
    salesMans: function(){
      return this.$store.state.employee.salesMans;
    },
    projects: function(){
      return this.$store.state.project.projectsAll;
    },
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store
            .dispatch("addConsumeRecord", this.handleData(this.newCard))
            .then(res => {
              if (res.code === 0) {
                this.$message.success("添加成功");
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({ path: "/consume-record-card" });
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
    handleAddCardGift(payload){
      let type, name;
      let amount = payload.amount;
      if(payload.type === 1){
        type = '项目';
        let project = this.$store.getters.getProjectFromAllById(payload.projectId);
        name = project.code + '-' + project.name;
        this.newCard.gifts.push({
          'type': 1,
          'projectId': payload.projectId,
          'projectAmount': payload.amount
        })
      }else if(payload.type === 2){
        type = '产品';
        let product = this.$store.getters.getProductFromAllById(payload.productId);
        name = product.code + '-' + product.name;
        this.newCard.gifts.push({
          'type': 2,
          'productId': payload.productId,
          'productAmount': payload.amount
        })
      }else{
        type = '代金券';
        name = payload.couponMoney;
        this.newCard.gifts.push({
          'type': 3,
          'couponMoney': payload.couponMoney,
          'couponAmount': payload.amount
        })
      }
      this.cardGiftsCopy.push({
        'type': type,
        'name': name,
        'amount': amount
      })
    },
    handleDelete(index, row){
      this.cardGiftsCopy.splice(index,1);
      this.newCard.gifts.splice(index,1);
    },
    handleCardSelect(val){
      this.newCard.id = '';
      this.newCard.type = '';
      this.newCard.projectId = '';
      this.newCard.times = '';
      this.newCard.amount = '';
      this.newCard.projectDiscount = '';
      this.newCard.productDiscount = '';
      this.newCard.cardRemark = '';
      let card = this.$store.getters.getMemberCardFromAllById(val);
      this.newCard.consumeMoney = card.price;
      this.newCard.cardId = val;
      this.newCard.id = card.id;
      this.newCard.type = card.type;
      this.newCard.projectId = card.projectId;
      this.newCard.times = card.times;
      this.newCard.amount = card.amount;
      this.newCard.projectDiscount = card.projectDiscount;
      this.newCard.productDiscount = card.productDiscount;
      this.newCard.cardRemark = card.remark;
    },
    handleChangeType(value){
      if( value === 1){
        this.newCard.amount = '';
      }else if(value === 2){
        this.newCard.times = '';
        this.newCard.projectId = '';
      }
    },
    handleData(data){
      let dataChange = {
        consumeRecordPo:{
          customerMobile: '',
          consumeType: '',
          consumeMoney: '',
          paymentWay: '',
          remark: '',
        },
        consumeRecordDetails: [],
        memberCardPo: {
          id: '',
          type: '',
          projectId: '',
          times: '',
          amount: '',
          projectDiscount: '',
          productDiscount: '',
          remark: '',
        },
        gifts: []
      };

      dataChange.consumeRecordPo.customerMobile = data.customerMobile;
      dataChange.consumeRecordPo.consumeType = data.consumeType;
      dataChange.consumeRecordPo.consumeMoney = data.consumeMoney;
      dataChange.consumeRecordPo.paymentWay = data.paymentWay;
      dataChange.consumeRecordPo.remark = data.remark;

      dataChange.consumeRecordDetails.push({
        'cardId': data.cardId,
        'amount': data.amount,
        'consultantId': data.consultantId,
        'salesManId': data.salesManId,
      });

      dataChange.memberCardPo.id = data.id;
      dataChange.memberCardPo.type = data.type;
      dataChange.memberCardPo.projectId = data.projectId;
      dataChange.memberCardPo.times = data.times;
      dataChange.memberCardPo.amount = data.amount;
      dataChange.memberCardPo.projectDiscount = data.projectDiscount;
      dataChange.memberCardPo.productDiscount = data.productDiscount;
      dataChange.memberCardPo.remark = data.cardRemark;
      dataChange.gifts = data.gifts;
      console.log(dataChange);
      return dataChange;
    },
    loadMemberCardAll(){
      this.$store.dispatch("loadMemberCardAll").then( res => {
        this.loading = false;
      }).catch( err => {
        console.log(err);
      });
    },
    loadEmployeeAll(){
      this.$store.dispatch("loadEmployeeAll").then( res => {
        this.loading = false;
      }).catch( err => {
        console.log(err);
      });
    },
    loadProjectAll(){
      this.$store.dispatch("loadProjectAll").then( res => {
        this.loading = false;
      }).catch( err => {
        console.log(err);
      });
    },
    loadConsultants(){
      this.$store.dispatch("loadEmployeeByTopType",4).then( res => {
        this.loading = false;
      }).catch( err => {
        console.log(err);
      });
    },
    loadSalesMans(){
      this.$store.dispatch("loadEmployeeByWorkType",3).then( res => {
        this.loading = false;
      }).catch( err => {
        console.log(err);
      });
    },
  },
  beforeMount: function () {
    this.loadMemberCardAll();
    this.loadEmployeeAll();
    this.loadProjectAll();
    this.loadConsultants();
    this.loadSalesMans();
  },
  components: {CardGift}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>