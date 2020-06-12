<template>
    <div>
        <h2>用户评价</h2>
        <comments></comments>
    </div>
    
</template>
<script>
import comments from '../subcomponents/comments.vue';
export default {
    data(){
        return {

        }
    },
    methods:{

    },
    components:{
        comments
    }
}
</script>
<style lang="scss" scoped> 
    h2{
        font-size: 14px;
        color: royalblue;
        text-align: center;
        line-height: 20px;
    }
</style>