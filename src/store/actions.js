import API from '../common/js/url.js';
import axios from 'axios';
import router from '../router/index'
import Vue from 'vue';

//异步操作
export default {
	//初始化登录
	login({commit}) {
		//修改登录状态
		commit('LOGIN');
		//刷新待看列表
		this.dispatch('refreshAppointList');
	},
	//退出
	logout({commit}) {
		axios.post(API.URL.USER_LOGOUT)
		.then(response => {
			commit('LOGOUT');
			//用户退出极光IM
			window.JIM.loginOut();
			router.push({path: "/"});
		});
	},
	//获取最新用户信息(例如头像 昵称 等)
	getUserInfo() {
		axios.post(API.URL.USER_DETAILINFO)
		.then(response => {
			//缓存最新用户信息
			sessionStorage.userInfo = JSON.stringify(response.data.data);
			//极光IM信息鉴权
			this.dispatch('auth_payload');
		});
	},
	//极光IM信息鉴权
	auth_payload({commit}) {
		axios.get(API.URL.USER_JIGUANGSIGN)
		.then(response => {
			sessionStorage.AuthJiG = JSON.stringify(response.data.data);
			//静默刷新登录
			this.dispatch('login');
		});
	},
	//清空对比列表
	clearAll({commit}) {
		this.state.contrastList.forEach((item)=>{
			axios.delete(API.URL.CANCEL_CONTRAST+"?houseSdid="+item.sdid).then(response => {
				commit('CLEARALL', item);
			});
		})
	},
	//清空待看列表
	clearDaikan({commit}) {
		this.state.appintList.forEach((item)=>{
			axios.delete(API.URL.APPOINT_DELETE+item.id).then(response => {
				commit('CLEARDAIKAN', item);
			});
		})
	},
	//刷新对比清单
	showlist({commit}, payload) {
		let sdidStr = '';
		let city = JSON.parse(localStorage.selectCity).value;
		payload.forEach(item=> {
			sdidStr += item.sdid+'-';
		});
		//对比列表清单
		commit('SHOWLIST', payload);
		//对比列表详情
		axios.get(API.URL.TWOHOUSE_CONTRAST+"?sdidStr="+sdidStr+"&scity="+city).then(response => {
			commit('SHOWDEITALLIST', response.data.data);
		});
	},
	//删除对比清单中一个
	deleteOne({commit}, item) {
		axios.delete(API.URL.CANCEL_CONTRAST+"?houseSdid="+item.sdid).then(response => {
			commit('DELETEONE', item);
		});
	},
	// 删除待看清单中一个
	deleteOneAppoint({commit}, item) {
		axios.delete(API.URL.APPOINT_DELETE +item.id).then(response => {
			commit('DELETEONEAPPOINT', item);
		});
	},
	//添加一个到对比清单
	addOne({commit}, payload) {
		let params = {
			"houseId": payload.item.id,
			"houseSdid": payload.item.sdid
		}
		axios.put(API.URL.JOIN_CONTRAST, params).then(response => {
			payload.contrastList.unshift(payload.item);
			this.dispatch('showlist', payload.contrastList);
		});
	},
	//添加一个到待看清单
	addOneAppoint({commit}, payload) {
		let params = {
			"sdid": payload.item.sdid,
			"scity": payload.item.scity
		}
		axios.post(API.URL.APPOINT_ADD, params).then(response => {
			//刷新待看列表
			this.dispatch('refreshAppointList');
		});
	},
	//刷新待看列表清单
	refreshAppointList({commit},payload) {	
		let selectCity = payload ? payload : JSON.parse(localStorage.selectCity).value;
		axios.get(API.URL.APPOINT_DETAILLIST +"?pageNo=1",{
			"scity": selectCity
		})
		.then(res =>{
			commit('SHOWAPPOINTLIST', res.data.data);
		})
	}


}

