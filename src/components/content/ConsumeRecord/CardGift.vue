<template>
  <div class="CardGift">
    <el-dialog title="赠品" :visible.sync="isVisible" :show-close="false"
      :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="cardGiftForm" ref="cardGiftForm" :rules="rules">
        <el-form-item prop="type">
          <el-select v-model.number="cardGiftForm.type" placeholder="请选择类型">
            <el-option v-for="typeItem in types" :key="typeItem.value" :label="typeItem.name" :value="typeItem.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="projectId" v-if="cardGiftForm.type === 1">
          <el-select v-model.number="cardGiftForm.projectId" placeholder="请输入项目名" filterable>
            <el-option v-for="project in projects" :key="project.id" :label="project.code+'-'+project.name" :value="project.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="productId" v-if="cardGiftForm.type === 2">
          <el-select v-model.number="cardGiftForm.productId" placeholder="请输入产品名" filterable>
            <el-option v-for="product in products" :key="product.id" :label="product.code+'-'+product.name" :value="product.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="couponMoney" v-if="cardGiftForm.type === 3">
          <el-input v-model.number="cardGiftForm.couponMoney" placeholder="请输入代金券金额"></el-input>
        </el-form-item>
        <el-form-item prop="amount">
          <el-input v-model.number="cardGiftForm.amount" placeholder="请输入数量"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose('cardGiftForm')">取 消</el-button>
        <el-button type="primary" @click="onSubmit('cardGiftForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CardGift",
  props: ['visible'],
  data() {
    return {
      cardGiftForm: {
        type: '',
        projectId: '',
        productId: '',
        couponMoney: '',
        amount: ''
      },
      rules: {
        type: [
          { required: true, message: "类型不能为空", trigger: "blur" },
          { type: 'number', message: "类型必须是数字", trigger: "blur" }
        ],
        amount: [
          { required: true, message: "数量不能为空", trigger: "blur" },
          { type: 'number', message: "数量必须是数字", trigger: "blur" }
        ],
      },
      types: [
        {
          name: '项目',
          value: 1
        },
        {
          name: '产品',
          value: 2
        },
        {
          name: '代金券',
          value: 3
        },
      ]
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
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('addCardGift', this.cardGiftForm);
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
  },
  beforeMount: function () {
    this.loadProjectAll();
    this.loadProductAll();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>