<template>
    <div>
        <div v-show="reportList.length">
            <h3>看房报告</h3>
            <ul>
                <li :key="index" v-for="(item,index) in reportList" @click="jump()">{{item.summary}}<span>2012.11.11 12:11</span></li>
            </ul>
        </div>
        <!-- 空页面 -->
        <o-empty :titles="'还没有看房报告'" 
                 :btns="'去选房'"
                 :isEmpty="numbol"
                 @myEvent="myEvent"></o-empty>
    </div>
</template>

<script>
import oHouseList from "../../base/houseList/houseList";
import oEmpty from "../../base/empty/empty";
export default {
    data() {
        return {
            numbol:false,
            reportList:[],//看房列表
        };
    },
    created() {
        this.reportListRequest();
    },
    methods: {
        //自定义事件 去选房
        myEvent() {
            this.$router.push({path: '/buyHouse'})
        },
        jump(item) {
            let url = item.reportUrl;
            this.$route({path: url});
        },
        reportListRequest() {
            let city = JSON.parse(localStorage.selectCity).value;
            this.$http
            .get(this.$url.URL.REPORT_LIST+"?pageNo="+1+"&scity="+city)
            .then(response => {
                try{
                    let data = response.data.data;
                    data.forEach(item => {
                        //修正时间格式形如2018.01.01
                        item.createDateTime1 = item.createDateTime.split(' ')[0].replace(/[^0-9]/ig, ".").slice(0,-1);
                        item.createDateTime2 = item.createDateTime.split(' ')[1];
                    });
                    this.reportList = response.data.data;
                    this.reportList.length==0? this.numbol=true : this.numbol=false;
                }catch(error){
                    this.numbol=true;
                }
            });
        }
    },
    components: {
        oHouseList,
        oEmpty
    }
}
</script>

<style lang="less" scoped>
h3 {
  height: 120px;
  line-height: 120px;
  font-size: 30px;
  color: #000000;
}
ul{
    background: #f7f7ff;
    padding: 10px;
    li{
        height: 85px;
        line-height: 85px;
        padding: 0 30px;
        border-bottom: 1px solid #cacaca; 
        span{float: right;}
    }
}


//列表项 

  .direciton{
    flex: 1;
    display: flex;
    height: 90px;
    margin-top: 40px;
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
  .introduce .word {
   font-size: 14px;
  vertical-align: top;
  margin-left: 10px;
  color: rgba(0, 0, 0, 0.7);
}
.prices {
  margin-right: 230px;
  font-size: 24px;
  color: rgba(239, 31, 31, 0.85);
    font-weight: bold;
}
.cout{
    font-size: 24px;
    color: rgba(0, 0, 0, 0.7);
    font-weight: bold;
}
.wan {
  font-size: 14px;
}
</style>