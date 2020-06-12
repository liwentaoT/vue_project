<script>
/*
 * @Author: Your name
 * @Date:   2020-05-31 15:49:02
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-06-01 12:44:49
 */
</script>
<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item) in newsList" :key="item.id">
					<router-link :to="'/home/newsinfo/'+item.id" class="">
						<img class="mui-media-object mui-pull-left" src="https://img-blog.csdnimg.cn/20190918140012416.png">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class="mui-ellipsis">
                                <span>发表时间：{{item.add_time}}</span>
                                <span>点击量：{{item.click}}</span>
                            </p>
						</div>
					</router-link>
				</li>

			</ul>
    </div>
</template>
<script>
import axios from 'axios';
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            newsList:[]
        }
    },
    created(){
        this.showList();
    },
    methods:{
        showList(){
            axios.get('/api/getnewslist').then(res=>{
                if(res.data.status===0){
                    this.newsList=res.data.message;
                }else{
                    Toast('获取数据失败')
                }
            });
        }
    }

}
</script>
<style lang="scss" scoped>
    .mui-table-view .mui-media .mui-media-body{
        h1{
            font-size: 14px;
        }
        .mui-ellipsis{
            font-family: Microsoft YaHei;
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            color: #226aff;
        }
    }
</style>