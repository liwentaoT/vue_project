<script>
/*
 * @Author: Your name
 * @Date:   2020-06-05 13:09:25
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-06-05 15:04:13
 */
</script>
<template>
    <div>
        <!-- 标题区域 -->
       <h3>{{imageInfoMessage.title}}</h3>
       <p class="subtitle">
           <span>发表时间：{{imageInfoMessage.add_time}}</span>
           <span>点击次数：{{imageInfoMessage.click}}</span>
       </p>
       <hr>
       <!-- 缩略图区域 -->
        <!-- <img class="preview-img" v-for="(item,index) in list" :src="item.src"
        height="100" @click="$preview.open(index,list)" :key="index"/> -->
        <div class="thumbs">
            <vue-preview :slides="list" class="imgPrev"></vue-preview>
        </div>
       <!-- 图片内容区域 -->
       <p class="imageContent">{{imageInfoMessage.content}}</p>
       <!-- 评论区域 -->
       <commentbox :id="id"></commentbox>
    </div>
</template>
<script>
import comment from '../subcomponents/comments.vue';
import axios from 'axios';
export default {
    data(){
       return {
           id:this.$route.params.id,
           imageInfoMessage :'',
           list:[]
       }
    },
    methods:{
        getImageInfo(imageid){
           axios.get('/api/getimageInfo',{
               params:{
                   id:imageid
               }
           }).then(res=>{
               console.log("getimageInfo:",res)
               if(res.data.status===0){
                   this.imageInfoMessage=res.data.message;
               }
		   });
        },
        getThumbs(){
            axios.get('/api/getthumimages').then(res=>{
                console.log("getthum:",res)
                if(res.data.status===0){
                    res.data.message.forEach(item => {
                        item.msrc = item.src,
                        item.w=600;
                        item.h = 400;
                    });
                    this.list=res.data.message;
                }
            })
        }
    },
    created(){
        this.getImageInfo(this.id);
        this.getThumbs();
    },
    components:{
        commentbox:comment
    }
}
</script>
<style lang="scss" scoped>
    h3{
        font-size: 14px;
        color: #26a2ff;
        text-align: center;
        margin: 10px;
        font-weight: normal;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        margin-bottom: 0;
    }
    .image-content{
        text-indent: 2em;
        padding: 0 10px;
    }
    .imageContent{
        font-size: 14px;
        text-indent: 2em;
        padding: 0 10px;
    }
    .thumbs{
         /deep/ .my-gallery{   //deep深层作用选择器
              display: flex;
              flex-wrap:wrap;//默认换行
              figure{
                  width: 30%;  
                  margin: 5px; 
                  img{
                      width: 100%;
                      box-shadow: 0 0 8px #999;  
                      border-radius: 5px;
                  }
              }
          }
        }
</style>