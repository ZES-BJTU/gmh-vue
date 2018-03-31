<template>
  <div class="ProjectNew">
    <el-row class="page-title-row">
      <router-link to="/project-type" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">新建美容项目</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="newProjectForm" ref="newProjectForm" label-width="110px" 
          :rules="rules" @keyup.enter.native="enterFlag && onSubmit('newProjectForm')" v-loading="loading">
          <el-form-item label="名称" prop="name">
            <el-input v-model.trim="newProjectForm.name" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="代码" prop="code">
            <el-input v-model.trim="newProjectForm.code" placeholder="请输入代码"></el-input>
          </el-form-item>
          <el-form-item label="美容项目分类" prop="projectTypeId">
            <el-select v-model.number="newProjectForm.projectTypeId" placeholder="请选择美容项目分类">
              <el-option v-for="projectType in projectTypes" :key="projectType.id" :label="projectType.name" :value="projectType.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价" prop="unitPrice">
            <el-input v-model.number="newProjectForm.unitPrice" placeholder="请输入单价"></el-input>
          </el-form-item>
          <el-form-item label="积分" prop="integral">
            <el-input v-model.number="newProjectForm.integral" placeholder="请输入积分"></el-input>
          </el-form-item>
          <el-form-item label="实习生积分" prop="internIntegral">
            <el-input v-model.number="newProjectForm.internIntegral" placeholder="请输入实习生积分"></el-input>
          </el-form-item>
          <el-form-item label="项目消耗品">
            <el-select v-model="newProjectForm.projectStockParams" filterable 
              remote placeholder="请输入关键词" :remote-method="searchStocks">
              <el-option v-for="stock in stocks" :key="stock.id" :label="stock.name" :value="stock.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model.trim="newProjectForm.remark" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('newProjectTypeForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ProjectNew",
  data() {
    return {
      newProjectForm: {
        name: '',
        code: '',
        projectTypeId: '',
        unitPrice: '',
        integral: '',
        internIntegral: '',
        remark: '',
        projectStockParams: ''
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
      stocks: [],
      loading: false,
      enterFlag: true, //true代表允许回车，false代表不允许回车，避免重复提交
      filterable: true,
      remote: true,
    };
  },
  computed: {
    projectTypes: function(){
      return this.$store.state.projectType.projectTypesAll;
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store
            .dispatch("addProjectType", this.newProjectTypeForm)
            .then(res => {
              if (res.code === 0) {
                this.$message.success("添加成功");
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({ path: "/project-type" });
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
    searchStocks(query) {
      if (query !== '') {
        this.stocks = this.$store.getters.getStockByName(query);
      } else {
        this.stocks = this.$store.state.stock.stocksAll;
      }
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
        // this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    },
  },
  beforeMount: function () {
    this.loadStockAll();
    this.loadProjectTypeAll();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>