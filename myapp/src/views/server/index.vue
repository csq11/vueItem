<template>
	<div class="container">
		<van-nav-bar
	      title="售后服务"
	      right-text="注册"
	      left-arrow
	      @click-left="onClickLeft"
	      @click-right="onClickRight"
	      class="header"
	    >
			<van-icon  class = "iconfont icon-shouye" slot="right" />
		</van-nav-bar>
	    <div class="content">
			<div class="mt_10 order bk_w">
	          <div>
	            <span>我的售后记录</span>
	          </div>
	          <div>
	          	<span class="ml_10">0条</span>
	            <van-icon name="arrow" class="ml_10"/>
	          </div>              
	      	</div>
	      	<div class="mt_10 order bk_w">
	          <div>
	            <span>我的换货记录</span>
	          </div>
	          <div>
	          	<span class="ml_10">0条</span>
	            <van-icon name="arrow" class="ml_10"/>
	          </div>              
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

export default{
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
.mt_10{
  margin-top:10px;
}
.ml_10{
  margin-left:10px;
}
.order{
  display: flex;
  justify-content:space-between;
  padding: 10px;
  border-bottom: 1px solid #eaeaea;
}
.bk_w{
  background: #fff;
}
</style>