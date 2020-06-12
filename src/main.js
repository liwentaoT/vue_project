/*
 * @Author: Your name
 * @Date:   2020-05-28 16:20:07
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-06-10 15:43:15
 */
import Vue from "vue";

import VueRouter from "vue-router";
import './mockjs-data/indexAPI';
import Vuex from 'vuex';
Vue.use(Vuex);
import axios from "axios"
// import VueResource from 'vue-resource';
// Vue.use(VueResource);
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import app from "./App.vue";
// import { Header,Swipe,SwipeItem,Button,Lazyload } from "mint-ui";
import { Tab,Tabs } from 'vant';
Vue.use(Tab).use(Tabs);
import VuePreview from 'vue-preview';
Vue.use(VuePreview);
import "mint-ui/lib/style.css";
import "./lib/mui/css/mui.min.css";
import "./lib/mui/css/icons-extra.css";
import "./lib/mui/fonts/mui-icons-extra.ttf";
import moment from 'moment';
Vue.use(VueRouter);
Vue.use(MintUI);
// Vue.use(Lazyload);
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name,Button);
//用于格式化时间的全局过滤器
Vue.filter('dateFormat',function(dateStr,pattern='YYYY-MM-DD HH:mm:ss'){
  return moment(dateStr).format(pattern);
})
import router from './router';
var localCar=JSON.parse(localStorage.getItem('car')||'[]');
const store = new Vuex.Store({
  state:{
    car:localCar//用来存放点击加入购物车时候加入的商品
  },
  mutations:{
    addToCar(state,goodsinfo){
      var flag=false;
      state.car.some(item=>{
        if(item.id==goodsinfo.id){
          item.count+=parseInt(goodsinfo.count);
          flag=true;
          return true;
        }
      });
      if(!flag){
        state.car.push(goodsinfo);
      }
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    updateCar(state,goodsinfo){
      state.car.some(item=>{
        if(item.id==goodsinfo.id){
          item.count=parseInt(goodsinfo.count);
        }
      });
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    removeFromCar(state,id){
      state.car.some((item,i)=>{
        if(item.id==id){
          state.car.splice(i,1);
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    updateCarSelected(state,info){
      state.car.some(item=>{
        if(item.id==info.id){
          item.selected=info.selected;
        }
      });
      localStorage.setItem('car',JSON.stringify(state.car));
    }
  },
  getters:{
    getAllCount(state){
      var c=0;
      state.car.forEach(item=>{
        c+=item.count;
      })
      return c;
    },
    getGoodsCounts(state){
      let o={};
      state.car.forEach(item=>{
        o[item.id]=item.count;
      });
      return o; //返回值示例：{80:5, 81:3, 82:4}
    },
    getGoodsSelected(state){
      let o={};
      state.car.forEach(item=>{
        o[item.id]=item.selected;
      });
      return o;
    },
    getGoodsCountAndAmount(state){
      let o={
        count:0, //勾选的数量
        amount:0 //勾选的总价
      };
      state.car.forEach(item=>{
        if(item.selected){
          o.count+=item.count;
          o.amount+=item.price*item.count;
        }
      });
      return o;
    }
  }
});

var vm = new Vue({
  el: "#app",
  render: (c) => c(app),
  router,
  store:store
});
