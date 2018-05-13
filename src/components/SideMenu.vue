<template>
	<div class="SideMenu">
		<el-aside class="home-aside" width="200px">
			<el-row>
				<el-col :span="24">
					<el-menu id="sidemenu" :default-active="activeMenu" :unique-opened="true">
						<router-link to="/store" v-if="role==='管理员'">
							<el-menu-item index="1">
								<span slot="title">店铺</span>
							</el-menu-item>

							<div class="hr"></div>
						</router-link>

						<router-link to="/principal" v-if="role==='管理员'">
							<el-menu-item index="2">
								<span slot="title">店铺负责人</span>
							</el-menu-item>

							<div class="hr"></div>
						</router-link>


						<!-- <router-link to="/chart" v-if="role==='店长'">
							<el-menu-item index="3">
								<span slot="title">首页</span>
							</el-menu-item>

							<div class="hr"></div>
						</router-link> -->

						<router-link to="/reception" v-if="role==='店长'">
							<el-menu-item index="4">
								<span slot="title">前台</span>
							</el-menu-item>

							<div class="hr"></div>
						</router-link>


						<router-link to="/operator" v-if="role==='店长'">
							<el-menu-item index="5">
								<span slot="title">操作员</span>
							</el-menu-item>

							<div class="hr"></div>
						</router-link>

						<router-link to="/appointment" v-if="role==='店长' || role==='前台'">
							<el-menu-item index="6">
								<span slot="title">预约</span>
							</el-menu-item>

							<div class="hr"></div>
						</router-link>

						<el-submenu index="7" v-if="role==='店长' || role==='前台'">
							<template slot="title">
								<span>消费记录</span>
							</template>

							<router-link to="/consume-record-card">
								<div class="hr"></div>

								<el-menu-item index="7-1">
									<span slot="title">办卡消费记录</span>
								</el-menu-item>

								<div class="hr"></div>
							</router-link>

							
							<router-link to="/consume-record-product">
								<el-menu-item index="7-2">
									<span slot="title">买产品消费记录</span>
								</el-menu-item>

								<div class="hr"></div>
							</router-link>
							
							<router-link to="/consume-record-project">
								<el-menu-item index="7-3">
									<span slot="title">做项目消费记录</span>
								</el-menu-item>

								<div class="hr"></div>
							</router-link>
							
							<router-link to="/consume-record-activity">
								<el-menu-item index="7-4">
									<span slot="title">参加活动消费记录</span>
								</el-menu-item>

								<div class="hr"></div>
							</router-link>

							<router-link to="/consume-record-card-history">
								<el-menu-item index="7-5">
									<span slot="title">办卡修改记录</span>
								</el-menu-item>

								<div class="hr"></div>
							</router-link>

							<router-link to="/consume-record-product-history">
								<el-menu-item index="7-6">
									<span slot="title">买产品修改记录</span>
								</el-menu-item>

								<div class="hr"></div>
							</router-link>

							<router-link to="/consume-record-project-history">
								<el-menu-item index="7-7">
									<span slot="title">做项目修改记录</span>
								</el-menu-item>

								<div class="hr"></div>
							</router-link>

							<router-link to="/consume-record-activity-history">
								<el-menu-item index="7-8">
									<span slot="title">参加活动修改记录</span>
								</el-menu-item>
							</router-link>

						</el-submenu>

						<div class="hr" v-if="role==='店长' || role==='前台'"></div>

						<el-submenu index="8" v-if="role==='店长' || role==='前台'">
							<template slot="title">
								<span>客户</span>
							</template>

							<router-link to="/customer">
								<div class="hr"></div>

								<el-menu-item index="8-1">
									<span slot="title">客户</span>
								</el-menu-item>

								<div class="hr"></div>
							</router-link>

							<router-link to="/customer-card">
								<el-menu-item index="8-2">
									<span slot="title">客户会员卡</span>
								</el-menu-item>

								<div class="hr"></div>
							</router-link>

							<router-link to="/customer-activity">
								<el-menu-item index="8-3">
									<span slot="title">客户活动</span>
								</el-menu-item>

								<div class="hr"></div>
							</router-link>

							<router-link to="/customer-card-change-record">
								<el-menu-item index="8-4">
									<span slot="title">客户会员卡信息变动</span>
								</el-menu-item>
							</router-link>
						</el-submenu>

						<div class="hr" v-if="role==='店长' || role==='前台'"></div>

						<el-submenu index="9" v-if="role==='店长' || role==='前台'">
							<template slot="title">
								<span>库存</span>
							</template>

							<router-link to="/stock-type">
								<div class="hr"></div>

								<el-menu-item index="9-1">
									<span slot="title">库存分类管理</span>
								</el-menu-item>

								<div class="hr"></div>
							</router-link>

							<router-link to="/stock">
								<el-menu-item index="9-2">
									<span slot="title">库存管理</span>
								</el-menu-item>

								<div class="hr"></div>
							</router-link>
							
							<router-link to="/stock-amount">
								<el-menu-item index="9-3">
									<span slot="title">本店库存</span>
								</el-menu-item>
							</router-link>

						</el-submenu>
						
						<div class="hr" v-if="role==='店长' || role==='前台'"></div>

						<el-submenu index="10" v-if="role==='店长' || role==='前台'">
							<template slot="title">
								<span>项目</span>
							</template>

							<router-link to="/project-type">
								<div class="hr"></div>

								<el-menu-item index="10-1">
									<span slot="title">项目分类管理</span>
								</el-menu-item>

								<div class="hr"></div>
							</router-link>
							
							<router-link to="/project">
								<el-menu-item index="10-2">
									<span slot="title">项目管理</span>
								</el-menu-item>
							</router-link>
						</el-submenu>

						<div class="hr" v-if="role==='店长' || role==='前台'"></div>

						<router-link to="/member-card" v-if="role==='店长'">
							<el-menu-item index="11">
								<span slot="title">会员卡</span>
							</el-menu-item>

							<div class="hr"></div>
						</router-link>

						<el-submenu index="12" v-if="role==='店长' || role==='前台'">
							<template slot="title">
								<span>产品</span>
							</template>

							<router-link to="/product-type">
								<div class="hr"></div>

								<el-menu-item index="12-1">
									<span slot="title">产品分类管理</span>
								</el-menu-item>

								<div class="hr"></div>
							</router-link>

							<router-link to="/product">
								<el-menu-item index="12-2">
									<span slot="title">产品管理</span>
								</el-menu-item>

								<div class="hr"></div>
							</router-link>

							<router-link to="/product-amount">
								<el-menu-item index="12-3">
									<span slot="title">本店产品</span>
								</el-menu-item>
							</router-link>
						</el-submenu>

						<div class="hr" v-if="role==='店长' || role==='前台'"></div>

						<router-link to="/activity" v-if="role==='店长'">
								<el-menu-item index="13">
										<span slot="title">活动</span>
								</el-menu-item>

								<div class="hr"></div>
						</router-link>

						<router-link to="/employee" v-if="role==='店长' || role==='前台'">
							<el-menu-item index="14">
								<span slot="title">员工</span>
							</el-menu-item>

							<div class="hr"></div>
						</router-link>

					</el-menu>
				</el-col>
			</el-row>
		</el-aside>
	</div>
</template>

<script>
export default {
  name: "SideMenu",
  data() {
    return {};
  },
  computed: {
    role: function() {
      // 管理员 店长 前台 操作员
      return this.getRoleSession();
    },
    activeMenu: function() {
      const route = this.$route.fullPath;
      if (route.match("store")) {
        // 管理员-店铺
        return "1";
      } else if (route.match("principal")) {
        //管理员-店铺负责人
        return "2";
      } else if (route.match("chart")) {
        // 店长-数据查看
        return "3";
      } else if (route.match("reception")) {
        // 店长-前台
        return "4";
      } else if (route.match("operator")) {
        // 店长-操作员
        return "5";
      } else if (route.match("appointment")) {
        // 店长|前台-预约
        return "6";
      } else if (route.match("consume-record-activity-history")) {
				// 店长|前台-参加活动修改记录
        return "7-8"; //调整顺序是为了优先匹配consume-record-activity-history
      } else if (route.match("consume-record-project-history")) {
				// 店长|前台-做项目修改记录
        return "7-7"; //调整顺序是为了优先匹配consume-record-project-history
      } else if (route.match("consume-record-product-history")) {
				// 店长|前台-买活动修改记录
        return "7-6"; //调整顺序是为了优先匹配consume-record-product-history
      } else if (route.match("consume-record-card-history")) {
				// 店长|前台-办卡修改记录
        return "7-5"; //调整顺序是为了优先匹配consume-record-card-history
      } else if (route.match("consume-record-card")) {
        // 店长|前台-办卡消费记录
        return "7-1";
      } else if (route.match("consume-record-product")) {
        // 店长|前台-办卡消费记录
        return "7-2";
      } else if (route.match("consume-record-project")) {
        // 店长|前台-买产品消费记录
        return "7-3";
      } else if (route.match("consume-record-activity")) {
        // 店长|前台-参加活动消费记录
        return "7-4";
      } else if (route.match("customer-card-change")) {
        // 店长|前台-客户会员卡信息变动
        return "8-4"; //调整顺序是为了优先匹配customer-card-change
      }else if (route.match("customer-activity")) {
        // 店长|前台-客户活动
        return "8-3"; //调整顺序是为了优先匹配customer-activity
      } else if (route.match("customer-card")) {
        // 店长|前台-客户会员卡
        return "8-2"; //调整顺序是为了优先匹配customer-card
      } else if (route.match("customer")) {
        // 店长|前台-客户
        return "8-1";
      }else if (route.match("stock-type")) {
        // 店长|前台-库存分类
        return "9-1";
      } else if (route.match("stock-amount")) {
        // 店长|前台-本店库存
        return "9-3"; // 调整顺序是为了优先匹配stock-amount
      } else if (route.match("stock")) {
        // 店长|前台-库存
        return "9-2";
      } else if (route.match("project-type")) {
        // 店长|前台-美容项目分类
        return "10-1";
      } else if (route.match("project")) {
        // 店长|前台-美容项目
        return "10-2";
      } else if (route.match("member-card")) {
        // 店长|前台-会员卡
        return "11";
      } else if (route.match("product-type")) {
        // 店长|前台-产品分类
        return "12-1";
      } else if (route.match("product-amount")) {
        // 店长|前台-本店产品
        return "12-3";// 调整顺序是为了优先匹配product-amount
      } else if (route.match("product")) {
        // 店长|前台-产品管理
        return "12-2";
      } else if (route.match("activity")) {
        // 店长|前台-活动
        return "13";
      } else if (route.match("employee")) {
        //  店长|-员工
        return "14";
      } else if (route.match("employee-grade")) {
        //  店长|-员工绩效
        return "15";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.SideMenu {
  position: fixed;
}
.hr{ height:1px;border:none;border-top:1px solid #e6e6e6;margin: 0 20px;}
#sidemenu{
	height: calc(100vh - 60px);
}
</style>