<template>
  <div class="ConsumeRecordNewCard">
    <el-row class="page-title-row">
      <router-link to="/consume-record-card" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">办卡</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="18" :md="12">
        <el-form class="new-form" :model="newCard" ref="newCard" label-width="130px" 
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
          <el-form-item label="销售员">
            <el-select v-model="newCard.employeeIds" multiple  placeholder="请输入销售员名称" filterable>
              <el-option v-for="employee in employees" :key="employee.id" :label="employee.name" :value="employee.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绩效">
            <el-select v-model="newCard.percents" multiple  placeholder="请输入绩效" filterable>
              <el-option v-for="per in percentage" :key="per.value" :label="per.name" :value="per.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="有效期" prop="validDate">
            <el-date-picker v-model="newCard.validDate" align="center" 
              type="date" :editable="false" placeholder="选择日期">
            </el-date-picker>
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
          <el-form-item label="储值卡总额" prop="cardAmount" v-if="newCard.type === 2 || newCard.type === 3">
            <el-input v-model.number="newCard.cardAmount" placeholder="请输入总额"></el-input>
          </el-form-item>
          <el-form-item label="项目折扣(1-100)" prop="projectDiscount">
            <el-input v-model.number="newCard.projectDiscount" placeholder="请输入项目折扣"></el-input>
          </el-form-item>
          <el-form-item label="产品折扣(1-100)" prop="productDiscount">
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
        amount: 1,// 会员卡张数1
        employeeIds: [],
        percents: [],
        validDate: '',
        id: '',
        type: '',
        projectId: '',
        times: '',
        cardAmount: '',
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
        projectDiscount: [
          { required: true, message: "项目折扣不能为空", trigger: "blur" },
          { type: 'number',min: 1, max: 100, message: "折扣必须是1-100之间的数字", trigger: "blur" },
        ],
        productDiscount: [
          { required: true, message: "产品折扣不能为空", trigger: "blur" },
          { type: 'number',min: 1, max: 100, message: "折扣必须是1-100之间的数字", trigger: "blur" },
        ],
        validDate: [
          { required: true, message: "有效期不能为空", trigger: "blur" }
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
      percentage: [
        {
          name: 5,
          value: 5
        },
        {
          name: 10,
          value: 10
        },
        {
          name: 15,
          value: 15
        },
        {
          name: 20,
          value: 20
        },
        {
          name: 25,
          value: 25
        },
        {
          name: 30,
          value: 30
        },
        {
          name: 35,
          value: 35
        },
        {
          name: 40,
          value: 40
        },
        {
          name: 45,
          value: 45
        },
        {
          name: 50,
          value: 50
        },
        {
          name: 55,
          value: 55
        },
        {
          name: 60,
          value: 60
        },
        {
          name: 65,
          value: 65
        },
        {
          name: 70,
          value: 70
        },
        {
          name: 75,
          value: 75
        },
        {
          name: 80,
          value: 80
        },
        {
          name: 85,
          value: 85
        },
        {
          name: 90,
          value: 90
        },
        {
          name: 95,
          value: 95
        },
        {
          name: 100,
          value: 100
        },
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
    employees: function(){
      return this.$store.state.employee.employeesAll;
    },
    projects: function(){
      return this.$store.state.project.projectsAll;
    },
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.newCard.employeeIds.length != this.newCard.employeeIds.length){
            this.$message.error('输入员工绩效比例有误');
          }else{
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
          }
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
      this.newCard.cardAmount = '';
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
      this.newCard.cardAmount = card.amount;
      this.newCard.projectDiscount = card.projectDiscount*100;
      this.newCard.productDiscount = card.productDiscount*100;
      this.newCard.cardRemark = card.remark;
    },
    handleChangeType(value){
      if( value === 1){
        this.newCard.cardAmount = '';
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
        employeeIds: [],
        percents: [],
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
        gifts: [],
        consumeRecordDetails: [],
      };

      dataChange.consumeRecordPo.customerMobile = data.customerMobile;
      dataChange.consumeRecordPo.consumeType = data.consumeType;
      dataChange.consumeRecordPo.consumeMoney = data.consumeMoney;
      dataChange.consumeRecordPo.paymentWay = data.paymentWay;
      dataChange.consumeRecordPo.remark = data.remark;

      dataChange.employeeIds = data.employeeIds;
      dataChange.percents = data.percents;

      dataChange.consumeRecordDetails.push({
        'cardId': data.cardId,
        'amount': data.amount,
        'validDate': this.toTimeStamp(data.validDate)
      });

      dataChange.memberCardPo.id = data.id;
      dataChange.memberCardPo.type = data.type;
      dataChange.memberCardPo.projectId = data.projectId;
      dataChange.memberCardPo.times = data.times;
      dataChange.memberCardPo.amount = data.cardAmount;
      dataChange.memberCardPo.projectDiscount = data.projectDiscount;
      dataChange.memberCardPo.productDiscount = data.productDiscount;
      dataChange.memberCardPo.remark = data.cardRemark;
      dataChange.gifts = data.gifts;
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
  },
  beforeMount: function () {
    this.loadMemberCardAll();
    this.loadEmployeeAll();
    this.loadProjectAll();
  },
  components: {CardGift}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>