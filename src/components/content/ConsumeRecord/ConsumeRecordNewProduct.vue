<template>
  <div class="ConsumeRecordNewProduct">
    <el-row class="page-title-row">
      <router-link to="/consume-record" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">买产品</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="18" :md="12">
        <el-form class="new-form" :model="newProduct" ref="newProduct" label-width="120px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('newProduct')" v-loading="loading">
          <el-form-item label="手机" prop="customerMobile">
            <el-input v-model.number="newProduct.customerMobile" placeholder="请输入手机" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="消费金额(￥)" prop="consumeMoney">
            <el-input v-model.number="newProduct.consumeMoney" placeholder="请输入消费金额"></el-input>
          </el-form-item>
          <el-form-item label="支付方式">
            <el-select v-model.number="newProduct.paymentWay" placeholder="请选择支付方式" 
              @change="handlePaymentWaySelect">
              <el-option v-for="paymentWay in paymentWays" :key="paymentWay.value" :label="paymentWay.name" :value="paymentWay.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容" v-if="newProduct.paymentWay === 1">
            <el-select v-model.number="newProduct.payWayId" placeholder="请选择客户会员卡" 
              @change="handleCardContentSelect">
              <el-option v-for="cardContent in cardContents" :key="cardContent.id" 
                :label="cardContent.customerName + '-' + cardContent.memberCardName" :value="cardContent.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容" v-if="newProduct.paymentWay === 2">
            <el-select v-model.number="newProduct.payWayId" placeholder="请选择客户活动" 
              @change="handleActivityContentSelect">
              <el-option v-for="activityContent in activityContents" :key="activityContent.id" 
                :label="activityContent.customerName + '-' + activityContent.activityName" :value="activityContent.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容" v-if="newProduct.paymentWay === 31">
            <el-select v-model.number="newProduct.payWayId" placeholder="请选择客户卡" 
              @change="handleCardCouponSelect">
              <el-option v-for="cardCoupon in cardCoupons" :key="cardCoupon.id" 
                :label="cardCoupon.customerName + '-' + cardCoupon.memberCardName" :value="cardCoupon.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容" v-if="newProduct.paymentWay === 32">
            <el-select v-model.number="newProduct.payWayId" placeholder="请选择客户活动" 
              @change="handleActivityCouponSelect">
              <el-option v-for="activityCoupon in activityCoupons" :key="activityCoupon.id" 
                :label="activityCoupon.customerName + '-' + activityCoupon.activityName" :value="activityCoupon.id">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 客户会员卡 -->
          <el-form-item label="会员卡内容" v-if="card.id != ''">
            <el-table :data="cardContentDetail" size="mini" v-loading="loading" style="width: 100%">
              <el-table-column prop="relatedName" label="内容"></el-table-column>
              <el-table-column prop="amount" label="个数"></el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="产品折扣(0-100)" v-if="card.id != ''">
            <el-input v-model="card.productDiscount" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="卡流水号" v-if="card.id != ''">
            <el-input v-model="card.uniqueIdentifier" :disabled="true"></el-input>
          </el-form-item>

          <!-- 客户会员卡优惠劵 -->
          <el-form-item label="会员卡优惠券" v-if="cardCoupon.id != ''">
            <el-select v-model.number="newProduct.payWayContentId" placeholder="请选择优惠券"
              @change="handleCardCouponDetailSelect">
              <el-option v-for="cardCouponContent in cardCouponContentDetail" ref="" :key="cardCouponContent.id" 
                :label="cardCouponContent.content + '-' + cardCouponContent.amount + '张'" :value="cardCouponContent.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量" v-if="cardCoupon.id != ''">
            <el-input-number v-model="newProduct.couponAmount" controls-position="right" :min="0"></el-input-number>
          </el-form-item>

          <!-- 客户活动优惠劵 -->
          <el-form-item label="活动优惠券" v-if="activityCoupon.id != ''">
            <el-select v-model.number="newProduct.payWayContentId" placeholder="请选择优惠券"
              @change="handleActivityCouponDetailSelect">
              <el-option v-for="activityCouponContent in activityCouponContentDetail" :key="activityCouponContent.id" 
                :label="activityCouponContent.content + '-' + activityCouponContent.number + '张'" :value="activityCouponContent.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量" v-if="activityCoupon.id != ''">
            <el-input-number v-model="newProduct.couponAmount" controls-position="right" :min="0"></el-input-number>
          </el-form-item>

          <!-- 客户活动 -->
          <el-form-item label="活动内容" v-if="activity.id != ''">
            <el-table :data="activityContentDetail" size="mini" v-loading="loading" style="width: 100%">
              <el-table-column prop="type" label="类型"></el-table-column>
              <el-table-column prop="relatedName" label="内容"></el-table-column>
              <el-table-column prop="number" label="个数"></el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="顾问">
            <el-select v-model.number="newProduct.consultantId" placeholder="请输入顾问名称" filterable>
              <el-option v-for="consultant in consultants" :key="consultant.id" :label="consultant.name" :value="consultant.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售员">
            <el-select v-model.number="newProduct.salesManId" placeholder="请输入销售员名称" filterable>
              <el-option v-for="salesMan in salesMans" :key="salesMan.id" :label="salesMan.name" :value="salesMan.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品">
            <el-table :data="productsCopy" size="mini" v-loading="loading" style="width: 100%">
              <el-table-column prop="id" label="ID" v-if="false"></el-table-column>
              <el-table-column prop="name" label="名称"></el-table-column>
              <el-table-column prop="amount" label="数量"></el-table-column>
              <el-table-column prop="unitName" label="单位"></el-table-column>
              <el-table-column prop="unitPrice" label="价格"></el-table-column>
              <el-table-column label="操作" width="50px;" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger"
                    @click="handleDelete(scope.$index, scope.row)">x</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model.trim="newProduct.remark" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="calConsumeRecord()">添加产品</el-button>
            <el-button type="primary" @click="prductsDialog = true">添加产品</el-button>
            <el-button type="primary" @click="onSubmit('newProduct')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <CRProduct :visible="prductsDialog"
      v-on:closeDialog="prductsDialog = false"
      v-on:addCRProduct="handleAddCRProduct"></CRProduct>
  </div>
</template>

<script>
import CRProduct from './CRProduct'
export default {
  name: "ConsumeRecordNewProduct",
  data() {
    return {
      newProduct: {
        customerMobile: '',
        consumeType: 2,// 办卡
        consumeMoney: '',
        paymentWay: '',
        payWayId: '',
        payWayContentId: '',
        couponAmount: 0,
        remark: '',
        consultantId: '',
        salesManId: '',
        products: []
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
        payWayId: [
          { required: true, message: "支付方式不能为空", trigger: "blur" },
          { type: 'number', message: "支付方式必须是数字", trigger: "blur" }
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
      paymentWays: [
        {
          name: '会员卡',
          value: 1
        },
        {
          name: '活动',
          value: 2
        },
        {
          name: '现金',
          value: 3
        },
        {
          name: '现金+会员卡代金券',
          value: 31
        },
        {
          name: '现金+活动代金券',
          value: 32
        }
      ],
      loading: false,
      enterFlag: true, //true代表允许回车，false代表不允许回车，避免重复提交
      prductsDialog: false,
      productsCopy: [],
      cardContents: [],
      cardCoupons: [],
      cardContentDetail: [],
      cardCouponContentDetail: [],
      activityContents: [],
      activityCoupons: [],
      activityContentDetail: [],
      activityCouponContentDetail: [],
      maxAmount: 1,
      card: {
        id: '',
        productDiscount: '',
        uniqueIdentifier: '',
      },
      cardCoupon: {
        id: '',
      },
      activity: {
        id: '',
      },
      activityCoupon: {
        id: '',
      }
    };
  },
  computed: {
    consultants: function(){
      return this.$store.state.employee.consultants;
    },
    salesMans: function(){
      return this.$store.state.employee.salesMans;
    },
  },
  watch: {
    productsCopy: function(newVal,oldVal){
      if(this.newProduct.paymentWay === 3){
        this.newProduct.consumeMoney = this.getPriceByProducts(newVal);
      }
      if(this.newProduct.paymentWay === 31){
        if(cardCoupon.id != '' && cardCoupon.productDiscount != 0){

        }
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store
            .dispatch("addConsumeRecord", this.handleData(this.newProduct))
            .then(res => {
              if (res.code === 0) {
                this.$message.success("添加成功");
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({ path: "/consume-record" });
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
    handleAddCRProduct(payload){
      let product = this.$store.getters.getProductFromAllById(payload.productId);
      this.productsCopy.push({
        'id': product.id,
        'name': product.name,
        'amount': payload.amount,
        'unitName': product.unitName,
        'unitPrice': product.unitPrice
      })
      this.newProduct.products.push({
        'productId': payload.productId,
        'amount': payload.amount
      });
    },
    handleDelete(index, row){
      this.productsCopy.splice(index,1);
      this.newProduct.products.splice(index,1);
    },
    handlePaymentWaySelect(val){
      this.newProduct.payWayId = '';
      this.newProduct.payWayContentId = '';
      this.newProduct.couponAmount = 0;
      if(val === 1){ // 会员卡
        this.activity.id = '';
        this.cardCoupon.id = '';
        this.activityCoupon.id = '';
        if( this.newProduct.customerMobile === '' ){
          this.newProduct.paymentWay = '';
          this.$message.error('请先输入手机号');
        }else{
          this.$store.dispatch("loadCustomerCardPay",{
            'customerMobile': this.newProduct.customerMobile,
            'paymentWay': 1
          }).then( res => {
            this.cardContents = res.data
          }).catch( err => {
            console.log(err);
          });
        }
      }else if(val === 2){
        this.newProduct.consumeMoney = 0;
        this.card.id = '';
        this.cardCoupon.id = '';
        this.activityCoupon.id = '';
        if( this.newProduct.customerMobile === '' ){
          this.newProduct.paymentWay = '';
          this.$message.error('请先输入手机号');
        }else{
          this.$store.dispatch("loadCustomerActivityPay",{
            'customerMobile': this.newProduct.customerMobile,
            'paymentWay': 2
          }).then( res => {
            this.activityContents = res.data
          }).catch( err => {
            console.log(err);
          });
        }
      }else if(val === 3){
        this.newProduct.consumeMoney = 0;
        this.card.id = '';
        this.activity.id = '';
        this.cardCoupon.id = '';
        this.activityCoupon.id = '';
      }else if(val === 31){
        this.card.id = '';
        this.activity.id = '';
        this.activityCoupon.id = '';
        if( this.newProduct.customerMobile === '' ){
          this.newProduct.paymentWay = '';
          this.$message.error('请先输入手机号');
        }else{
          this.$store.dispatch("loadCustomerCardPay",{
            'customerMobile': this.newProduct.customerMobile,
            'paymentWay': 31
          }).then( res => {
            this.cardCoupons = res.data
          }).catch( err => {
            console.log(err);
          });
        }
      }else{
        this.card.id = '';
        this.activity.id = '';
        this.cardCoupon.id = '';
        if( this.newProduct.customerMobile === '' ){
          this.newProduct.paymentWay = '';
          this.$message.error('请先输入手机号');
        }else{
          this.$store.dispatch("loadCustomerActivityPay",{
            'customerMobile': this.newProduct.customerMobile,
            'paymentWay': 32
          }).then( res => {
            this.activityCoupons = res.data
          }).catch( err => {
            console.log(err);
          });
        }
      }
    },
    handleCardContentSelect(val){// 切换会员卡
      let card = this.$store.getters.getCustomerCardPayById(val);
      this.card.id = card.id
      this.card.productDiscount = card.productDiscount;
      this.card.uniqueIdentifier = card.uniqueIdentifier;
      this.cardContentDetail = card.customerMemberCardContent;
    },
    handleCardCouponSelect(val){// 切换会员卡
      let card = this.$store.getters.getCustomerCardPayById(val);
      this.cardCoupon.id = card.id;
      this.cardCoupon.productDiscount = card.productDiscount;
      this.cardCoupon.uniqueIdentifier = card.uniqueIdentifier;
      this.cardCouponContentDetail = card.customerMemberCardContent;
      this.newProduct.payWayContentId = '';
      this.newProduct.couponAmount = 0;
    },
    handleCardCouponDetailSelect(val){// 切换优惠券
      this.newProduct.couponAmount = 0;
    },
    handleActivityContentSelect(val){// 切换活动
      let activity = this.$store.getters.getCustomerActivityPayById(val);
      this.activity.id = activity.id;
      this.activityContentDetail= activity.customerActivityContents;
    },
    handleActivityCouponSelect(val){// 切换活动
      let activity = this.$store.getters.getCustomerActivityPayById(val);
      this.activityCoupon.id = activity.id;
      this.activityCouponContentDetail = activity.customerActivityContents;
      this.newProduct.payWayContentId = '';
      this.newProduct.couponAmount = 0;
    },
    handleActivityCouponDetailSelect(val){// 切换优惠券
      this.newProduct.couponAmount = 0;
    },
    handleData(data){
      let dataChange = {
        consumeRecordPo:{
          customerMobile: '',
          consumeType: '',
          consumeMoney: '',
          paymentWay: '',
          payWayId: '',
          payWayContentId: '',
          couponAmount: '',
          remark: '',
        },
        consumeRecordDetails: [],
      };

      dataChange.consumeRecordPo.customerMobile = data.customerMobile;
      dataChange.consumeRecordPo.consumeType = data.consumeType;
      dataChange.consumeRecordPo.consumeMoney = data.consumeMoney;
      dataChange.consumeRecordPo.paymentWay = data.paymentWay;
      dataChange.consumeRecordPo.payWayId = data.payWayId;
      dataChange.consumeRecordPo.payWayContentId = data.payWayContentId;
      dataChange.consumeRecordPo.couponAmount = data.couponAmount;
      dataChange.consumeRecordPo.remark = data.remark;

      for(let product of data.products){
        dataChange.consumeRecordDetails.push({
          'productId': product.productId,
          'amount': product.amount,
          'consultantId': data.consultantId,
          'salesManId': data.salesManId,
        });
      }
      console.log(dataChange);
      return dataChange;
    },
    getPriceByProducts(data){
      let money = 0;
      for(let product of data){
        money += product.amount * product.unitPrice;
      }
      return money;
    },
    loadEmployeeAll(){
      this.$store.dispatch("loadEmployeeAll").then( res => {
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
    loadProductAll(){
      this.$store.dispatch("loadProductAll").then( res => {
        this.loading = false;
      }).catch( err => {
        console.log(err);
      });
    },
    calConsumeRecord(){
      this.$store.dispatch("calConsumeRecord",this.handleData(this.newProduct)).then( res => {
        console.log(res);
      }).catch( err => {
        console.log(err);
      });
    },
  },
  beforeMount: function () {
    this.loadEmployeeAll();
    this.loadConsultants();
    this.loadSalesMans();
    this.loadProductAll();
  },
  components: {CRProduct}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>