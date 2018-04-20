<template>
  <div class="ProjectDetail">
    <el-row class="page-title-row">
      <router-link to="/project" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">修改美容项目</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="18" :md="12">
        <el-form class="new-form" :model="modProjectForm" ref="modProjectForm" label-width="110px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('modProjectForm')" v-loading="loading">
          <el-form-item label="名称" prop="name">
            <el-input v-model.trim="modProjectForm.name" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="代码" prop="code">
            <el-input v-model.trim="modProjectForm.code" placeholder="请输入代码"></el-input>
          </el-form-item>
          <el-form-item label="美容项目分类" prop="projectTypeId">
            <el-select v-model.number="modProjectForm.projectTypeId" placeholder="请选择美容项目分类">
              <el-option v-for="projectType in projectTypes" :key="projectType.id" :label="projectType.name" :value="projectType.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价" prop="unitPrice">
            <el-input v-model.number="modProjectForm.unitPrice" placeholder="请输入单价"></el-input>
          </el-form-item>
          <el-form-item label="绩效" prop="integral">
            <el-input v-model.number="modProjectForm.integral" placeholder="请输入绩效"></el-input>
          </el-form-item>
          <el-form-item label="实习生绩效" prop="internIntegral">
            <el-input v-model.number="modProjectForm.internIntegral" placeholder="请输入实习生绩效"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model.trim="modProjectForm.remark" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item label="项目消耗品">
            <el-table :data="projectStocks" size="mini" v-loading="loading" style="width: 100%">
              <el-table-column prop="id" label="ID" v-if="false"></el-table-column>
              <el-table-column prop="name" label="库存"></el-table-column>
              <el-table-column prop="amount" label="数量"></el-table-column>
              <el-table-column prop="unitName" label="单位"></el-table-column>
              <el-table-column label="操作" width="50px;" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger"
                    @click="handleDelete(scope.$index, scope.row)">x</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="projectStockParamsDialog = true">添加项目消耗品</el-button>
            <el-button type="primary" @click="onSubmit('modProjectForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <ProjectStock :visible="projectStockParamsDialog" 
      v-on:closeDialog="projectStockParamsDialog = false"
      v-on:addProjectStock="handleAddProjectStock"></ProjectStock>
  </div>
</template>

<script>
import ProjectStock from './ProjectStock'
export default {
  name: "ProjectDetail",
  data() {
    return {
      modProjectForm: {
        id: '',
        name: '',
        code: '',
        projectTypeId: '',
        unitPrice: '',
        integral: '',
        internIntegral: '',
        remark: '',
        projectStockParams: []
      },
      rules: {
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        code: [
          { required: true, message: "代码不能为空", trigger: "blur" }
        ],
        projectTypeId: [
          { required: true, message: "美容项目分类不能为空", trigger: "blur" },
          { type: 'number', message: "美容项目分类必须是数字", trigger: "blur" }
        ],
        unitPrice: [
          { required: true, message: "单价不能为空", trigger: "blur" },
          { type: 'number', message: "单价必须是数字", trigger: "blur" }
        ],
        integral: [
          { required: true, message: "积分不能为空", trigger: "blur" },
          { type: 'number', message: "积分必须是数字", trigger: "blur" }
        ],
        internIntegral: [
          { required: true, message: "实习生积分不能为空", trigger: "blur" },
          { type: 'number', message: "实习生积分必须是数字", trigger: "blur" }
        ]
      },
      loading: false,
      enterFlag: true, //true代表允许回车，false代表不允许回车，避免重复提交
      projectStockParamsDialog: false,
      projectStocks: [],
    };
  },
  computed: {
    projectTypes: function(){
      return this.$store.state.projectType.projectTypesAll;
    },
    stocks: function(){
      return this.$store.state.stock.stocksAll;
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store
            .dispatch("modProject", this.modProjectForm)
            .then(res => {
              if (res.code === 0) {
                this.$message.success("修改成功");
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({ path: "/project" });
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
    handleAddProjectStock(payload){
      let stock = this.$store.getters.getStockAllById(payload.stockId);
      this.projectStocks.push({
        'id': stock.id,
        'name': stock.name,
        'amount': payload.stockConsumptionAmount,
        'unitName': stock.unitName
      })
      this.modProjectForm.projectStockParams.push({
        'stockId': payload.stockId,
        'stockConsumptionAmount': payload.stockConsumptionAmount
      });
    },
    handleDelete(index, row){
      console.log(row.id);
      var arrIndex = this.projectStocks.findIndex((projectStock, index, arr) => {
        return projectStock.id === row.id;
      })
      this.projectStocks.splice(arrIndex,1);
      this.modProjectForm.projectStockParams.splice(arrIndex,1);
    },
    loadProjectTypeAll(){
      this.$store.dispatch("loadProjectTypeAll").then( res => {
        this.loading = false;
        this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    },
    loadStockAll(){
      this.$store.dispatch("loadStockAll").then( res => {
        this.loading = false;
        // console.log(this.$store.state.stock.stocksAll);
        //需要先加载所有库存
        for(let projectStock of this.modProjectForm.projectStockParams){
          // console.log(projectStock);
          let stock = this.$store.getters.getStockAllById(projectStock.stockId);
          console.log(this.projectStocks);
          this.projectStocks.push({
            'id': stock.id,
            'name': stock.name,
            'amount': projectStock.stockConsumptionAmount,
            'unitName': stock.unitName
          })
        }
      }).catch( err => {
        console.log(err);
      });
    },
  },
  beforeMount: function () {
    if(this.$store.state.project.projects.length === 0){
      //如果vuex中没有数据，则返回列表页
      this.$router.push({ path: '/project' });
    }else{
      this.loadStockAll();
      this.loadProjectTypeAll();
      //从vuex中查询该id
      const project = this.$store.getters.getProjectById(this.$route.params.id);
      this.modProjectForm.id = project.id;
      this.modProjectForm.name = project.name;
      this.modProjectForm.code = project.code;
      this.modProjectForm.projectTypeId = project.projectTypeId;
      this.modProjectForm.unitPrice = project.unitPrice;
      this.modProjectForm.integral = project.integral;
      this.modProjectForm.internIntegral = project.internIntegral;
      this.modProjectForm.remark = project.remark;
      for(let projectStock of project.projectStockVos){
        this.modProjectForm.projectStockParams.push({
          'stockId': projectStock.stockId,
          'stockConsumptionAmount': projectStock.stockConsumptionAmount
        });
      }
    }
  },
  components: {ProjectStock}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>