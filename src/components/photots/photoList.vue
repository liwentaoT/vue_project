<script>
/*
 * @Author: Your name
 * @Date:   2020-06-02 22:11:06
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-06-05 13:29:37
 */
</script>
<template>
<div>
	
	
	<van-tabs @click="tabClick" sticky>
     	<van-tab v-for="item in categoriesList" :title=item.title :key="item.id" @click="getImgList(item.id)">
          	
     	</van-tab>
	</van-tabs>

	<div class="div-list">
		<ul>
			<router-link v-for="item in imgList" :key="item.id" tag="li" :to="'/home/photoinfo/' + item.id">
				<img v-lazy=item.img_url width="100%" height="100%" style="max-height:300px; max-width:300px">
				<div class="img-info">
					<h2 class="info-titlt">{{item.title}}</h2>
					<div class="info-content">{{item.zhaiyao}}</div>
				</div>
			</router-link>
		</ul>
	</div>
	
	
</div>
</template>
<script>
import axios from 'axios';
export default {
    mounted(){
	},
	data(){
		return {
			categoriesList:[],
			imgList:null
		}
	},
	created(){
		this.getCategories();
		this.getImgList(0);
		
	},
	methods:{
		getCategories(){
			axios.get('/api/getimgcategory').then(res=>{
				// console.log(res.data.status,res.data.message)
				if(res.data.status===0){
					res.data.message.unshift({"title":"全部","id":0})
					this.categoriesList=res.data.message	
				}
				
			});
		},
		getImgList(categoryId){
			axios.get('/api/getimages/',{
				params:{
					id:categoryId
				}
			}).then(res=>{
				console.log(res);
				this.imgList=res.data.message;
			});
		},
		tabClick(id){
			this.getImgList(id);
		}
	}
}
</script>
<style lang="css" scoped>
	.div-list{
		width: 100%;
		margin: 0;
		padding:10px;
	}
	.div-list ul{
		padding:10px;
		margin: 0;
		width: 100%;
	}
	.div-list ul li {
		height: 300px;
		list-style: none;
		width: 100%;
		margin-top: 10px;
		background: #cccccc;
		text-align: center;
		box-shadow: 0 0 6px #999;
		position: relative;
	}
	img{
		width: 100%;
	}
	img[lazy=loading] {
  		width: 40px;
		height: 300px;
		margin: auto;
	}

	.img-info{
		background: rgba(0, 0, 0, 0.4);
		position:absolute;
		bottom: 0;
		color: #ffffff;
		width: 100%;
		max-height: 80px;
	}
	.img-info .info-titlt{
		text-align: left;
		font-size: 14px;
		font-weight: normal;
	}
	.img-info .info-content{
		text-align: left;
		font-size: 12px;
	}
</style>