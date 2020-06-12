<script>
/*
 * @Author: Your name
 * @Date:   2020-06-02 07:54:58
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-06-02 17:18:52
 */
</script>
<template>
    <div>
        <div class="send-comment">
            <h4>发表评论</h4>
            <hr>
            <textarea placeholder="请输入要bb得内容，最多120个字：" maxlength="120" v-model="content"></textarea>
            <mt-button type="primary" size="large" @click="sendComments">发表评论</mt-button>
        </div>
        <div class="comment-list-container">
            <div class="comment-list" v-for="(item,index) in commentList" :key="index">
                <div class="comment-title">
                    &nbsp&nbsp<span>第{{index+1}}楼&nbsp&nbsp</span>&nbsp&nbsp<span>用户：{{item.user_name}}</span>&nbsp&nbsp<span>发表时间：{{item.add_time}}</span>
                </div>
                <div class="comment-content">
                    <textarea>{{item.content}}</textarea>
                    
                </div>
            </div>
            
        </div>
        <mt-button size="large" plain @click="getMore">加载更多评论</mt-button>
    </div>
    
</template>
<script>
import axios from 'axios';
import {Toast} from 'mint-ui';
export default {
    data(){
        return {
            commentList:[],
            pageindex:1,
            artid:null,
            content:''
        }
    },
    created(){
        this.getComments();
        
    },
    methods:{
        getComments(){
            axios.get('/api/getcomments',{
            params:{
                id:this.infoId,
                pageindex:this.pageindex
            }
            }).then((res)=>{
                if(res.data.status===0){
                    // console.log('getcomments:',res);
                    if(res.data.message.length!=0){
                        this.commentList=this.commentList.concat(res.data.message);
                    }else{
                        Toast('没有评论信息了');
                    }
                    
                }else{
                    Toast('评论获取失败')
                }
            })
        },
        getMore(){
            //加载更多评论
            this.pageindex++;
            this.getComments();
        },
        sendComments(){
            //提交评论
            axios.post('/api/postcomment',{
                artid:this.infoId,
                content:this.content
            }).then(res=>{
                if(res.data.status===0){
                    console.log(res);
                    Toast(res.data.message);
                    this.commentList.unshift({
                        "user_name":'匿名用户',
                        "add_time":Date.now(),
                        "content":this.content
                    });
                    this.content="";
                }else{
                    Toast('评论发表失败');
                }
                
            });
        }
    },
    props:["infoId"]
    
}
</script>

<style lang="scss">
    .mui-btn-block{
        font-size: 14px;
    }
    .send-comment button{
        font-size: 14px;
    }
    .send-comment textarea{
        font-size: 12px;
    }
    .comment-list-container{
        margin-top: 10px;
    }
    .comment-list-container .comment-list .comment-title{
        background: #26a2ff;
        font-size: 12px;
        color: #fff;
    }
    .comment-list-container .comment-list .comment-content textarea{
        font-size: 13px;
        margin: 0;
    }
    .mint-button--default.is-plain{
        font-size: 13px;
    }
</style>