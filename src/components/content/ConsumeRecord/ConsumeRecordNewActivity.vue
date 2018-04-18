<template>
  <div class="ConsumeRecordNewActivity">
    <el-row class="page-title-row">
      <router-link to="/consume-record-activity" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">参加活动</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="18" :md="12">
        <el-form class="new-form" :model="newActivity" ref="newActivity" label-width="120px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('newActivity')" v-loading="loading">
          <el-form-item label="手机" prop="customerMobile">
            <el-input v-model.number="newActivity.customerMobile" placeholder="请输入手机" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="消费金额(￥)" prop="consumeMoney">
            <el-input v-model.number="newActivity.consumeMoney" placeholder="请输入消费金额"></el-input>
          </el-form-item>
          <el-form-item label="活动" prop="activityId">
            <el-select v-model.number="newActivity.activityId" placeholder="请选择活动" 
              @change="handleActivitySelect">
              <el-option v-for="activity in activities" :key="activity.id" 
                :label="activity.code+'-'+activity.name" :value="activity.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动内容">
            <el-table :data="activityContents" size="mini" v-loading="loading" style="width: 100%">
              <el-table-column prop="type" label="类型"></el-table-column>
              <el-table-column prop="name" label="内容"></el-table-column>
              <el-table-column prop="number" label="个数"></el-table-column>
              <el-table-column prop="remark" label="备注"></el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model.trim="newActivity.remark" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item label="销售员">
            <el-select v-model="newActivity.employeeIds" multiple  placeholder="请输入销售员名称" filterable>
              <el-option v-for="employee in employees" :key="employee.id" :label="employee.name" :value="employee.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绩效">
            <el-select v-model="newActivity.percents" multiple  placeholder="请输入绩效" filterable>
              <el-option v-for="per in percentage" :key="per.value" :label="per.name" :value="per.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('newActivity')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ConsumeRecordNewActivity",
  data() {
    return {
      newActivity: {
        customerMobile: '',
        consumeType: 4,// 办卡
        consumeMoney: 0,
        paymentWay: 3,// 现金
        activityId: '',
        remark: '',
        employeeIds: [],
        percents: [],
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
        activityId: [
          { required: true, message: "活动不能为空", trigger: "blur" },
          { type: 'number', message: "活动必须是数字", trigger: "blur" }
        ],
      },
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
      activityContents: []
    };
  },
  computed: {
    activities: function(){
      return this.$store.state.activity.activitiesAll;
    },
    employees: function(){
      return this.$store.state.employee.employeesAll;
    },
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.newActivity.employeeIds.length != this.newActivity.employeeIds.length){
            this.$message.error('输入员工绩效比例有误');
          }else{
            this.loading = true;
            this.enterFlag = false;
            this.$store
              .dispatch("addConsumeRecord", this.handleData(this.newActivity))
              .then(res => {
                if (res.code === 0) {
                  this.$message.success("添加成功");
                  setTimeout(() => {
                    this.loading = false;
                    this.$router.push({ path: "/consume-record-activity" });
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
    handleActivitySelect(val){
      let activity = this.$store.getters.getActivityFromAllById(val);
      this.newActivity.consumeMoney = activity.price;
      this.activityContents = [];

      for( let activityContent of activity.activityContentVos){
        let type, name;
        if(activityContent.type === '项目'){
          name = activityContent.relatedName;
        }else if(activityContent.type === '会员卡'){
          name = activityContent.relatedName;
        }else if(activityContent.type === '产品'){
          name = activityContent.relatedName;
        }else{
          type= 4;
          name = activityContent.content;
        }
        this.activityContents.push({
          'type': activityContent.type,
          'name': name,
          'number': activityContent.number,
          'remark': (activityContent.remark === '' || !activityContent.remark) ? '暂无备注' : activityContent.remark
        })
      }
    },
    handleData(data){
      let dataChange = {
        consumeRecordPo:{
          customerMobile: '',
          consumeType: '',
          consumeMoney: '',
          activityId: '',
          paymentWay: '',
          remark: '',
        },
        employeeIds: [],
        percents: [],
      };

      dataChange.consumeRecordPo.customerMobile = data.customerMobile;
      dataChange.consumeRecordPo.consumeType = data.consumeType;
      dataChange.consumeRecordPo.consumeMoney = data.consumeMoney;
      dataChange.consumeRecordPo.activityId = data.activityId;
      dataChange.consumeRecordPo.paymentWay = data.paymentWay;
      dataChange.consumeRecordPo.remark = data.remark;

      dataChange.employeeIds = data.employeeIds;
      dataChange.percents = data.percents;
      
      return dataChange;
    },
    loadActivityAll(){
      this.$store.dispatch("loadActivityAll").then( res => {
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
    this.loadActivityAll();
    this.loadEmployeeAll();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>