<template>
  <div class="ConsumeRecordProjectDetail">
    <el-row class="page-title-row">
      <router-link to="/consume-record-project" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">修改做项目消费记录</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="18" :md="12">
        <el-form class="new-form" :model="modProject" ref="modProject" label-width="120px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('modProject')" v-loading="loading">
          <el-form-item label="手机" prop="customerMobile">
            <el-input v-model.number="modProject.customerMobile" placeholder="请输入手机" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="消费金额(￥)" prop="consumeMoney">
            <el-input v-model.number="modProject.consumeMoney" placeholder="请输入消费金额"></el-input>
          </el-form-item>
          <el-form-item label="支付方式" prop="paymentWay">
            <el-select v-model.number="modProject.paymentWay" placeholder="请选择支付方式" 
              @change="handlePaymentWaySelect">
              <el-option v-for="paymentWay in paymentWays" :key="paymentWay.value" :label="paymentWay.name" :value="paymentWay.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容" v-if="modProject.paymentWay === 1">
            <el-select v-model.number="modProject.payWayId" placeholder="请选择客户会员卡" 
              @change="handleCardContentSelect">
              <el-option v-for="cardContent in cardContents" :key="cardContent.id" 
                :label="cardContent.customerName + '-' + cardContent.memberCardName" :value="cardContent.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容" v-if="modProject.paymentWay === 2">
            <el-select v-model.number="modProject.payWayId" placeholder="请选择客户活动" 
              @change="handleActivityContentSelect">
              <el-option v-for="activityContent in activityContents" :key="activityContent.id" 
                :label="activityContent.customerName + '-' + activityContent.activityName" :value="activityContent.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容" v-if="modProject.paymentWay === 31">
            <el-select v-model.number="modProject.payWayId" placeholder="请选择客户卡" 
              @change="handleCardCouponSelect">
              <el-option v-for="cardCoupon in cardCoupons" :key="cardCoupon.id" 
                :label="cardCoupon.customerName + '-' + cardCoupon.memberCardName" :value="cardCoupon.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容" v-if="modProject.paymentWay === 32">
            <el-select v-model.number="modProject.payWayId" placeholder="请选择客户活动" 
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
          <el-form-item label="储值(￥)" v-if="card.id != ''">
            <el-input v-model="card.remainingMoney" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="项目折扣(1-100)" v-if="card.id != ''">
            <el-input v-model="card.projectDiscount" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="卡流水号" v-if="card.id != ''">
            <el-input v-model="card.uniqueIdentifier" :disabled="true"></el-input>
          </el-form-item>

          <!-- 客户会员卡优惠劵 -->
          <el-form-item label="会员卡优惠券" v-if="cardCoupon.id != ''">
            <el-select v-model.number="modProject.payWayContentId" placeholder="请选择优惠券"
              @change="handleCardCouponDetailSelect">
              <el-option v-for="cardCouponContent in cardCouponContentDetail" ref="" :key="cardCouponContent.id" 
                :label="cardCouponContent.content + '-' + cardCouponContent.amount + '张'" :value="cardCouponContent.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量" v-if="cardCoupon.id != ''">
            <el-input-number v-model="modProject.couponAmount" controls-position="right" :min="0"></el-input-number>
          </el-form-item>

          <!-- 客户活动优惠劵 -->
          <el-form-item label="活动优惠券" v-if="activityCoupon.id != ''">
            <el-select v-model.number="modProject.payWayContentId" placeholder="请选择优惠券"
              @change="handleActivityCouponDetailSelect">
              <el-option v-for="activityCouponContent in activityCouponContentDetail" :key="activityCouponContent.id" 
                :label="activityCouponContent.content + '-' + activityCouponContent.number + '张'" :value="activityCouponContent.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量" v-if="activityCoupon.id != ''">
            <el-input-number v-model="modProject.couponAmount" controls-position="right" :min="0"></el-input-number>
          </el-form-item>

          <el-form-item label="验证码" v-if="modProject.couponAmount > 1">
            <el-input v-model="modProject.validStr" placeholder="请出入验证码"></el-input>
          </el-form-item>

          <!-- 客户活动 -->
          <el-form-item label="活动内容" v-if="activity.id != ''">
            <el-table :data="activityContentDetail" size="mini" v-loading="loading" style="width: 100%">
              <el-table-column prop="type" label="类型"></el-table-column>
              <el-table-column prop="relatedName" label="内容"></el-table-column>
              <el-table-column prop="number" label="个数"></el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="销售员">
            <el-select v-model="modProject.employeeIds" multiple  placeholder="请输入销售员名称" filterable>
              <el-option v-for="employee in employees" :key="employee.id" :label="employee.name" :value="employee.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绩效">
            <el-input v-model.trim="modProject.percents" placeholder="请输入数字,用英文逗号分隔"></el-input>
          </el-form-item>
          <el-form-item label="项目">
            <el-table :data="projectsCopy" size="mini" v-loading="loading" style="width: 100%">
              <el-table-column prop="id" label="ID" v-if="false"></el-table-column>
              <el-table-column prop="name" label="名称"></el-table-column>
              <el-table-column prop="amount" label="数量"></el-table-column>
              <el-table-column prop="unitPrice" label="价格"></el-table-column>
              <el-table-column prop="operatorName" label="操作员"></el-table-column>
              <el-table-column label="操作" width="50px;" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger"
                    @click="handleDelete(scope.$index, scope.row)">x</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model.trim="modProject.remark" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="projectsDialog = true">添加项目</el-button>
            <el-button @click="calConsumeRecord()">结算</el-button>
            <el-button type="primary" @click="onSubmit('modProject')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <CRProject :visible="projectsDialog"
      v-on:closeDialog="projectsDialog = false"
      v-on:addCRProject="handleAddCRProject"></CRProject>
  </div>
</template>

<script>
import CRProject from './CRProject'
export default {
  name: "ConsumeRecordProjectDetail",
  data() {
    return {
      modProject: {
        consumeId: '',
        customerMobile: '',
        consumeType: 3,// 做项目
        consumeMoney: 0,
        paymentWay: '',
        payWayId: '',
        payWayContentId: '',
        couponAmount: 0,
        remark: '',
        employeeIds: [],
        percents: '',
        projects: [],
        validStr: ''
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
        paymentWay: [
          { required: true, message: "支付方式不能为空", trigger: "blur" },
          { type: 'number', message: "支付方式必须是数字", trigger: "blur" }
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
        },
        {
          name: '赠送',
          value: 4
        },
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
      projectsDialog: false,
      projectsCopy: [],
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
        remainingMoney: '',
        projectDiscount: '',
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
    employees: function(){
      return this.$store.state.employee.employeesAll;
    },
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.modProject.projects.length == 0){
            this.$message.error("请添加项目!");
          }else{
            this.loading = true;
            this.enterFlag = false;
            this.$store
              .dispatch("modConsumeRecord", this.handleData(this.modProject))
              .then(res => {
                if (res.code === 0) {
                  this.$message.success("修改成功");
                  setTimeout(() => {
                    this.loading = false;
                    this.$router.push({ path: "/consume-record-project" });
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
    handleAddCRProject(payload){
      let project = this.$store.getters.getProjectFromAllById(payload.projectId);
      let operator = this.$store.getters.getEmployeeFromAllById(payload.operatorId);
      this.projectsCopy.push({
        'id': project.id,
        'name': project.name,
        'amount': payload.amount,
        'unitPrice': project.unitPrice,
        'operatorName': operator.name,
      })
      this.modProject.projects.push({
        'projectId': payload.projectId,
        'amount': payload.amount,
        'operatorId': payload.operatorId
      });
    },
    handleDelete(index, row){
      this.projectsCopy.splice(index,1);
      this.modProject.projects.splice(index,1);
    },
    handlePaymentWaySelect(val){
      this.modProject.payWayId = '';
      this.modProject.payWayContentId = '';
      this.modProject.couponAmount = 0;
      this.modProject.validStr = '';
      if(val === 1){ // 会员卡
        this.activity.id = '';
        this.cardCoupon.id = '';
        this.activityCoupon.id = '';
        if( this.modProject.customerMobile === '' ){
          this.modProject.paymentWay = '';
          this.$message.error('请先输入手机号');
        }else{
          this.$store.dispatch("loadCustomerCardPay",{
            'customerMobile': this.modProject.customerMobile,
            'paymentWay': 1
          }).then( res => {
            this.cardContents = res.data
          }).catch( err => {
            console.log(err);
          });
        }
      }else if(val === 2){
        this.modProject.consumeMoney = 0;
        this.card.id = '';
        this.cardCoupon.id = '';
        this.activityCoupon.id = '';
        if( this.modProject.customerMobile === '' ){
          this.modProject.paymentWay = '';
          this.$message.error('请先输入手机号');
        }else{
          this.$store.dispatch("loadCustomerActivityPay",{
            'customerMobile': this.modProject.customerMobile,
            'paymentWay': 2
          }).then( res => {
            this.activityContents = res.data
          }).catch( err => {
            console.log(err);
          });
        }
      }else if(val === 3){
        this.modProject.consumeMoney = 0;
        this.card.id = '';
        this.activity.id = '';
        this.cardCoupon.id = '';
        this.activityCoupon.id = '';
      }else if(val === 31){
        this.card.id = '';
        this.activity.id = '';
        this.activityCoupon.id = '';
        if( this.modProject.customerMobile === '' ){
          this.modProject.paymentWay = '';
          this.$message.error('请先输入手机号');
        }else{
          this.$store.dispatch("loadCustomerCardPay",{
            'customerMobile': this.modProject.customerMobile,
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
        if( this.modProject.customerMobile === '' ){
          this.modProject.paymentWay = '';
          this.$message.error('请先输入手机号');
        }else{
          this.$store.dispatch("loadCustomerActivityPay",{
            'customerMobile': this.modProject.customerMobile,
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
      this.modProject.validStr = '';
      let card = this.$store.getters.getCustomerCardPayById(val);
      this.card.id = card.id
      this.card.remainingMoney = card.remainingMoney;
      this.card.projectDiscount = Number.parseInt(card.projectDiscount*100);
      this.card.uniqueIdentifier = card.uniqueIdentifier;
      this.cardContentDetail = card.customerMemberCardContent;
    },
    handleCardCouponSelect(val){// 切换会员卡
      this.modProject.validStr = '';
      let card = this.$store.getters.getCustomerCardPayById(val);
      this.cardCoupon.id = card.id;
      this.cardCoupon.projectDiscount = Number.parseInt(card.projectDiscount*100);
      this.cardCoupon.uniqueIdentifier = card.uniqueIdentifier;
      this.cardCouponContentDetail = card.customerMemberCardContent;
      this.modProject.payWayContentId = '';
      this.modProject.couponAmount = 0;
    },
    handleCardCouponDetailSelect(val){// 切换优惠券
      this.modProject.validStr = '';
      this.modProject.couponAmount = 0;
    },
    handleActivityContentSelect(val){// 切换活动
      this.modProject.validStr = '';
      let activity = this.$store.getters.getCustomerActivityPayById(val);
      this.activity.id = activity.id;
      this.activityContentDetail= activity.customerActivityContents;
    },
    handleActivityCouponSelect(val){// 切换活动
      this.modProject.validStr = '';
      let activity = this.$store.getters.getCustomerActivityPayById(val);
      this.activityCoupon.id = activity.id;
      this.activityCouponContentDetail = activity.customerActivityContents;
      this.modProject.payWayContentId = '';
      this.modProject.couponAmount = 0;
    },
    handleActivityCouponDetailSelect(val){// 切换优惠券
      this.modProject.validStr = '';
      this.modProject.couponAmount = 0;
    },
    handleData(data){
      let dataChange = {
        consumeRecordPo:{
          id: '',
          customerMobile: '',
          consumeType: '',
          consumeMoney: '',
          paymentWay: '',
          payWayId: '',
          payWayContentId: '',
          couponAmount: '',
          remark: '',
        },
        employeeIds: [],
        percents: '',
        consumeRecordDetails: [],
        validStr: ''
      };

      dataChange.consumeRecordPo.id = data.consumeId;
      dataChange.consumeRecordPo.customerMobile = data.customerMobile;
      dataChange.consumeRecordPo.consumeType = data.consumeType;
      dataChange.consumeRecordPo.consumeMoney = data.consumeMoney;
      dataChange.consumeRecordPo.paymentWay = data.paymentWay;
      dataChange.consumeRecordPo.payWayId = data.payWayId;
      dataChange.consumeRecordPo.payWayContentId = data.payWayContentId;
      dataChange.consumeRecordPo.couponAmount = data.couponAmount;
      dataChange.consumeRecordPo.remark = data.remark;

      dataChange.employeeIds = data.employeeIds;
      dataChange.percents = data.percents;

      dataChange.validStr = data.validStr;

      for(let project of data.projects){
        dataChange.consumeRecordDetails.push({
          'projectId': project.projectId,
          'amount': project.amount,
          'operatorId': project.operatorId,
        });
      }

      return dataChange;
    },
    calConsumeRecord(){
      this.$refs["modProject"].validate(valid => {
        if (valid) {
          if(this.modProject.projects.length == 0){
            this.$message.error("请添加项目!");
          }else{
            this.$store.dispatch("calConsumeRecord",this.handleData(this.modProject)).then( res => {
              this.modProject.consumeMoney = res.data;
            }).catch( err => {
              console.log(err);
            });
          }
        } else {
          return false;
        }
      });
    },
    loadDataToForm(data){
      this.modProject.consumeId = data.id;
      this.modProject.customerMobile = Number.parseInt(data.customerMobile);
    },
    loadData(){
      this.$store.dispatch("loadEmployeeAll").then( res => { return Promise.resolve(1) } )
        .then(res => {
          this.$store.dispatch("loadProjectAll");
           //从vuex中查询该id
          const consumeRecord = this.$store.getters.getConsumeRecordById(this.$route.params.id);
          this.loadDataToForm(consumeRecord);
        })
    },
  },
  beforeMount: function () {
    if(this.$store.state.consumeRecord.consumeRecords.length === 0){
      //如果vuex中没有数据，则返回列表页
      this.$router.push({ path: '/consume-record-card' });
    }else{
      this.loadData();
    }
  },
  components: {CRProject}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>