<script>
/*
 * @Author: Your name
 * @Date:   2020-06-07 11:09:24
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-06-08 07:39:02
 */
</script>
<template>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in lunbotuList" :key="index">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
</template>
<script>
export default {
    props:['lunbotuList'],
    data(){
        return {
            
        }
    }
}
</script>
<style lang="scss" scoped>
    .mint-swipe {
        height: 100px;
    }
    .mint-swipe-item {
        img{
            width:100%;
        }
    }
</style>