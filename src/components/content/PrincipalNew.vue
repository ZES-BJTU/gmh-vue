<template>
  <div class="PrincipalNew">
    <el-row class="page-title-row">
      <router-link to="/principal" class="page-title-back">
        <i class="el-icon-back"></i> 返回</router-link>
      <span class="page-title">新建店铺负责人</span>
    </el-row>

    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form class="new-form" :model="newPrincipalForm" ref="newPrincipalForm" label-width="80px" :rules="rules" @keyup.enter.native="enterFlag && onSubmit('newPrincipalForm')" v-loading="loading">
          <el-form-item label="姓名" prop="name">
            <el-input v-model.trim="newPrincipalForm.name" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model.trim="newPrincipalForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model.number="newPrincipalForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model.number="newPrincipalForm.gender" placeholder="请选择性别">
              <el-option v-for="gender in genders" :key="gender.value" :label="gender.label" :value="gender.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属店铺" prop="storeId">
            <el-select v-model.number="newPrincipalForm.storeId" placeholder="请选择店铺">
              <el-option v-for="store in stores" :key="store.id" :label="store.name" :value="store.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model.trim="newPrincipalForm.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('newPrincipalForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import httpServer from "@/lib/axios";
export default {
  name: "PrincipalNew",
  data() {
    return {
      newPrincipalForm: {
        role: "2", //1.管理员 2.店长 3.前台 4.操作员
        name: "",
        email: "",
        mobile: "",
        gender: "",
        storeId: "",
        remark: ""
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
        ],
        storeId: [
          { required: true, message: "所属店铺不能为空", trigger: "change" }
        ]
      },
      loading: false,
      enterFlag: true //true代表允许回车，false代表不允许回车，避免重复提交
    };
  }, 
  computed: {
    stores: function(){
      return this.$store.state.store.storesAll;
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.enterFlag = false;
          this.$store
            .dispatch("addPrincipal", this.newPrincipalForm)
            .then(res => {
              if (res.code === 0) {
                this.$message.success("添加成功");
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({ path: "/principal" });
                }, 1000);
              }
            })
            .catch(err => {
              this.loading = false;
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    loadStoreAll(){
      this.$store.dispatch("loadStoreAll").then( res => {
        this.loading = false;
        this.$message.success('查询成功');
      }).catch( err => {
        console.log(err);
      });
    }
  },
  beforeMount: function () {
    this.loadStoreAll();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>