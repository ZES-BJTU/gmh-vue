<template>
  <div class="ConsumeRecordNewCard">
    <el-row class="page-title-row">
      <router-link to="/consume-record" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">办卡</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="18" :md="12">
        <el-form class="new-form" :model="newCard" ref="newCard" label-width="110px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('newCard')" v-loading="loading">
          <el-form-item label="手机" prop="customerMobile">
            <el-input v-model.number="newCard.consumeRecordPo.customerMobile" placeholder="请输入手机" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="消费金额(￥)" prop="consumeMoney">
            <el-input v-model.number="newCard.consumeRecordPo.consumeMoney" placeholder="请输入消费金额"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model.trim="newCard.consumeRecordPo.remark" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item label="会员卡">
            <el-select v-model.number="newCard.consumeRecordDetails.cardId" placeholder="请输入会员卡名" 
              @change="handleCardSelect" filterable>
              <el-option v-for="memberCard in memberCards" :key="memberCard.id" :label="memberCard.name" :value="memberCard.id">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="顾问">
            <el-select v-model.number="newCard.consumeRecordDetails.consultantId" placeholder="请输入顾问名称" filterable>
              <el-option v-for="employee in employees" :key="'c'+employee.id" :label="employee.name" :value="employee.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售员">
            <el-select v-model.number="newCard.consumeRecordDetails.salesManId" placeholder="请输入销售员名称" filterable>
              <el-option v-for="employee in employees" :key="'s'+employee.id" :label="employee.name" :value="employee.id">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="项目">
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
            <el-button type="primary" @click="cardGiftsDialog = true">添加赠品</el-button>
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
        consumeRecordPo: {
          customerMobile: '',
          consumeType: 1,// 办卡
          consumeMoney: '',
          paymentWay: 3,// 现金
          remark: '',
        },
        consumeRecordDetails: [
          {
            cardId: '',
            amount: 1,
            consultantId: '',
            salesManId: '',
          }
        ],
        gifts: []
      },
      rules: {
        // customerMobile: [
        //   { required: true, message: "手机号不能为空", trigger: "blur" },
        //   { type: 'number', message: "手机号必须是数字", trigger: "blur" }
        // ],
        // consumeMoney: [
        //   { required: true, message: "消费金额不能为空", trigger: "blur" },
        //   { type: 'number', message: "消费金额必须是数字", trigger: "blur" }
        // ],
        // cardId: [
        //   { required: true, message: "会员卡不能为空", trigger: "blur" },
        //   { type: 'number', message: "会员卡必须是数字", trigger: "blur" }
        // ],
        // consultantId: [
        //   { required: true, message: "顾问不能为空", trigger: "blur" },
        //   { type: 'number', message: "顾问必须是数字", trigger: "blur" }
        // ],
        // salesManId: [
        //   { required: true, message: "销售员为空", trigger: "blur" },
        //   { type: 'number', message: "销售员必须是数字", trigger: "blur" }
        // ],
      },
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
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store
            .dispatch("addConsumeRecord", this.newCard)
            .then(res => {
              if (res.code === 0) {
                this.$message.success("添加成功");
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({ path: "/ConsumeRecord" });
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
      let card = this.$store.getters.getMemberCardFromAllById(val);
      this.newCard.consumeRecordPo.consumeMoney = card.price;
      this.newCard.consumeRecordDetails[0].cardId = val;
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
  },
  beforeMount: function () {
    this.loadMemberCardAll();
    this.loadEmployeeAll();
  },
  components: {CardGift}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>