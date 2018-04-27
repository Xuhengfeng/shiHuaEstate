/*
 * @Author: 徐横峰 
 * @Date: 2018-04-26 16:05:45 
 * @Last Modified by: 564297479@qq.com
 * @Last Modified time: 2018-04-27 20:45:03
 */
import Vue from 'vue'
import Router from 'vue-router'


const home = resolve => require(['components/home/home'], resolve)// 首页
const login = resolve => require(['components/home/login'], resolve)//登录
const register = resolve => require(['components/home/register'], resolve)//注册
const forget = resolve => require(['components/home/forget'], resolve)//忘记

const mapSearch = resolve => require(['components/mapSearch/mapSearchNew'], resolve)//地图找房
// const mapSearch = resolve => require(['components/mapSearch/mapSearch'], resolve)//地图找房
const searchlist = resolve => require(['components/searchlist/searchlist'], resolve)//搜索
const buyhouse = resolve => require(['components/buyhouse/buyhouse'], resolve)//二手房
const twohandhousedetail = resolve => require(['components/buyhouse/twohandhousedetail'], resolve)//我要买房详情
const renthouse = resolve => require(['components/renthouse/renthouse'], resolve)//我要租房
const renthousedetail = resolve => require(['components/renthouse/renthousedetail'], resolve)//我要租房详情
const sellrent = resolve => require(['components/sellrent/sellrent'], resolve)//租房
const sellrentdetail = resolve => require(['components/sellrent/sellrentdetail'], resolve)//租房详情
const houseestate = resolve => require(['components/houseestate/houseestate'], resolve)//小区
const estatedetail = resolve => require(['components/houseestate/estatedetail'], resolve)//小区详情
const entrustmentrent = resolve => require(['components/entrustment/entrustmentrent'], resolve)//业主委托我要出售 出租 
const broker = resolve => require(['components/broker/broker.vue'], resolve)//找经纪人
const brokerdetail = resolve => require(['components/broker/brokerdetail'], resolve)//找经纪人详情
const shoper = resolve => require(['components/shoper/shoper.vue'], resolve)//找门店
const shoperdetail = resolve => require(['components/shoper/shoperdetail'], resolve)//找门店详情
const buyhouseguide = resolve => require(['components/buyhouseguide/buyhouseguide'], resolve)//购房指南
const guidedetail = resolve => require(['components/buyhouseguide/guidedetail'], resolve)//指南详情

const mine = resolve => require(['components/mine/mine'], resolve)//我的个人账户
const indexhome = resolve => require(['components/mine/indexhome'], resolve)//账户首页
const indexseeone = resolve => require(['components/mine/indexseeone'], resolve)//待看列表
const indexseetwo = resolve => require(['components/mine/indexseetwo'], resolve)//待看日程
const indexseethree = resolve => require(['components/mine/indexseethree'], resolve)//已看记录
const indexseefour = resolve => require(['components/mine/indexseefour'], resolve)//看房报告
const indexcollection = resolve => require(['components/mine/indexcollection'], resolve)//我的收藏
const indexdelegation = resolve => require(['components/mine/indexdelegation'], resolve)//我的委托
const indexbroker = resolve => require(['components/mine/indexbroker'], resolve)//我的经纪人
const indexconsult = resolve => require(['components/mine/indexconsult'], resolve)//我的咨询
const indexmessage = resolve => require(['components/mine/indexmessage'], resolve)//消息
const indexeditInfo = resolve => require(['components/mine/indexeditInfo'], resolve)//编辑资料

Vue.use(Router)
export default new Router({
	// mode: 'history', //历史模式, 取消地址栏"#"
	scrollBehavior(to, from, savedPosition) {
		return {x: 0, y: 0}//页面切换滚动顶部
	},
  	routes: [
		{path:"*",redirect:'/home',meta:{KeepAlive:false}},//重定向首页
		{path:"/home",component:home,meta:{KeepAlive:false}},//首页
		{path:"/login",component:login,meta:{KeepAlive:false}},//登录
		{path:"/register",component:register,meta:{KeepAlive:false}},//注册
		// {path:"/mapSearch/:houseTypeId",component:mapSearch,meta:{KeepAlive:false}},//地图找房
		{path:"/mapSearch/:houseTypeId",component:mapSearch,meta:{KeepAlive:false}},//地图找房
		{path:"/forget",component:forget,meta:{KeepAlive:false}},//忘记
		{path:"/searchlist",component:searchlist,meta:{KeepAlive:false}},//搜索列表
		{path:"/buyhouse",component:buyhouse,meta:{KeepAlive:false}},//我要买房
		{path:"/buyhouse/twohandhousedetail/:id",component:twohandhousedetail,meta:{KeepAlive:false}},//二手房详情		
		{path:"/renthouse",component:renthouse,meta:{KeepAlive:false}},//新房
		{path:"/renthousedetail/:id",component:renthousedetail,meta:{KeepAlive:false}},//新房详情
		{path:"/sellrent",component:sellrent,meta:{KeepAlive:false}},//租房
		{path:"/sellrentdetail/:id",component:sellrentdetail,meta:{KeepAlive:false}},//租房详情
		{path:"/entrustmentrent/:id",component:entrustmentrent,meta:{KeepAlive:false}},//业主委托我要出售 出租
		{path:"/houseestate",component:houseestate,meta:{KeepAlive:false}},//小区
		{path:"/estatedetail/:id",component:estatedetail,meta:{KeepAlive:false}},//小区详情
		{path:"/broker",component:broker,meta:{KeepAlive:false}},//找经纪人
		{path:"/brokerdetail",component:brokerdetail,meta:{KeepAlive:false}},//找经纪人详情
		{path:"/shoper",component:shoper,meta:{KeepAlive:false}},//找门店
		{path:"/shoperdetail",component:shoperdetail,meta:{KeepAlive:false}},//找门店详情
		{path:"/buyhouseguide",component:buyhouseguide,children:[{//购房指南
				path:"guidedetail",component:guidedetail},//指南详情
			]},
		{path:"/mine",redirect:'/mine/indexhome',component:mine,children:[{//我的个人账户
				path:"indexhome",component:indexhome,meta:{KeepAlive:false}},{//账户首页
				path:"indexseeone",component:indexseeone,meta:{KeepAlive:false}},{//待看列表
				path:"indexseetwo",component:indexseetwo,meta:{KeepAlive:false}},{//待看日程
				path:"indexseethree",component:indexseethree,meta:{KeepAlive:false}},{//已看记录
				path:"indexseefour",component:indexseefour,meta:{KeepAlive:false}},{//看房报告
				path:"indexcollection",component:indexcollection,meta:{KeepAlive:false}},{//我的收藏
				path:"indexdelegation",component:indexdelegation,meta:{KeepAlive:false}},{//我的委托
				path:"indexbroker",component:indexbroker,meta:{KeepAlive:false}},{//我的经纪人
				path:"indexconsult",component:indexconsult,meta:{KeepAlive:false}},{//我的咨询
				path:"indexmessage",component:indexmessage,meta:{KeepAlive:false}},{//消息
				path:"indexeditInfo",component:indexeditInfo,meta:{KeepAlive:false}}//编辑资料
			]},
  	]
})
 