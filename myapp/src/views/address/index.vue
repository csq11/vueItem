<template>
	<div class="container">
		<van-nav-bar
	      title="地址管理"
	      right-text="注册"
	      left-arrow
	      @click-left="onClickLeft"
	      @click-right="onClickRight"
	      class="header"
	    >
			<van-icon  class = "iconfont icon-shouye" slot="right" />
		</van-nav-bar>
		<div class="content">
			<div v-for="(item,index) of addressList" :key="index" class="adlist">
				<div>
					<div>
					<span v-if="item.choose=1" class="choose">默认</span>
				<span>{{ item.name }}</span>
					</div>
					<span>{{ item.tel }}</span>
				</div>
				<div>
					<span>{{ item.city }}{{ item.address }}</span>
					<van-icon name="edit" />
				</div>
				<!-- <div>
					<input type="radio">默认
				</div> -->
			</div>
			<div class="adviceBtn">
					<div class="addBtn">新增地址</div>
			</div>
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
	export default {
		data () {
			return{
				addressList:[]
			}
		},
		mounted () {
			// alert(this.$store.state.tel);
			fetch('http://localhost:3000/address', {
		        method: 'post',
		        headers: { // 看后端的接口
		          'Content-Type': 'application/x-www-form-urlencoded'
		        },
		        body: 'user=' + this.$store.state.tel
		      }).then(res=>res.json()).then(data=>{
		      	console.log(data)
		      	this.addressList=data;
		      	// var str="";
		      	// for(let i=0;i<data.length;i++){

		      	// }
			})
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
.adviceBtn{
	text-align: center;	
	position: fixed;
	bottom: 0;
	width:100%;
	background:#fff; 
	padding: 5px 0;
}
.addBtn{
	font-size: 16px;
	background:#ed145b;
	width:2rem;
	height: 35px;
	line-height: 35px;
	color: #fff;
	font-size: 14px;
	border-radius: 30px;
	margin: 0 auto;
}
.content{
	background:#efefef!important;
}
.adlist>div{
	display: flex;
	justify-content:space-between;
	padding:10px;
	background:#fff;
}
.choose{
	background:#ed145b;
	color: #fff;
	border-radius: 2px;
	margin-right: 5px;
}
</style>