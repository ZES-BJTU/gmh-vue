<template>
  <div class="PrintCardRecord">
    <el-container>
      <el-container class="home-container">
        <el-container>
          <el-main>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "PrintCardRecord",
  data() {
    return {
      recordData: ''
    };
  },
  methods: {
    loadEmployeeAll(){
      this.$store.dispatch("loadEmployeeAll").then( res => {
        for(let employee of res.data){
          this.employees.push(employee);
        }
      }).catch( err => {
        console.log(err);
      });
    },
  },
  beforeMount: function(){
    this.recordData = this.$store.state.consumeRecord.consumeRecordPrint
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.account-item{
  float: right;
}
.home-container {
  margin-top: 1px;
}
.appointment-box{
  margin: 20px 0;
}
.box {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}

.column {
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
}
.item{
  margin: 10px 0;
}
.time-icon{
  margin-right: 5px;
}
</style>
