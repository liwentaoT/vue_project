<script>
/*
 * @Author: Your name
 * @Date:   2020-05-28 16:20:16
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-06-09 21:37:29
 */
</script>
<template>
  <div class="app-container">
    
    <mt-header fixed title="lwt-VUE项目">
      <span @click="goback" slot="left" v-show="gobackFlag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    
	<transition>
	  <router-view></router-view>
	</transition>
	
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-cc" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-cc" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-cc" to="/cart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
				<span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-cc" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data(){
    return {
      gobackFlag:true
    }
  },
  methods: {
    goback(){
      
      this.$router.go(-1);
    }
  },
  watch:{
    "$route.path":function(newVal){
      this.gobackFlag=newVal==="/home"?false:true;
    }
  }
};
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
.app-container{
  padding-top: 40px;
  padding-bottom: 60px;
  overflow-x: hidden;
  background: #ffffff;
}
body{
  background-color: #ffffff;
}
.v-enter{
	opacity: 0;
	transform: translateX(100%);
}
.v-leave-to{
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}
.v-enter-active,.v-leave-active{
	transition: all 0.5s ease;
}

.mui-bar-tab .mui-tab-item-cc.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-cc {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-cc .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-cc .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
