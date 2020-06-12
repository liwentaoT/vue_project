<template>
    <div class="goodsDesc-container">
        <h4>{{goodsDescMsg.title}}</h4>
        <hr>
        <div class="goods-desc">{{goodsDescMsg.desc}}</div>
        <hr>
        <div v-html="goodsDescMsg.content" class="goodscontent"></div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return {
            goodsDescMsg:{}   
        }
        
    },
    created(){
        this.getGoodsDesc()
    },
    mounted(){

    },
    methods:{
        getGoodsDesc(){
            axios.get('/api/goods/getdesc').then(res=>{
                this.goodsDescMsg=res.data.message[0];
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .goodsDesc-container{
        h4{
            font-size: 14px;
            color: royalblue;
            text-align: center;
            margin: 15px 0;
        }
        .goods-desc{
            font-size: 14px;
            color: #666;
            line-height: 23px;
            text-indent: 2em;
            font-family: Microsoft Yahei;
        }
        .goodscontent{
            p{
                img{
                    width: 100%; 
                }
            }
        }
        
    }
    
</style>