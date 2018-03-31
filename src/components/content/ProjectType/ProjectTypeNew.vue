<template>
  <div class="ProjectTypeNew">
    <el-row class="page-title-row">
      <router-link to="/project-type" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">新建美容项目分类</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="newProjectTypeForm" ref="newProjectTypeForm" label-width="110px" :rules="rules" @keyup.enter.native="enterFlag && onSubmit('newProjectTypeForm')" v-loading="loading">
          <el-form-item label="名称" prop="name">
            <el-input v-model.trim="newProjectTypeForm.name" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="所属顶层分类" prop="topType">
            <el-select v-model.number="newProjectTypeForm.topType" placeholder="请选择顶层分类">
              <el-option v-for="topType in topTypes" :key="topType.value" :label="topType.name" :value="topType.value">
              </el-option>
            </el-select>
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
  name: "ProjectTypeNew",
  data() {
    return {
      newProjectTypeForm: {
        name: '',
        topType: ''
      },
      rules: {
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        topType: [
          { required: true, message: "顶层分类不能为空", trigger: "blur" },
          { type: 'number', message: "顶层分类必须是数字", trigger: "blur" }
        ]
      },
      topTypes:[
        {
          name: '美容',
          value: 1
        },
        {
          name: '美甲',
          value: 2
        },
        {
          name: '美睫',
          value: 3
        },
      ],
      loading: false,
      enterFlag: true //true代表允许回车，false代表不允许回车，避免重复提交
    };
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>