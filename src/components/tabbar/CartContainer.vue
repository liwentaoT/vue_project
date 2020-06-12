<script>
/*
 * @Author: Your name
 * @Date:   2020-05-29 08:51:14
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-06-10 15:43:42
 */
</script>
<template>
<div class="shopcarContainer">
    <div class="mui-card" v-for="(item, index) in shopCartList" :key="index">
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <mt-switch :goodId="item.id" v-model="$store.getters.getGoodsSelected[item.id]"
                @change="updateSelected(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                <img :src=item.thumb_path alt="">
                <div class="info">
                    <h1>{{item.title}}</h1>
                      
                    <p> 
                        <span class="price">￥{{item.sell_price}}</span>
                    </p>
                    <p>
                        <numbox :initCount="$store.getters.getGoodsCounts[item.id]" :goodId="item.id"></numbox>
                        <a href="#" @click.prevent="remove(item.id,index)">删除{{item.id}}</a>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="mui-card">
        <div class="mui-card-content">
            <div class="mui-card-content-inner jiesuan">
                <div class="left">
                    <p>总计（不含运费）</p>
                    <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，总价 <span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                </div>
                <mt-button type="danger">去结算</mt-button>
            </div>
           
        </div>
    </div>
    <!-- <p>{{this.$store.getters.getGoodsSelected}}</p> -->
    <!-- <P>{{$store.getters.getGoodsCountAndAmount}}</P> -->
</div>

</template>
<script>
import numbox from '../subcomponents/carNum.vue';
import axios from 'axios';
export default {
    data(){
        return {
            shopCartList:[]
        }
    },
    created(){
        this.getCartList();
    },
    methods:{
        getCartList(){
            var idArr=[];
            this.$store.state.car.forEach(element => idArr.push(element.id));
            if(idArr.length<=0){
                return;
            }
            axios.get('/api/goods/getshopcarlist',{
                params:{
                    ids:idArr.join(',')
                }
            }).then(res=>{
                if(res.data.status===0){
                    this.shopCartList=res.data.message;
                }
            })
        },
        remove(id,index){
            this.shopCartList.splice(index,1);
            this.$store.commit('removeFromCar',id);
        },
        updateSelected(id,value){
            // console.log(id+"----"+value);
            this.$store.commit('updateCarSelected',{id:id,selected:value});
        }
    },
    components:{
        numbox
    }
}
</script>
<style lang="scss" scoped>
    .shopcarContainer{
        background:#eeeeee;
    }
    .mui-card-content-inner{
        display: flex;
       
        align-items: center;
    }
    .mui-card-content-inner img{
        width: 60px;
        height: 60px;
    }
    .info{
        h1{
            font-size: 13px;
        }
        p{
            display: flex;
            justify-content: space-between;
            .price{
                color: red;
                font-size: 13px;
            }
            a{
                font-size: 12px;
            }
            
        }
    }
    .jiesuan{
        display: flex;
        justify-content: space-between;
        .red{
            color: red;
        }
    }
</style>