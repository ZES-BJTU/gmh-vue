<template>
  <div class="home">
    <el-container>
      <el-header>
        <home-header></home-header>
      </el-header>
      <el-container class="home-container">
        <side-menu></side-menu>
        <el-container>
          <el-main>
            <router-view></router-view>
            <el-dialog title="预约提醒" :visible.sync="dialogVisible"
            :close-on-click-modal="false" :close-on-press-escape="false" width="70%">
              <el-table :data="dialogData" size="medium" style="width: 100%">
                <el-table-column prop="customerName" label="姓名"></el-table-column>
                <el-table-column prop="customerMobile" label="手机" width="120px;"></el-table-column>
                <el-table-column prop="customerGender" label="性别" width="50px;"></el-table-column>
                <el-table-column prop="isLine" label="点排" width="50px;"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column prop="projects" label="项目">
                  <template slot-scope="scope">
                      <div v-for="appointmentProject in scope.row.appointmentProjects">
                        {{appointmentProject.projectName}}
                      </div>
                  </template>
                </el-table-column>
                <el-table-column prop="employees" label="员工">
                  <template slot-scope="scope">
                      <div v-for="appointmentProject in scope.row.appointmentProjects">
                        {{appointmentProject.employeeName}}
                      </div>
                  </template>
                </el-table-column>
                <el-table-column prop="beginTime" label="开始时间" width="145px;" :formatter="handleBeginTime"></el-table-column>
                <el-table-column prop="endTime" label="结束时间" width="145px;" :formatter="handleEndTime"></el-table-column>
              </el-table>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onClose('')">确 定</el-button>
              </span>
            </el-dialog>
          </el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomeHeader from './HomeHeader'
import SideMenu from './SideMenu'
export default {
  name: "Home",
  data() {
    return {
      activeIndex: "1",
      dialogVisible: false,
      dialogData: []
    };
  },
  computed: {
    role: function(){
      return this.getRoleSession();
    }
  },
  methods: {
    handleBeginTime(row, column){
      let beginTimes = '';
      for( let appointmentProject of row.appointmentProjects){
        beginTimes += this.toDatetimeMin(appointmentProject.beginTime);
      }
      return beginTimes;
    },
    handleEndTime(row, column){
      let endTimes = '';
      for( let appointmentProject of row.appointmentProjects){
        endTimes += this.toDatetimeMin(appointmentProject.endTime);
      }
      return endTimes;
    },
    onClose(){
      this.dialogVisible = false;
      this.dialogData = [];
    }
  },
  beforeMount: function(){
    if(this.getRoleSession() === '前台'){
      let websocket = null;
      if ('WebSocket' in window) {
        console.log('客户端支持websocket');
        // websocket = new WebSocket("ws://localhost:8080/appointment/remind/" + this.getTokenSession());
        websocket = new WebSocket("ws://39.106.234.57:8080/appointment/remind/" + this.getTokenSession());
      } else {
        this.$message.error('当前浏览器不支持websocket');
      }
      websocket.onopen = function() {
        console.log('建立连接成功');
      }
      websocket.onclose = function() {
        console.log('释放连接成功');
      }
      websocket.onerror = function() {
        console.log('释放连接失败');
      }
      websocket.onmessage = (event) => {
        this.dialogData = [];
        this.dialogVisible = true;
        let appointments = JSON.parse(event.data).data;
        for( let appointment of appointments){
          this.dialogData.push({
            'customerName': appointment.appointmentPo.customerName,
            'customerMobile': appointment.appointmentPo.customerMobile,
            'customerGender': (appointment.appointmentPo.customerGender === 1 ? '男' : '女'),
            'isLine': (appointment.appointmentPo.isLine === 1 ? '是' : '否'),
            'remark': (appointment.appointmentPo.remarks ? appointment.appointmentPo.remarks : '暂无备注'),
            'appointmentProjects': appointment.appointmentProjects
          });
        }
      }

    }
  },
  components: {HomeHeader, SideMenu}
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
.el-main{
  width: calc(100% - 200px);
  margin-left: 200px;
}
.el-footer{
  // background-color: red;
  position: fixed;
  bottom: 0px;
  width: calc(100% - 200px);
  text-align: center;
  line-height: 60px;
}
</style>
