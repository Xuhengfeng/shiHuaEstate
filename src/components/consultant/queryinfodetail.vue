<template>
    <div class="container" style="overflow: visible;">
        <p class="title">{{info.title}}</p>
        <div class="text">
            {{info.summary}}
        </div>
        <div class="imgage">
            <img :src="info.imageUrl"/>
        </div>
    </div>
</template>

<script>
export default {
        data() {
            return{
                scity: JSON.parse(localStorage.selectCity),//当前城市
                info:""   ,//问题详情
            }
        },
        created() {
                this.render();
        },
        methods:{
            render() {
                let id = this.$route.params.id;
                //热门咨询
                this.$http
                    .get(this.$url.URL.INFO +id, {
                        scity: this.scity.value,
                    })
                    .then(response => {
                    this.info = response.data.data;
                    });
            }
        }
}
</script>

<style lang="less" scoped>
.container{
    .title{
        font-size: 24px;
        text-align: center;
        padding:70px 0 30px 0;
    }
    .text{
        font-size: 16px;
        padding-bottom: 20px;
        line-height: 26px;
    }
    .imgage{
        height: 584px;
        width: 100%;
        padding-bottom: 40px;
        >img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
