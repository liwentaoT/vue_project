/*
 * @Author: Your name
 * @Date:   2020-05-29 08:45:26
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-06-08 08:03:25
 */
import Vue from "vue";

import VueRouter from "vue-router";
import memberContainer from "./components/tabbar/MemberContainer.vue";
import homeContainer from "./components/tabbar/HomeContainer.vue";
import cartContainer from "./components/tabbar/CartContainer.vue";
import searchContainer from "./components/tabbar/SearchContainer.vue";
import newsList from "./components/news/NewsList.vue";
import newsInfo from "./components/news/NewsInfo.vue";
import photoList from "./components/photots/photoList.vue";
import imageInfo from "./components/photots/imageInfo.vue";
import goodsList from "./components/goods/GoodsList.vue";
import goodsInfo from "./components/goods/GoodsInfo.vue";
import goodsDesc from "./components/goods/GoodsDesc.vue";
import goodsComments from "./components/goods/GoodsComments.vue";
Vue.use(VueRouter);

var router = new VueRouter({
    routes: [
      { path:"/home", component:homeContainer},
      { path: "/", redirect: "/home" },
      { path: "/member", component: memberContainer},
      { path: "/cart", component: cartContainer },
      { path: "/search", component: searchContainer }, 
      { path: "/home/newslist" , component: newsList},
      { path: "/home/newsinfo/:id", component: newsInfo},
      { path: "/home/photolist", component: photoList},
      { path: "/home/photoinfo/:id", component: imageInfo},
      { path: "/home/goodsList", component: goodsList},
      { path: "/home/goodsInfo/:id", component: goodsInfo, name:'goodsInfo'},
      { path: "/home/goodsDesc/:id", component: goodsDesc, name:'goodsDesc'},
      { path: "/home/goodsComments", component: goodsComments, name:'goodsComments'}
    ],
    linkActiveClass: "mui-active"
});
export default router