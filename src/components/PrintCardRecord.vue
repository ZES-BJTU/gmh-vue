<template>
  <div class="PrintCardRecord">
    <el-container>
      <el-container class="home-container">
        <el-container>
          <el-main>
            <div><img  class="print-img" src="../assets/images/logo-print.png" alt=""></div>
            <div class="print-store-name">{{store.name}}</div>
            <div class="print-address">{{store.address}}</div>
            <div class="print-phone">{{store.phone}}</div>
            <div class="print-time">{{customer.time}}</div>
            <div class="print-type">消费类型：办卡</div>
            <div class="print-mobile">{{customer.mobile}}</div>
            <div class="print-name">{{customer.name}}</div>
            <div class="record-data">
              <div class="column">
                <div class="record-data-head">流水号</div>
                <div class="record-data-item">{{tableData.tradeSerialNumber}}</div>
              </div>
              <div class="column">
                <div class="record-data-head">消费金额</div>
                <div class="record-data-item">{{tableData.consumeMoney}}</div>
              </div>
              <div class="column">
                <div class="record-data-head">支付方式</div>
                <div class="record-data-item">{{tableData.paymentWayName}}</div>
              </div>
              <div class="column">
                <div class="record-data-head">消费时间</div>
                <div class="record-data-item">{{tableData.consumeTime}}</div>
              </div>
              <div class="column">
                <div class="record-data-head">是否修改</div>
                <div class="record-data-item">{{tableData.isModified}}</div>
              </div>
              <div class="column">
                <div class="record-data-head">备注</div>
                <div class="record-data-item">{{tableData.remark}}</div>
              </div>
              <div class="column">
                <div class="record-data-head">卡名</div>
                <div class="record-data-item">{{tableData.cardName}}</div>
              </div>
            </div>
            <div class="second-part">赠品</div>
            <div class="record-data">
              <div class="column">
                <div class="record-data-head">类型</div>
                <div class="record-data-item"  v-for="(gift,index) in giftData" :key="index">{{gift.type}}</div>
              </div>
              <div class="column">
                <div class="record-data-head">内容/金额</div>
                <div class="record-data-item"  v-for="(gift,index) in giftData" :key="index">{{gift.name}}</div>
              </div>
              <div class="column">
                <div class="record-data-head">数量</div>
                <div class="record-data-item"  v-for="(gift,index) in giftData" :key="index">{{gift.amount}}</div>
              </div>
            </div>
            <div>
              <span class="print-wechat"><img class="print-wechat-img" src="../assets/images/wechat.jpg" alt=""></span>
              <span class="print-wechat-2">
                <span class="t1">Welcome to BRAND NEW</span>
                <span class="t2">BRAND NEW LIFE</span>
                <span class="t3">科技 美丽人生</span>
                <span class="b">www.brandnew-gmh.com</span>
              </span>
              <qriously class="questionnaire" v-if="url != ''" :value="url" :size="90" />
              <span class="print-wechat-2" v-if="url != ''">
                <span class="t1">请扫码填写调查问卷</span>
              </span>
            </div>
            <div class="print-text">特别提示：＊请凭此消费凭证于当月内开具发票。＊产品售出，已开封不退不换，未开封可换货，请凭此消费凭证或发票(如已开具)办理换货。＊所有优惠卡及优惠活动，一经售出，不退不换 ＊成员卡一个月内可进行卡项升级＊最终解释权归本公司所有。</div>
            <div class="print-text-en">Special tips: *Please get you invoice by this receipt within the same month. *Products sold, if the package has been opened, do not refund.If the packaging is complete, the product can be exchanged, please use this receipt or invoice (if issued) for replacement. *All discount cards and promotions,no refund, no change.*The final explanation is owned by the company.</div>
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
      customer: '',
      store: '',
      tableData: '',
      giftData: [],
      url: ''
    };
  },
  methods: {
    loadData(data){
      this.customer = {
        'name': '消费者姓名：' + data.consumeRecordVo.customerName,
        'mobile': '消费者手机号：' + data.consumeRecordVo.customerMobile,
        'time': '打印时间：' + this.toDatetimeMin(Date.parse(new Date()))
      }
      this.store = {
        'name': '店名：'+ data.storeVo.name,
        'address': '地址：'+ data.storeVo.address,
        'phone': '电话：' + data.storeVo.phone,
      }
      this.tableData = {
        'id': data.consumeRecordVo.id,
        'tradeSerialNumber': data.consumeRecordVo.tradeSerialNumber,
        'consumeMoney': data.consumeRecordVo.consumeMoney,
        'paymentWayName': data.consumeRecordVo.paymentWayName,
        'isModified': data.consumeRecordVo.isModified === 0 ? '否' : '是',
        'consumeTime': this.toDatetimeMin( data.consumeRecordVo.consumeTime),
        'remark': data.consumeRecordVo.remark ? data.consumeRecordVo.remark : '暂无备注',
        'cardName': data.consumeRecordVo.consumeRecordDetailUnion[0].cardName
      }
      for(let content of data.consumeRecordVo.consumeRecordGiftUnion){
        if(content.productId){
          this.giftData.push({
            'type': '产品',
            'name': content.productName,
            'amount': content.productAmount,
          })
        }else if(content.projectId){
          this.giftData.push({
            'type': '项目',
            'name': content.projectName,
            'amount': content.projectAmount,
          })
        }else{
          this.giftData.push({
            'type': '代金券',
            'name': content.couponMoney,
            'amount': content.couponAmount,
          })
        }
      }
      if(data.url){
        if(data.url != ''){
          this.url = data.url
        }
      }
    },
  },
  beforeMount: function(){
    let data = this.$store.state.consumeRecord.consumeRecordPrint;
    if(data){
      this.loadData(data);
    }else{
      this.$message.error('请先查询消费记录！');
      setTimeout(() => {
        this.$router.push({ path: '/consume-record-card'});
      },2000)
    }
  },
  mounted: function(){
    if(this.$store.state.consumeRecord.consumeRecordPrint){
      setTimeout(() => {
          window.print();
      },1000)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home-container {
  margin-top: 1px;
}
.record-data {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-top:20px;
}
.record-data-column {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
.record-data-head {
 font-weight: bold;
}
.record-data-item, .record-data-head {
  flex-basis: 100%;
  margin-bottom: 20px;
}
.second-part {
  margin-top: 30px;
}

.print-img {
  height: 100px;
  margin-bottom: 20px;
}
.print-mobile {
  margin-top: 10px;
}

.print-text {
  margin-top: 20px;
}
.print-text-en {
  margin-top: 10px;
}

.print-wechat {
  display: inline-block;
  vertical-align: top;
  margin-top: 20px;
}

.print-wechat-img {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.print-wechat-2 {
  display: inline-block;
  vertical-align: top;
  margin-top: 20px;
  height: 80px;
  width: 200px;
  margin-left: 15px;
  position: relative;
}
.print-wechat-2 .t1 {
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
  font-size: 10px;
}
.print-wechat-2 .t2 {
  position: absolute;
  width: 100%;
  top: 15px;
  left: 0px;
  font-size: 10px;
}
.print-wechat-2 .t3 {
  position: absolute;
  width: 100%;
  top: 30px;
  left: 0px;
  font-size: 10px;
}
.print-wechat-2 .b {
  position: absolute;
  width: 100%;
  bottom: 0px;
  font-size: 10px;
}

.questionnaire{
  display: inline-block;
  vertical-align: top;
  margin-top: 15px;
}
</style>
