<script>
/*
 * @Author: Your name
 * @Date:   2020-06-05 18:11:42
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-06-07 08:50:32
 */
</script>
<template>
    <div>
        <div class="list-container">
            <div class="goods-item" v-for="item in list" :key="item.id" @click="getGoodsItem(item.id)">
                <img :src=item.img_url alt="">
                <h3>{{item.title}}</h3>
                <div class="goodsContent">
                    <p class="goods-price">
                        <span class="new-price">￥{{item.sell_price}}&nbsp&nbsp&nbsp</span>
                        <span class="old-price">￥{{item.market_price}}</span>
                    </p>
                    <p class="goods-xl">
                        <span>热卖中</span>
                        <span>剩{{item.stock_quantity}}件</span>
                    </p>
                </div>
            </div>
            
        </div>

        <mt-button type="danger" size="large" @click="getMoreGoods">加载更多商品</mt-button>
    </div>
</template>
<script>
import axios from 'axios';
import {Toast} from 'mint-ui';
export default {
    data(){
        return {
            pageIndex:1,
            list:[]
        }
    },
    created(){
        this.getGoodMsg();
    },
    methods:{
        getGoodMsg(){
            axios.get('/api/getgoods',{
                params:{
                    pageIndex:this.pageIndex
                }
            }).then(res=>{
                // console.log(res)
                if(res.data.status===0){
                    if(res.data.message.length!=0){
                        this.list=this.list.concat(res.data.message);
                    }else{
                        Toast('更多商品请去官网进行选购')
                    }
                    
                }else{
                    Toast('商品获取失败')
                }
                
            });
        },
        getMoreGoods(){
            this.pageIndex++;
            this.getGoodMsg();
        },
        getGoodsItem(id){
            this.$router.push({ name:"goodsInfo",params:{id} });
        }
    }
}
</script>
<style lang="scss">
p{
    margin-bottom: 0;
}
    .list-container{
        padding: 4px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .goods-item{   
            background: #ffffff;
            border: 1px solid #cccccc;
            width: 49%;
            margin-bottom: 10px;
            box-shadow: 0 0 8px #ccc;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 290px;
            img{
                width: 100%;
            }
            h3{
                font-size: 13px;
                font-weight: 600;
                padding: 0 10px;
                font-family: Microsoft yahei;
                line-height: 18px;
            }
            .goodsContent{
                background: #e4e3e3;
                padding:0 7px;
                .goods-price{
                    .new-price{
                        font-size: 13px;
                        font-weight: 700;
                        color: red;
                    }
                    .old-price{
                        font-size: 13px;
                        font-weight: normal;
                        color: #151414;
                        text-decoration: line-through;
                    }
                }
                .goods-xl{
                    font-size: 12px;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
        
    }
    .mint-button{
        font-size: 14px;
    }
</style>