/*
 * @Author: 徐横峰 
 * @Date: 2018-04-28 00:21:21 
 * @Last Modified by: 564297479@qq.com
 * @Last Modified time: 2018-06-20 18:30:29
 */
//同步处理
export default {
	//初始化状态 登录 用户信息 极光IM鉴权
	//防止刷新状态还原
	FIRSTSTATUS(state) {
		if(sessionStorage.logined) {
			state.logined=true;
			state.LoginedUser = JSON.parse(sessionStorage.userInfo);
			state.AuthJiG = JSON.parse(sessionStorage.AuthJiG);
		}
	},
	//初始化待看列表数据
	CHUSHIHUA(state,payload){
		payload != null
		? state.appinthouse = payload
		: state.appinthouse = [];
	},
	//登录
	LOGIN(state) {
		//先让登录状态变为登录了
		//同时缓存登录状态
		state.logined = true;
		sessionStorage.logined = true;
		state.LoginedUser = JSON.parse(sessionStorage.userInfo);
		state.AuthJiG = JSON.parse(sessionStorage.AuthJiG);
	},
	//退出
	LOGOUT(state) {
		//清空所有关于登录缓存
		sessionStorage.clear();

		//清空状态
		state.logined = false;
		state.LoginedUser = null;
		state.userAuthJiGuang = null;
		state.AuthJiG = null;
	},
	//清空对比清单列表
	CLEARALL(state) {
		state.contrastList = [];
	},
	//清空待看清单列表
	CLEARDAIKAN(state) {
		state.appinthouse = [];
	},
	//显示对比清单列表
	SHOWLIST(state, payload) {
		state.contrastList = payload;
	},
	//对比房源详情
	SHOWDEITALLIST(state, payload) {
		state.contrastDetailList = payload;
	},
	//删除对比清单的某一个
	DELETEONE(state, payload) {
		let index = state.contrastList.findIndex((item)=>{
			return payload.sdid == item.sdid;
		})
		state.contrastList.splice(index, 1);
	},
	//删除待看清单的某一个
	DELETETWO(state, payload) {
		let index = state.contrastList.findIndex((item)=>{
			return payload.sdid == item.sdid;
		})
		state.appinthouse.splice(index, 1);
	},	
	ADDTWO(state, payload){
		state.appinthouse = payload;
	},
	//开始聊天
	STARTCHAT(state, payload) {
		state.chat = payload;
	},
	//历史漫游消息
	HISTORY(state, payload) {
		state.history[payload.index] = payload.data;
	},
	//会话列表(好友列表)	
	FIREND(state, payload) {
		state.conversations = payload;
	},
	//会话列表(添加好友)
	ADDFIREND(state, payload) {
		state.conversations.push(payload);
	},
	//注册极光
	Jiguang_register(state, payload) {
		JIM.register(payload)
		.onSuccess(data=> {
			console.log(data);
		})
		.onFail(data=> {});
	}
	

}