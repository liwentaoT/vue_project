<script>
/*
 * @Author: Your name
 * @Date:   2020-06-02 08:02:59
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-06-02 13:09:44
 */
</script>
<template>
    <div class="newsInfoContainer">
        <h3 class="newsInfoTitle">{{newsInfo.title}}</h3>
        <div class="timeAclick">
            <span>发表时间：{{newsInfo.add_time}}</span>
            <span>点击量：{{newsInfo.click}}</span>
        </div>
        <p class="newInfoContent">{{newsInfo.content}}</p>
        <p class="newInfoContent">{{newsInfo.content}}</p>
        <p class="newInfoContent">{{newsInfo.content}}</p>
        <p class="newInfoContent">{{newsInfo.content}}</p>
        <p class="newInfoContent">{{newsInfo.content}}</p>
        <p class="newInfoContent">{{newsInfo.content}}</p>

        <div class="comments-container">
            <comment-box v-bind:infoId="id"></comment-box>
        </div>
        
    </div>
</template>
<script>
import axios from 'axios';
import {Toast} from 'mint-ui';
import comments from '../subcomponents/comments.vue';
export default {
    data(){
        return {
            id:this.$route.params.id,
            newsInfo:''
        }
    },
    created(){
        this.getNewsInfo();
        // axios.get('/api/getcomments',{
        //     params:{
        //         id:10,
        //         pageindex:2
        //     }
        // }).then((res)=>{
        //     console.log('getcomments',res)
        // })
    },
    methods:{
        getNewsInfo(){
            axios.get('/api/getnewslist',{
                params:{
                    id:this.id
                }
            }).then((res)=>{
                // console.log(res)
                if(res.data.status===0){
                    this.newsInfo=res.data.message;
                }else{
                    Toast('详情加载失败');
                }
                
            })
        }
    },
    components:{
        "comment-box":comments
        
    }
}
</script>
<style lang="scss">
    .newsInfoContainer{
        padding-left: 10px;
        padding-right: 10px;
        .newsInfoTitle{
            font-size: 18px;
            color: red;
            text-align: center;
            font-family: fangsong;
        }
        .timeAclick{
            font-size: 13px;
            font-family: fangsong;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
        .newInfoContent{
            text-indent:2em;
            font-size: 14px;
        }

    }
</style>