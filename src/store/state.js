/*
 * @Author: 徐横峰 
 * @Date: 2018-04-28 00:21:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-18 17:03:22
 */
const state = {
	AuthJiG: null,      //极光IM鉴权信息
	LoginedUser: null,  //用户信息数据
	logined: false,     //登录状态
	contrastList: [],   //缓存对比清单
	appinthouse:[],     //待看清单
	contrastDetailList: [], //缓存对比清单详情
	chat: false,        //开始聊天
}
export default state;