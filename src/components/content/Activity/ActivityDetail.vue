<template>
  <div class="ActivityDetail">
    <el-row class="page-title-row">
      <router-link to="/activity" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">修改活动</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="18" :md="12">
        <el-form class="new-form" :model="modActivityForm" ref="modActivityForm" label-width="110px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('modActivityForm')" v-loading="loading">
          <el-form-item label="名称" prop="name">
            <el-input v-model.trim="modActivityForm.name" placeholder="请输入名称" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="代码" prop="code">
            <el-input v-model.trim="modActivityForm.code" placeholder="请输入代码"></el-input>
          </el-form-item>
          <el-form-item label="价格(￥)" prop="price">
            <el-input v-model.number="modActivityForm.price" placeholder="请输入价格"></el-input>
          </el-form-item>
          <el-form-item label="有效期至" prop="deadline">
            <el-date-picker v-model="modActivityForm.deadline" align="center" 
              type="date" :editable="false" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model.trim="modActivityForm.remark" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item label="活动内容">
            <el-table :data="activityContents" size="mini" v-loading="loading" style="width: 100%">
              <el-table-column prop="type" label="类型"></el-table-column>
              <el-table-column prop="name" label="内容/金额"></el-table-column>
              <el-table-column prop="number" label="个数"></el-table-column>
              <el-table-column prop="remark" label="备注"></el-table-column>
              <el-table-column label="操作" width="50px;" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger"
                    @click="handleDelete(scope.$index, scope.row)">x</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="activityContentParamsDialog = true">添加活动内容</el-button>
            <el-button type="primary" @click="onSubmit('modActivityForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <ActivityContent :visible="activityContentParamsDialog" 
      v-on:closeDialog="activityContentParamsDialog = false"
      v-on:addActivityContent="handleAddActivityContent"></ActivityContent>
  </div>
</template>

<script>
import ActivityContent from './ActivityContent'
export default {
  name: "ActivityDetail",
  data() {
    return {
      modActivityForm: {
        id: '',
        name: '',
        code: '',
        price: '',
        deadline: '',
        remark: '',
        activityContentParams: []
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
        deadline: [
          { required: true, message: "有效期不能为空", trigger: "blur" },
        ],
      },
      loading: false,
      enterFlag: true, //true代表允许回车，false代表不允许回车，避免重复提交
      activityContentParamsDialog: false,
      activityContents: [],
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store.dispatch("modActivity", {
            'id': this.modActivityForm.id,
            'name': this.modActivityForm.name,
            'code': this.modActivityForm.code,
            'price': this.modActivityForm.price,
            'deadline': this.toTimeStamp(this.modActivityForm.deadline),
            'remark': this.modActivityForm.remark,
            'activityContentParams': this.modActivityForm.activityContentParams
          }).then(res => {
            if (res.code === 0) {
              this.$message.success("修改成功");
              setTimeout(() => {
                this.loading = false;
                this.$router.push({ path: "/activity" });
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
    handleAddActivityContent(payload){
      let type, name, project, customerCard, product;
      if(payload.type === 1){
        type = '项目';
        project = this.$store.getters.getProjectFromAllById(payload.relatedId);
        name = project.name;
      }else if(payload.type === 2){
        type = '会员卡';
        customerCard = this.$store.getters.getCustomerCardFromAllById(payload.relatedId);
        name = customerCard.name;
      }else if(payload.type === 3){
        type = '产品';
        product = this.$store.getters.getProductFromAllById(payload.relatedId);
        name = product.name;
      }else{
        type = '代金券';
        name = payload.content;
      }
      // let stock = this.$store.getters.getStockAllById(payload.stockId);
      this.activityContents.push({
        'type': type,
        'name': name,
        'number': payload.number,
        'remark': (payload.remark === '') ? '暂无备注' : payload.remark
      })
      this.modActivityForm.activityContentParams.push({
        'type': payload.type,
        'relatedId': payload.relatedId,
        'content': payload.content,
        'number': payload.number,
        'remark': payload.remark
      });
    },
    handleDelete(index, row){
      this.activityContents.splice(index,1);
      this.modActivityForm.activityContentParams.splice(index,1);
    },
    loadProjectAll(){
      this.$store.dispatch("loadProjectAll").then( res => {
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
    loadCustomerCardAll(){
      this.$store.dispatch("loadCustomerCardAll").then( res => {
        this.loading = false;
      }).catch( err => {
        console.log(err);
      });
    },
  },
  beforeMount: function () {
    if(this.$store.state.activity.activities.length === 0){
      //如果vuex中没有数据，则返回列表页
      this.$router.push({ path: '/activity' });
    }else{
      //从vuex中查询该id
      const activity = this.$store.getters.getActivityById(this.$route.params.id);
      
      this.modActivityForm.id = activity.id;
      this.modActivityForm.name = activity.name;
      this.modActivityForm.code = activity.code;
      this.modActivityForm.price = Number.parseInt(activity.price);
      this.modActivityForm.deadline = this.toDateObject(activity.deadline);
      this.modActivityForm.remarks = activity.remarks;
      for( let activityContent of activity.activityContentVos){
        let type, name, project, customerCard, product;
        if(activityContent.type === '项目'){
          type= 1;
          project = this.$store.getters.getProjectFromAllById(activityContent.relatedId);
          name = project.name;
        }else if(activityContent.type === '会员卡'){
          type= 2;
          customerCard = this.$store.getters.getMemberCardFromAllById(activityContent.relatedId);
          name = customerCard.name;
        }else if(activityContent.type === '产品'){
          type= 3;
          product = this.$store.getters.getProductFromAllById(activityContent.relatedId);
          name = product.name;
        }else{
          type= 4;
          name = activityContent.content;
        }
        this.activityContents.push({
          'type': activityContent.type,
          'name': name,
          'number': activityContent.number,
          'remark': (activityContent.remark === '') ? '暂无备注' : activityContent.remark
        })
        this.modActivityForm.activityContentParams.push({
          'type': type,
          'relatedId': activityContent.relatedId,
          'content': activityContent.content,
          'number': activityContent.number,
          'remark': activityContent.remark
        });
      }
    }
  },
  components: {ActivityContent}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>