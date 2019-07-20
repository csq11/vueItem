<template>
	<div class="container">
		<van-nav-bar
	      title="意见反馈"
	      left-arrow
	      @click-left="onClickLeft"
	      @click-right="onClickRight"
	      class="header"
	    >
			<van-icon  class = "iconfont icon-shouye" slot="right" />
		</van-nav-bar>
	    <div class="content">
	    	<van-cell-group>
	    		<div class="title">反馈内容（必填）</div>
		        <van-field
		          v-model="con"
		          clearable
		          placeholder="乐意聆听您对聚美触屏版的意见或建议!"
		        />
				<div class="title">联系方式（选填）</div>
		        <van-field
		          v-model="phone"
		          type="text"
		          clearable
		          placeholder="手机号或邮箱选填"
		        />
		    </van-cell-group>
			<div class="adviceBtn">提交</div>
	    </div>
	</div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Field, Cell, CellGroup, Button, Dialog, Icon} from 'vant'
Vue.use(NavBar)
Vue.use(Field)
Vue.use(Cell).use(CellGroup)
Vue.use(Button)
Vue.use(Icon)

export default{
	data () {
		return {
			con:'',
			phone:''
		}
	},
	methods: {
		onClickRight(){
			this.$router.replace('/home')
		},
		onClickLeft(){
			this.$router.replace('/user')
		}
	}
}
</script>

<style lang="scss">
.header .van-nav-bar__title,.van-nav-bar .van-icon,.header .van-nav-bar__text{
  color:#666;
}
.content{
	background: #efefef;
}
.title,.adviceBtn{
	padding: 10px;
}
.adviceBtn{
	color:#ed145b;
	text-align: center;
	font-size: 16px;
	background:#fff;
	position: fixed;
	bottom: 0;
	width:100%;
}
</style>