/*
 * @Author: 徐横峰 
 * @Date: 2018-04-28 00:21:18 
 * @Last Modified by: 564297479@qq.com
 * @Last Modified time: 2018-06-21 17:52:53
 */
const state = {
	AuthJiG: null,      //极光IM鉴权信息
	LoginedUser: null,  //用户信息数据
	logined: false,     //登录状态
	contrastList: [],   //缓存对比清单
	appinthouse:[],     //待看清单
	contrastDetailList: [], //缓存对比清单详情
	chat: false,        //开始聊天
	conversations: [],  //会话列表(好友列表)
	history: [],        //历史漫游消息
	currentLineBroker: null, //当前聊天的经纪人
}
export default state;