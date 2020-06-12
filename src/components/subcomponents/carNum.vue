<script>
/*
 * @Author: Your name
 * @Date:   2020-06-07 15:37:57
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-06-10 14:49:48
 */
</script>
<template>
    <div>
        <div class="mui-numbox" data-numbox-min="1" style="height:25px;width:">
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input id="test" class="mui-input-numbox" type="number" :value="initCount" ref="numBox" @change="getChange" readonly>
			<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
    </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.js';
export default {
    mounted(){
		mui('.mui-numbox').numbox()
	},
	methods:{
		getChange(){
			this.$store.commit('updateCar',{
				id:this.goodId,
				count:this.$refs.numBox.value
			});
		}
	},
	props:["initCount","goodId"],
	watch:{
		'max':function(newVal,oldVal){
			mui(".mui-numbox").numbox().setOption('max',newVal);
		}
	}
}
</script>
<style lang="scss">
    * {
		touch-action: pan-y;
	}
</style>