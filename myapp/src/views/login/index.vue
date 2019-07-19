<template>
  <div class="container">
    <van-nav-bar
      title="登录"
      right-text="注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :border="borderFlag"
      class="header"
    />
    <div class="content">
      <div class="other-login">使用手机登录</div>
      <van-cell-group :border="borderFlag">
        <van-field
          v-model="username"
          clearable
          :right-icon="usernameIcon"
          placeholder="请输入11位手机号"
          :border="borderFlag"
        />

        <van-field
          v-model="password"
          type="password"
          clearable
          placeholder="6-16登录密码"
          :right-icon="passwordIcon"
          :border="borderFlag"
        />
      </van-cell-group>
      <div class="regDiv">
        <van-button class="loginBtn" type="primary" size="normal" @click="login" :block="true">登录</van-button>
      </div>
      <van-popup v-model="show" :lazy-render="render">
        <div class="showDiv" ref="showMessage"></div>
        <div class="sureBtn" ref="showBtn" @click="hidePopup">确定</div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Field, Cell, CellGroup, Button, Toast, Dialog, Popup } from 'vant'

Vue.use(NavBar)
Vue.use(Field)
Vue.use(Cell).use(CellGroup)
Vue.use(Button)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Popup)

export default {
  data () {
    return {
      username:'13764236681',
      password:'123456',
      borderFlag:false,
      render: false,
      show: false
    }
  },
  computed: {
    usernameState () {
      if (this.username === '') {
        return ''
      } else if (!(/^1[3456789]\d{9}$/.test(this.username))) {
        return '手机号码格式错误'
      } else {
        return ''
      }
    },
    usernameIcon () {
      if (this.username === '') {
        return ''
      } else if ((/^1[3456789]\d{9}$/.test(this.username))) {
        return 'checked'
      } else {
        return ''
      }
    },
    passwordState () {
      if (this.password === '') {
        return ''
      } else if (this.password.length < 5) {
        return '密码格式错误'
      } else {
        return ''
      }
    },
    passwordIcon () {
      if (this.password === '') {
        return ''
      } else if (this.password.length >= 5) {
        return 'checked'
      } else {
        return ''
      }
    }
  },
  // beforeRouteEnter(to,from,next){
  //   console.log(from.name) 
  //   next(vm=>{
  //     console.log(vm)
  //     if(from.name==='user'){
  //       vm.store.commit('changeWhere','user')
  //     }else{
  //       vm.store.commit('changeWhere','')
  //     }
  //   })
  // },
  methods: {
    hidePopup() {
      this.show = false;
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {
      this.$router.replace('/register')
    },
    login () {
      if (this.usernameIcon !== 'checked') {
        this.show=true
        this.$refs.showMessage.innerHTML="请输入正确的手机号码"
        // Toast('手机号格式错误')
        return null
      }
      if (this.passwordIcon !== 'checked') {
        this.show=true
        this.$refs.showMessage.innerHTML="请输入6-16位登录密码"
        // Toast('密码格式错误')
        return null
      }
      // 提交数据到服务器
      fetch('http://localhost:3000/users/login', {
        method: 'post',
        headers: { // 看后端的接口
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'tel=' + this.username + '&password=' + this.password
      }).then(res => res.json()).then(data => {
        // alert(data);
        // console.log(data)
        if (data === 1) {
          Toast('登录成功')
          // 如果使用的token，当你登陆成功，后端返回了一个token值，你将此值存储到本地
          // localStorage.setItem('token', 'sakhsdkjghjksdhfkjhsadhjahdkjsha')
          // 以后在需要验证用户是否登陆时，将此值取出来，然后随着请求发送到服务器，数据库中会有一个字段与之对应，如果匹配，表适用户是登陆的，如果不匹配，表示未登录
          // localStorage.setItem('isLogin', 'ok')
          this.$store.commit('changeLoginState', 'ok')
          this.$store.commit('changeUser', this.username)
          console.log(this.$store)
          this.$router.back()
        } else if (data === 3) {
          Dialog.confirm({
            title: '提示',
            message: '该用户还未注册，是否注册'
          }).then(() => {
            // on confirm
            this.$router.push('/register')
          }).catch(() => {
            // on cancel
          })
        } else if (data === 2) {
          Toast('密码错误')
        } else {
          Toast('登录失败')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.header .van-nav-bar__title,.van-nav-bar .van-icon,.header .van-nav-bar__text{
  color:#666;
}
.van-popup{
  padding: 20px 40px 20px 40px;
  border-radius: 10px;
}
.showDiv{
  width:100%;
  text-align: center;
  padding-bottom: 20px;
}
.sureBtn{
    word-break: keep-all;
    white-space: nowrap;
    border: none;
    outline: none;
    background: #fe4070;
    border-radius: 20px;
    width: 150px;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
}
.van-nav-bar__text{
  font-size: 14px;
}
.van-nav-bar__title{
  font-size: 16px;
}
.other-login {
  position: relative;
  height: 58px;
  line-height: 58px;
  text-align: center;
  color: #999;
  border:none;
}
.van-button--primary{
  background: #feb2c5;
  border:none;
  border-radius: 30px;
} 
.loginBtn{
  margin-top: 15px;
}
.regDiv{
  padding: 0 30px;
}
::-webkit-input-placeholder { /* WebKit browsers */
  color: #999!important;
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #999!important;
}

:-ms-input-placeholder { /* Internet Explorer 10+ */
  color: #999!important;
}   
.van-cell-group{
  padding: 0 30px;
}
.van-cell-group input{
  background:#f5f5f5;
  padding: 10px 0 10px 20px;
  border-radius: 30px;
}
.content{
  background: #fff;
}
</style>
