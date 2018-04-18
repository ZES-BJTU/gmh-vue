<template>
  <div class="CRProject">
    <el-dialog title="项目" :visible.sync="isVisible" :show-close="false"
      :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form :model="projectParams" ref="projectParams" :rules="rules">
          <el-form-item prop="projectId">
            <el-select v-model.number="projectParams.projectId" filterable 
              placeholder="请输入项目">
              <el-option v-for="project in projects" :key="project.id" :label="project.code+'-'+project.name" :value="project.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  prop="amount">
            <el-input v-model.number="projectParams.amount" placeholder="请输入数量"></el-input>
          </el-form-item>
          <el-form-item prop="operatorId">
            <el-select v-model.number="projectParams.operatorId" filterable placeholder="请输入操作员">
              <el-option v-for="employee in employees" :key="employee.id" 
                :label="employee.name" :value="employee.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose('projectParams')">取 消</el-button>
        <el-button type="primary" @click="onSubmit('projectParams')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CRProject",
  props: ['visible'],
  data() {
    return {
      projectParams: {
        projectId: '',
        amount: '',
        operatorId: ''
      },
      rules: {
        projectId: [
          { required: true, message: "项目不能为空", trigger: "blur" },
          { type: 'number', message: "项目必须是数字", trigger: "blur" }
        ],
        amount: [
          { required: true, message: "数量不能为空", trigger: "blur" },
          { type: 'number', message: "数量必须是数字", trigger: "blur" }
        ],
        operatorId: [
          { required: true, message: "操作员不能为空", trigger: "blur" },
          { type: 'number', message: "操作员必须是数字", trigger: "blur" }
        ],
      },
      
    }
  },
  computed: {
    isVisible: function(){
      return this.visible;
    },
    projects: function(){
      return this.$store.state.project.projectsAll;
    },
    employees: function(){
      return this.$store.state.employee.employeesAll;
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('addCRProject', this.projectParams);
          this.$emit('closeDialog', false);
          this.$refs[formName].resetFields();
        } else {
          return false;
        }
      });
    },
    onClose(formName){
      this.$emit('closeDialog', false);
      this.$refs[formName].resetFields();
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>