<template>
  <div class="ReceptionDetail">
    <el-row class="page-title-row">
      <router-link to="/reception" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">编辑前台</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="modReceptionForm" ref="modReceptionForm" label-width="80px" :rules="rules" @keyup.enter.native="enterFlag && onSubmit('modReceptionForm')" v-loading="loading">
          <el-form-item label="姓名" prop="name">
            <el-input v-model.trim="modReceptionForm.name" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model.trim="modReceptionForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model.number="modReceptionForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model.number="modReceptionForm.gender" placeholder="请选择性别">
              <el-option v-for="gender in genders" :key="gender.value" :label="gender.label" :value="gender.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model.trim="modReceptionForm.remark" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('modReceptionForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ReceptionDetail",
  data() {
    return {
      modReceptionForm: {
        id: '',
        role: '3', //1.管理员 2.店长 3.前台 4.操作员
        name: '',
        email: '',
        mobile: '',
        gender: '',
        remark: ''
      },
      genders: [
        {
          label: "男",
          value: 1
        },
        {
          label: "女",
          value: 0
        }
      ],
      rules: {
        name: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "手机不能为空", trigger: "blur" },
          { type: "number", message: "请输入正确的数字", trigger: "blur" }
        ],
        gender: [
          { required: true, message: "性别不能为空", trigger: "change" }
        ]
      },
      loading: false,
      enterFlag: true //true代表允许回车，false代表不允许回车，避免重复提交
    };
  }, 
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store.dispatch("modUser", this.modReceptionForm).then( res => {
            if( res.code === 0){
              this.$message.success('修改成功');
              setTimeout(() => {
                this.loading = false;
                this.$router.push({ path: '/reception' });
              },2000)
            }
          }).catch( err => {
            this.loading = false;
            this.enterFlag = true;
            console.log(err);
          });
        } else {
          return false;
        }
      });
    }
  },
  beforeMount: function () {
    if(this.$store.state.user.users.length === 0){
      //如果vuex中没有数据，则返回列表页
      this.$router.push({ path: '/reception' });
    }else{
      //从vuex中查询该id
      const user = this.$store.getters.getUserById(this.$route.params.id);
      this.modReceptionForm.id = user.id;
      this.modReceptionForm.name = user.name;
      this.modReceptionForm.email = user.email;
      this.modReceptionForm.mobile = Number.parseInt(user.mobile);
      this.modReceptionForm.gender = ( user.gender === '男' ? 1 : 0);
      this.modReceptionForm.storeId = user.storeId;
      this.modReceptionForm.remark = user.remark;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>