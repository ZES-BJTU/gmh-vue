<template>
  <div class="ActivityNew">
    <el-row class="page-title-row">
      <router-link to="/activity" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">新建活动</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="18" :md="12">
        <el-form class="new-form" :model="newActivityForm" ref="newActivityForm" label-width="110px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('newActivityForm')" v-loading="loading">
          <el-form-item label="名称" prop="name">
            <el-input v-model.trim="newActivityForm.name" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="代码" prop="code">
            <el-input v-model.trim="newActivityForm.code" placeholder="请输入代码"></el-input>
          </el-form-item>
          <el-form-item label="价格(￥)" prop="code">
            <el-input v-model.trim="newActivityForm.price" placeholder="请输入价格"></el-input>
          </el-form-item>
          <el-form-item label="有效期至" prop="deadline">
            <el-date-picker v-model="newActivityForm.deadline" align="center" 
              type="date" :editable="false" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model.trim="newActivityForm.remark" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item label="活动内容">
            <el-table :data="activityContents" size="mini" v-loading="loading" style="width: 100%">
              <el-table-column prop="type" label="类型"></el-table-column>
              <el-table-column prop="name" label="内容/金额"></el-table-column>
              <el-table-column prop="number" label="个数"></el-table-column>
              <el-table-column prop="reamrk" label="备注"></el-table-column>
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
            <el-button type="primary" @click="onSubmit('newActivityForm')">提交</el-button>
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
  name: "ActivityNew",
  data() {
    return {
      newActivityForm: {
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
  computed: {
    // projectTypes: function(){
    //   return this.$store.state.projectType.projectTypesAll;
    // },
    // stocks: function(){
    //   return this.$store.state.stock.stocksAll;
    // }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store.dispatch("addActivity", this.newActivityForm)
            .then(res => {
              if (res.code === 0) {
                this.$message.success("添加成功");
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
      }else if(payload === 3){
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
        'remark': payload.remark === '' ? '暂无备注' : payload.remark
      })
      this.newActivityForm.activityContentParams.push({
        'type': payload.type,
        'relatedId': payload.relatedId,
        'content': payload.content,
        'number': payload.number,
        'remark': payload.remark
      });
    },
    handleDelete(index, row){
      this.activityContents.splice(index,1);
      this.newActivityForm.activityContentParams.splice(index,1);
    },
  },
  beforeMount: function () {
    // this.loadStockAll();
    // this.loadProjectTypeAll();
  },
  components: {ActivityContent}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>