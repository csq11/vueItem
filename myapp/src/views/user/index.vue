<template>
  <div class="container">   
    <div class="content">
      <div class="header_con">
        <van-nav-bar ref="userHeader" title="我的聚美" left-text="" left-arrow class="headers" :border="borderFlag">
          <van-icon  class = "iconfont icon-shouye" slot="right" />
        </van-nav-bar>
      <!-- <header class="header">个人中心头部</header> -->
        <div class="pt_10" v-show="flag">
            <img class="user" src="../../images/nologin.png" alt="头像">
        </div>
        <div class="user_btn" v-show="flag">
            <router-link to ="/register" ><div class="btn">注册</div></router-link>
            <span>|</span>
            <router-link to ="/login" ><div class="btn">登陆</div></router-link>    
        </div>
        <div class="login_info" v-show="loginFlag">
          <div ref="username">JM1IEMAuRPOm0</div>
          <div class="level">普通会员</div>
        </div>
      </div>
      <div class="iconDiv bk_w loginList" v-show="loginFlag">
          <div class="loginHeder">
            <img class="user" src="../../images/nologin.png" alt="头像">
          </div>
          <ul>
            <li><van-icon name="like-o"/></li>
            <li>心愿单</li>
          </ul>
          <ul>
            <li><van-icon name="clock-o"/></li>
            <li>开售提醒</li>
          </ul>
          <ul>
            <li><van-icon name="star-o"/></li>
            <li>收藏</li>
          </ul>
      </div>
      <div class="mt_10 order bk_w">
          <div>
            <van-icon name="orders-o" class="mr_10"/>
            <span>我的订单</span>
          </div>
          <div>
            查看我的全部订单
            <van-icon name="arrow" class="ml_10"/>
          </div>              
        </div>
      <div class="iconDiv bk_w">
          <ul>
            <li><van-icon name="pending-payment"/></li>
            <li>待付款</li>
          </ul>
          <ul>
            <li><van-icon name="send-gift-o"/></li>
            <li>待收货</li>
          </ul>
          <ul>
            <li><van-icon name="chat-o"/></li>
            <li>待评价</li>
          </ul>
          <ul>
            <li><van-icon name="after-sale"/></li>
            <li>退货/退款</li>
          </ul>
      </div>
      <div class="mt_10 order bk_w">
          <div>
            <van-icon name="goods-collect-o" class="mr_10"/>
            <span>我的资产</span>
          </div>
          <!-- <div>
            查看我的全部订单
            <van-icon name="arrow" class="ml_10"/>
          </div>   -->            
      </div>
      <div class="iconDiv bk_w">
          <div>现金券</div>
          <div>红包</div>
          <div>聚美余额</div>
          <div>礼品卡</div>
      </div>
      <div class="mt_10 order bk_w">
          <div>
            <van-icon name="service-o" class="mr_10"/>
            <span>售后服务</span>
          </div>
          <div>
            <van-icon name="arrow" class="ml_10"/>
          </div>              
      </div>
      <div class="order bk_w">
          <div>
            <van-icon name="records" class="mr_10"/>
            <span>意见反馈</span>
          </div>
          <div>
            <van-icon name="arrow" class="ml_10"/>
          </div>              
      </div>
      <div class="order bk_w">
          <div>
            <van-icon name="logistics" class="mr_10"/>
            <span>收货地址</span>
          </div>
          <div>
            <van-icon name="arrow" class="ml_10"/>
          </div>              
      </div>
      <div class="order bk_w" @click="outLogin">
          <div>
            <van-icon name="setting-o" class="mr_10"/>
            <span>退出登录</span>
          </div>
          <div>
            <van-icon name="arrow" class="ml_10"/>
          </div>              
      </div>
      <a class="tel" href="tel: 400-123-8888">
        <div class="order bk_w">
          <div>
            <van-icon name="phone-circle-o" class="mr_10"/>
            <span>400-123-8888</span>
          </div>
          <div>
            <van-icon name="arrow" class="ml_10"/>
          </div>              
        </div>
      </a>
        <!-- 根据路由显示已登录的组件还是未登录的组件 --- 嵌套路由 -->
        <!-- <router-view></router-view> -->
      <div class="hint">
        客服热线400-123-8888 (8:00-22:00)<br>拨打前请记录您的UID  0    
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue' 
import { NavBar, Icon, Button, Dialog } from 'vant'
Vue.use(NavBar)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Dialog)

export default {
  // inject: ['reload'],
  data () {
    return {
      flag:true,
      loginFlag:false,
      borderFlag:false
    }
  },
   methods: {
      onClickLeft() {
        Toast('返回');
      },
      onClickRight() {
        Toast('按钮');
      }
    },
    mounted () {
      // alert(this.$store.state.loginState)
      // alert(this.$store.state.tel)
      if(this.$store.state.loginState === 'ok'){
        this.flag=false;
        this.loginFlag=true;
        fetch('http://localhost:3000/users/info',{
        method: 'post',
        headers: { // 看后端的接口
          'Content-Type': 'application/x-www-form-urlencoded'
        },
          body: 'tel='+ this.$store.state.tel
        }).then(res=>res.json()).then(data=>{
          this.$refs.username.innerHTML=data[0].tel
          // alert(data[0].tel)
          console.log(data)
        })
      }else{
        this.flag=true;
        this.loginFlag=false;
      }
    },
    methods: {
      outLogin () {
        Dialog.confirm({
            title: '提示',
            message: '是否退出登录'
          }).then(() => {
            // on confirm
            this.$store.state.loginState="";
            // this.reload();
            this.$router.go(0);
          }).catch(() => {
            // on cancel
          })
        
      }
    },
    beforeRouteEnter(to,from,next){
      if(from.name==="login"||from.name==="register"){
        // location.reload()
        next(vm=>{
          var a=document.querySelector(".van-nav-bar .van-icon")
          var b=document.querySelector(".van-nav-bar__right").children
          a.style.cssText ="color:#fff!important;"
          b[0].style.cssText ="color:#fff!important;"
          // b.style.color="#fff"
          console.log(b[0])
          // console.log(vm.$refs.userHeader)
          // vm.$store.commit("changeUser","user")
          // vm.$refs.userHeader.style.color="#fff!important"
        })
      }else{
        next();
      }
    }
  // watch: {
  //   $route (newVal, oldVal) {
  //     if (newVal.name === 'user') {
  //       // if (localStorage.getItem('isLogin') === 'ok') {
  //       if (this.$store.state.loginState === 'ok') {
  //         this.$router.replace('/user/login')
  //       } else {
  //         this.$router.replace('/user/nologin')
  //       }
  //     }
  //   }
  // },
  // beforeRouteEnter (to, from, next) {
  //   console.log(to.name)
  //   // if (to.name === 'user') {
  //   //   if (localStorage.getItem('isLogin') === 'ok') {
  //   //     next('/user/login')
  //   //   } else {
  //   //     next('/user/nologin')
  //   //   }
  //   // } else {
  //   //   next()
  //   // }
  //   next(vm => {
  //     if (to.name === 'user') {
  //       // if (localStorage.getItem('isLogin') === 'ok') {
  //       if (vm.$store.state.loginState === 'ok') {
  //         vm.$router.replace('/user/login')
  //       } else {
  //         vm.$router.replace('/user/nologin')
  //       }
  //     } else {
  //       next()
  //     }
  //   })
  // }
}
</script>

<style lang="scss">
.headers .van-nav-bar__title,.headers>.van-nav-bar .van-icon,.headers .van-nav-bar__text{
  color:#fff;
}
.loginList>div,.loginList>ul{
  width:25%;
  text-align: center;
}
.loginHeder{
  position: relative;
}
.loginHeder img{
  position: absolute;
  top:-100%;
  left:60%;
}
.login_info{
  padding-top:.3rem;
  color: #fff;
  width:60%;
  float: right;
}
.hint {
    color: #999;
    font-size: 11px;
    margin: 15px;
    line-height: 15px;
}
.tel{
  color: #222;
}
.iconDiv{
  display: flex;
  justify-content:space-between;
  padding:15px 15px 10px 15px;
}
/*van-icon-orders-o,.van-icon-arrow*/
.van-icon{
  font-size:.2rem!important;
}
.van-icon-pending-payment,.van-icon-send-gift-o,.van-icon-chat-o,.van-icon-after-sale{
  font-size:.25rem!important;
  display: block;
  text-align: center;
  /*position: relative;
  left:50%;
  margin-left: -.125rem;*/
  /*margin-left:6px;*/
}
.order{
  display: flex;
  justify-content:space-between;
  padding: 10px;
  border-bottom: 1px solid #eaeaea;
}
.order>div{
  align-self: center;
  display: flex;
}
.order>div>i{
  align-self: center;
}
.content{
  background:#efefef;
}
.header_con{
  overflow: hidden;
  background-image: -webkit-linear-gradient(294deg,#fd465f 0,#fc5e9f 100%);
  background-image: linear-gradient(-204deg,#fd465f 0,#fc5e9f 100%);
}
.headers{
  background-color: rgba(255,255,255,0)!important;
}
.van-nav-bar__title{
  color: #fff;
  font-size: 14px;
}
.van-nav-bar .van-icon{
  color:#fff;
  font-size: 20px;
}
.user{
  height: 60px;
  width: 60px;
  margin-left:-30px;
  position: relative;
  left:50%;
}
.user_btn{
  display: flex;
  width:2rem;
  height: .5rem;
  line-height: .5rem;
  margin:0 auto;
  text-align: center; 
}
.user_btn>a{
  align-self: center;
  flex-grow: 1;
  font-weight: bolder;
  font-size: 18px;
}
.user_btn>a,.user_btn>span{
  color: #fff;
  align-self: center;
}
.pt_10{
  padding-top:10px;
}
.mt_10{
  margin-top:10px;
}
.ml_10{
  margin-left:10px;
}
.mr_10{
  margin-right:10px;
}
.order{
  background:#fff;
}
.bk_w{
  background: #fff;
}
</style>
