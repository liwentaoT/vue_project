<script>
/*
 * @Author: Your name
 * @Date:   2020-06-07 08:42:03
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-06-10 15:45:58
 */
</script>
<template>
    <div>
        <!-- 小球动画 -->
        <transition 
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        >
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <mt-swipe :auto="4000">
                        <mt-swipe-item v-for="(item,index) in lunboList" :key="index">
                            <img :src="item.img" alt="">
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
            </div>
		</div>
        <div class="mui-card">
            <div class="mui-card-header">{{goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{goodsInfo.market_price}}</del>
                        销售价：<span>￥{{goodsInfo.sell_price}}</span>
                    </p>
                    <p class="num_box">购买数量：<goodsNum @getNum="getNumbox" :max="goodsInfo.stock_quantity"></goodsNum></p>
                    <p class="goodsBuy">
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
		</div>
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsInfo.goods_no}}</p>
                    <p>库存情况：{{goodsInfo.stock_quantity}}</p>
                    <p>上架时间：{{goodsInfo.add_time}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" plain size="large" @click="getGoodsDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" plain size="large" @click="getGoodsComments">商品评论</mt-button>
            </div>
		</div>
    </div>
</template>
<script>
import axios from 'axios';
import goodsNum from '../subcomponents/goodsNum.vue';
// import mui from '../../lib/mui/js/mui.js';

export default {
    data(){
        return {
            lunboList:[],
            id:this.$route.params.id,
            goodsInfo:{},
            ballFlag:false,
            num_box:1
        }
    },
    created(){
        this.getLunbo();
        this.getGoodsInfo();
    },
    mounted(){
        // mui('mui-numbox').numbox();
        
    },
    methods:{
        getLunbo(){
            axios.get('/api/getGoodsLunbo').then(res=>{
                console.log("lunbo:",res)
                if(res.data.status===0){
                    this.lunboList=res.data.message;
                    this.lunboList.forEach(item=>{
                        item.img=item.img_url;
                    });
                }
            })
        },
        getGoodsInfo(){
            axios.get('/api/goods/getinfo',{
                params:{
                    id:this.id
                }
            }).then(res=>{
                console.log("getinfo:",res.data.message[0]);
                this.goodsInfo=res.data.message[0];
            })
        },
        getGoodsDesc(id){
            this.$router.push({name:"goodsDesc", params:{id}});
        },
        getGoodsComments(){
            this.$router.push({name: "goodsComments"});
        },
        beforeEnter(el){
            el.style.transform="translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;
            //获取小球在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            //获取徽标在页面中的位置
            const badgePosition = document.getElementById("badge").getBoundingClientRect();
            //x轴方向位移的值
            const xDist=badgePosition.left-ballPosition.left;
            //y轴方向位移的值
            const yDist=badgePosition.top-ballPosition.top;

            el.style.transform=`translate(${xDist}px,${yDist}px)`;
            el.style.transition="all 1s cubic-bezier(.4,-0.3,0.1,.68)"
            done();
        },
        afterEnter(el){
            this.ballFlag=!this.ballFlag;
        },
        addToCar(){
            this.ballFlag=!this.ballFlag;
            var goodsInfo = {
                id:parseInt(this.id),
                count:parseInt(this.num_box), 
                price:this.goodsInfo.sell_price,
                selected:true
            };
            this.$store.commit("addToCar",goodsInfo);
            
        },
        getNumbox(numbox){
            this.num_box=numbox;
            // console.log("father de count ",this.num_box);
        }
    },
    components:{
        goodsNum
    }
}
</script>
<style lang="scss">
   .mint-swipe {
        height: 300px;
    }
    .mint-swipe-item {
        img{
            width:100%;
        }
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
    .mui-card-content-inner{
        p{
            font-size: 13px;
            color: #929191;
        }
        
    }
    .price{
        span{
            color: red;
            font-weight: 700;
        }
    }
    .num_box{
        display: flex;
    }
    .mui-numbox{
        height: 25px;
    }

    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: red;
        position: absolute;
        z-index: 99;
        top: 460px;
        left: 146px;
    }
</style>