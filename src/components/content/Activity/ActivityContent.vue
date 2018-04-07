<template>
  <div class="ActivityContent">
    <el-dialog title="活动内容" :visible.sync="isVisible" :show-close="false"
      :close-on-click-modal="false" :close-on-press-escape="false" >
      <el-row type="flex" justify="start">
        <el-col :xs="20">
          <el-form :model="activityContent" ref="activityContent" label-width="70px" :rules="rules">
            <el-form-item label="类型" prop="type">
              <el-select v-model.number="activityContent.type" placeholder="请选择性别" @change="handleTypeChange">
                <el-option v-for="type in types" :key="type.value" :label="type.name" :value="type.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目" prop="relatedId" v-if="this.activityContent.type === 1">
              <el-select v-model.number="activityContent.relatedId" placeholder="请选择项目" filterable>
                <el-option v-for="project in projects" :key="project.id" :label="project.code+project.name" :value="project.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="会员卡" prop="relatedId" v-if="this.activityContent.type === 2">
              <el-select v-model.number="activityContent.relatedId" placeholder="请选择会员卡" filterable>
                <el-option v-for="customerCard in customerCards" :key="customerCard.id" :label="customerCard.name" :value="customerCard.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品" prop="relatedId" v-if="this.activityContent.type === 3">
              <el-select v-model.number="activityContent.relatedId" placeholder="请选择产品" filterable>
                <el-option v-for="product in products" :key="product.id" :label="product.name" :value="product.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="金额" prop="content" v-if="this.activityContent.type === 4">
              <el-input v-model.number="activityContent.content" placeholder="请输入代金券金额"></el-input>
            </el-form-item>
            <el-form-item label="个数" prop="content">
              <el-input v-model.number="activityContent.number" placeholder="请输入个数"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model.trim="activityContent.remark" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose('activityContent')">取 消</el-button>
        <el-button type="primary" @click="onSubmit('activityContent')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ActivityContent",
  props: ['visible','options'],
  data() {
    return {
      activityContent: {
        type: '',
        relatedId: '',
        content: '',
        number: '',
        remark: ''
      },
      rules: {
        type: [
          { required: true, message: "类型不能为空", trigger: "blur" },
          { type: 'number', message: "类型必须是数字", trigger: "blur" }
        ],
        number: [
          { required: true, message: "个数不能为空", trigger: "blur" },
          { type: 'number', message: "个数必须是数字", trigger: "blur" }
        ],
      },
      types: [
        {
          name: "项目",
          value: 1
        },
        {
          name: "会员卡",
          value: 2
        },
        {
          name: "产品",
          value: 3
        },
        {
          name: "代金券",
          value: 4
        }
      ],
      relatedContent: [],
    }
  },
  computed: {
    isVisible: function(){
      return this.visible;
    },
    projects: function(){
      return this.$store.state.project.projectsAll;
    },
    products: function(){
      return this.$store.state.product.productsAll;
    },
    customerCards: function(){
      return this.$store.state.customerCard.customerCardsAll;
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('addActivityContent', this.activityContent);
          this.$emit('closeDialog', false);
          this.$refs[formName].resetFields();
        } else {
          return false;
        }
      });
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
    onClose(formName){
      this.$emit('closeDialog', false);
      console.log(this.$refs[formName]);
      this.$refs[formName].resetFields();
    },
    handleTypeChange(val) {
      this.activityContent.relatedId = '';
      if( val === 1 ){
        this.loadProjectAll();
      }else if( val === 2){
        this.loadCustomerCardAll();
      }else if( val === 3 ){
        this.loadProductAll();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>