<template>
	<div>
		<o-header :houseTypeId="houseTypeId" 
              :isShowQueryBox="false"
              ></o-header>
		<div class="m-filter">
			<div class="container">
				<div class="filter">
					<ul>
						<li>
							<ol class="fl">
                <li class="title">位置: 城市</li>
								<li :key="index" v-for="(item,index) in cityList" :class="{querybtn:queryone==index}" @click="address(item, index, $event)">{{item.cityName}}</li>
							</ol>
						</li>
					</ul>
				</div>
			</div>
		</div>
		
		<!--内容部分-->
		<div class="content">
			<div class="container">
				<!--右侧部分-->
				<!-- <div class="sidebar fr">
					<div style="margin-top: 100px;"><span style="font-size: 16px;">购房指南</span><span class="fr" style="font-size: 12px;color: rgba(0,0,0,0.7);">更多</span></div>
					<ul>
						<li class="zhinan">外地人可以在南宁买房吗？</li>
						<li class="zhinan_date">2018-039-02</li>
						<li  class="zhinan">外地人可以在南宁买房吗？</li>
						<li class="zhinan_date">2018-03-02</li>
						<li  class="zhinan">外地人可以在南宁买房吗？</li>
						<li class="zhinan_date">2018-03-02</li>
					</ul>
					<div class="adverTisementLine"></div>
					<div style="font-size: 16px;color: color: rgba(0,0,0,0.8);margin-top: 30px;">下载世华易居APP</div>
					<div style="margin-top: 30px;"><img src="../../imgs/buyhouse/erwm.png"/></div>
				</div> -->

				<!--列表内容-->
				<div class="leftContent">
          <!-- 条件筛选 -->
					<div class="orderFilter">
						<!-- <div class="orderTag">
							<ul>
								<li v-for="(item, index) in [1,1]"><h3><a>{{item}}</a></h3></li>
							</ul>
						</div> -->
						<!-- <div class="filterAgain">
							<div class="title">筛选:</div>
							<ul>
								<li v-for="(item, index) in listnine"><h3><a>{{item}}</a></h3></li>
							</ul>
						</div> -->
					</div>

          <!-- 提示 -->
          <div class="resultDes" ref="resultDes">
            <div class="listContentLine"></div>
          </div>
          
					<!-- 列表 -->
					<div class="item">
						<ul v-show="houseList.length">
							<li :key="index" v-for="(item,index) in houseList">
								<div class="image" @click="toSkip(item)">
									<img :src="item.imageUrl"/>
								</div>
								<div class="direciton">
									<div class="introduce" @click="toSkip(item)" >{{item.buildName}}</div>
									<div class="introduce"><img src="../../imgs/buyhouse/house.png" />
                    <span class="word">{{item.tag}}</span>
										<span class="fr prices">{{item.saleTotal}}</span></div>
									<div class="introduce"><img src="../../imgs/buyhouse/dingwei.png" />
                    <span class="word">{{item.buildSummary}}</span><span class="fr">单价{{item.avgPrice }}元/平米</span>
                  </div>
									<div class="introduce ">
										<span class="intrspan one">{{item.houseFeature}}随时看房</span>
										<span class="intrspan two">{{item.areaName}}随时看房</span>
										<span class="intrspan three">随时看房</span>
									</div>
								</div> 
							</li>
						</ul>
            <div class="noContent" v-show="!houseList.length">暂无数据!</div>
					</div>

          <!-- 分页器 -->
          <div class="pageFooter">
              <div class="fl" style="color: rgba(0,0,0,0.5);font-size: 12px;">
                <router-link to="home">世华易居网南宁二手房</router-link>>
                <router-link to="buyhouse">南宁二手房</router-link>
              </div>
              <el-pagination class="fr oPagination"
                  @current-change="handleCurrentChange"
                  background
                  layout="prev, pager, next"
                  prev-text="上一页"
                  next-text="下一页"
                  :current-page.sync="params.pageNo"
                  :total="querycount.count">
              </el-pagination>
          </div>
				</div>
			</div>
		</div>
		<!-- 飞入的物体 -->
    <o-fly class="fly" ref="fly"></o-fly>
	</div>
</template>

<script>
import oHeader from "../../base/header/header";
import oFly from "../../base/fly/fly";
export default {
  data() {
    return {
      houseTypeId: 11, //地图 二手房 租房  小区 11 12 13

      list:["默认排序", "最新", "总价", "房屋单价", "面积"],
      cityList: [],
      listtwo: [],
      listnine:["随时看房", "新上", "满五年", "世华独家"],
      num: 0,
      showBtn: false,
      showBtnone: false,
      querycount: {//检索总数量
        count: 0
      },
      queryone: 0, //二手房区域
      inputresult: null,
      inputresulttwo: null,
      inputone: "",
      inputtwo: "",
      inputthree: "",
      inputfour: "",
      params: {//这个是用来查询参数列表 不变的
        pageNo: 1,
        pageSize: null,
        cityCode: null,
        scity: null
      },
      houseList: [], //新房列表
      cityCode: null,//用来拼接url地址
      selectCity: null,//当前城市
      contrastList: [],//对比清单列表
      collectionFlag: true, //收藏标识
    };
  },
  created() {
    //初始化修正请求参数体
    this.params.scity = JSON.parse(localStorage.selectCity).value;
    this.cityCode =  JSON.parse(localStorage.selectCity).value;
    this.render();
  },
  methods: {
    //翻页
    handleCurrentChange(val) {
      this.params.pageNo = val;
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0
      this.houseRequest();
    },
    render() {
      //房源列表请求
      this.houseRequest();
      //新房城市列表
      this.newCityListRequest()
    },
    //房源列表请求
    houseRequest() {
      let url = this.cityCode
              ? this.$url.URL.NEWBUILDING_QUERY+this.cityCode
              : this.$url.URL.NEWBUILDING_QUERY+this.selectCity.value;
      this.$http
      .get(url, this.params)
      .then(response=>{
        this.houseList = response.data.data;
      })
    },
    //新房城市列表
    newCityListRequest() {
      this.$http
        .get(this.$url.URL.NEWBUILDING_INDEX)
        .then(response=>{
          this.cityList = response.data.data;
          this.address(response.data.data[0], 0);
        })
    },
    //点击区域条件
    address(item, index) {
      this.queryone = index;
      this.params.cityCode = item.cityCode;
      this.cityCode = item.cityCode;
      this.houseRequest(); 
    },
    changeshow() {
      this.showBtn = true;
    },
    changeshowone() {
      this.showBtnone = true;
    },
    toSkip(item) {
      window.open(item.contenUrl,"_blank")
    }
  },
  components: {
    oHeader,
    oFly
  }
};
</script>

<style lang="less" scoped>
//筛选条件
.filter {
  overflow: hidden;
  margin-top: 26px;
  background-color: #fbfbfb;
  box-shadow: 0 1px 2px -1px rgba(0, 0, 0, 0.2);
  position: relative;
  border-bottom: 1px solid #cacaca;
  box-sizing: border-box;
  padding: 24px 0 0 35px;
  ul{
    >li{
      overflow: hidden;
      height: 25px;
      line-height: 25px;
      margin-bottom: 24px;
      ol{
        >li{
          cursor: pointer;
          float: left;
          text-align: left;
          width: 90px;
          white-space: nowrap;
        }
        .title{
          width: 110px;
          font-size: 12px;
          font-weight: 700;
        }
      }
    }
  } 
}
//高亮
.querybtn {
  color: #ff4343;
}

//列表项 
.item ul li{
  overflow: hidden;
  display: flex;
  height: 175px;
  border-bottom: 1px solid #cacaca;
  padding: 33px 0;
  flex-flow: row nowrap;
  justify-content: flex-start;
  .image{
    flex: 232px 0 0;
    width: 232px;
    height: 175px;
    margin-right: 25px;
    background: #f5f5f5;
    cursor: pointer;
    img{
      width: 100%;
      height: 100%;
      vertical-align: top;
    }
  }
  .direciton{
    flex: 1;
    display: flex;
    height: 100%;
    flex-flow: column nowrap;
    justify-content: space-between;
    >div:nth-of-type(1){
      font-size: 22px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: bold;
      cursor: pointer;
      span{
        color:rgba(0,0,0,0.5);
        margin-left: 10px;
        padding: 5px;
        font-size: 10px;
        border: 1px solid #cacaca;
        visibility: hidden;
        &:hover{
          color: #000000;
        }
      }
    }
  }
  &:hover .direciton>div:nth-of-type(1) span{
    visibility: visible;
  }
}

.m-checkbox {
  display: inline-block;
  background-image: url(../../imgs/buyhouse/check.png);
  width: 12px;
  height: 12px;
}
.quyu {
  font-size: 14px;
  font-weight: bold;
}
.quyu_kind {
  cursor: pointer;
  font-size: 12px;
}
.quyu_kind > li > input {
  height: 20px;
  width: 37px;
}

.check {
  position: absolute;
  top: 305px;
  margin-left: 40px;
  height: 18px;
  line-height: 18px;
  font-size: 13px;
}

.pageFooter{
  overflow: hidden;
  padding-top: 20px;
}

//内容
.content {
  margin-top: 26px;
}
.leftContent {
  padding-bottom: 20px;
  overflow: hidden;
}
.sidebar {
  width: 180px;
  margin-left: 60px;
}
.content .leftContent .orderFilter .orderTag {
  border-bottom: 2px solid red;
  line-height: 0;
}
.content .leftContent .orderFilter .orderTag ul {
  display: inline-block;
  width: 90%;
  line-height: 47.5px;
}

.content .leftContent .orderFilter .orderTag ul li {
  display: inline-block;
}
.content .leftContent .orderFilter .orderTag ul li a {
  text-align: center;
  line-height: 1;
  vertical-align: middle;
  padding: 0 25px;
  font-size: 14px;
  font-weight: bold;
  color: #394043;
  text-decoration: none;
}

.content .leftContent .orderFilter .filterAgain {
  font-size: 12px;
  line-height: 50px;

}
.content .leftContent .orderFilter .filterAgain .title {
  display: inline-block;
  font-weight: bold;
  color: #333333;
}
.content .leftContent .orderFilter .filterAgain ul {
  display: inline-block;
  margin-left: 15px;
}
.content .leftContent .orderFilter .filterAgain ul li {
  display: inline-block;
  margin-right: 20px;
}
.content .leftContent .resultDes .total {
  font-weight: bold;
  font-size: 22px;
  color: #394043;
  margin: 50px 0 10px;
}
.listContentLine {
  border-bottom: 1px solid #f1f1f1;
}

.introduce span {
  font-size: 14px;
}

.introduce .word {
  vertical-align: top;
  margin-left: 10px;
  color: rgba(0, 0, 0, 0.7);
}
.prices {
  font-size: 24px;
  color: rgba(239, 31, 31, 0.85);
}
.wan {
  font-size: 14px;
}
.intrspan {
  width: 70px;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.one {
  background-color: #e5f2ff;
  color: rgba(0, 85, 164, 0.85);
}
.two {
  background-color: #fde8e8;
  color: rgba(239, 31, 31, 0.85);
}
.three {
  background: #e1f5ed;
  color: #33be85;
}
.sidebar .advertisement {
  width: 180px;
  height: 180px;
  background: #ef1f1f;
}
.adverTisementLine {
  margin-top: 34px;
  height: 1px;
  background: #cccccc;
}
.zhinan {
  margin-top: 10px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.9);
}
.zhinan_date {
  margin-top: 10px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
}
</style>





