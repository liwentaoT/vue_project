<script>
/*
 * @Author: Your name
 * @Date:   2020-05-29 08:51:14
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-06-07 11:19:51
 */
</script>
<template>
  <div>
    <swiper :lunbotuList="lunbotuList"></swiper>
    
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../img/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div></router-link
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../img/menu2.png" alt="">
          <div class="mui-media-body">图片资讯</div></router-link
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodsList">
          <img src="../../img/menu3.png" alt="">
          <div class="mui-media-body">手机商城</div></router-link
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../img/menu4.png" alt="">
          <div class="mui-media-body">location</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../img/menu5.png" alt="">
          <div class="mui-media-body">Search</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../img/menu6.png" alt="">
          <div class="mui-media-body">Phone</div></a
        >
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios';
import {Toast} from 'mint-ui';
import swiper from '../subcomponents/swiper.vue';
export default {
  data() {
    return {
      lunbotuList: [],
    };
  },
  created() {
    this.getlunbo();
  },
  methods: {
    getlunbo(){
      axios.get('/api/getlunbo').then(res=>{
        if(res.data.status===0){
          this.lunbotuList=res.data.message;
          Toast('欢迎光临')
        }else{
          Toast('轮播图加载失败')
        }
      })
    }
  },
  components:{
    swiper
  }
};
</script>
<style lang="scss" scoped>

.mui-grid-view.mui-grid-9{
    background-color: #ffffff;
}
.mui-grid-view.mui-grid-9 li{
    border: none;
}
.mui-grid-view.mui-grid-9 li img{
    width: 40px;
    height: 40px;
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
    font-size: 13px;
}
</style>
