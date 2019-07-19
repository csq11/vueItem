<template>
  <div class="container">
    <van-nav-bar
      title="注册"
      right-text="登录"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      class="header"
    />
    <div class="content">
      <div class="other-login">使用手机注册</div>
      <van-cell-group :border="borderFlag">
        <van-field
          v-model="username"
          clearable
          :right-icon="usernameIcon"
          placeholder="请输入手机号"
          :border="borderFlag"
        />
        <!-- :error-message="usernameState" -->
        
        <van-field
          v-model="sms"
          center
          clearable
          placeholder="请输入短信验证码"
          :border="borderFlag"
        >
          <van-button class="telYan" slot="button" @click="sendCode" size="small" type="primary">验证</van-button>
        </van-field>

        <van-field
          v-model="password"
          type="password"
          clearable
          placeholder="请输入密码"
          :right-icon="passwordIcon"
          :border="borderFlag"
        />
        <!--   :error-message="passwordState" -->
        
      </van-cell-group>

      <div class="regDiv">
        <van-button class="regBtn" type="primary" size="normal" @click="register" :block="true">注册</van-button>
      </div>

      <div class="last_info">
        点击注册，表示同意 
        <a href="http://i.jumei.com/m/account/protocol">《聚美优品用户协议》</a>
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
      username: '',
      password: '',
      sms: '',
      code: '',//a.a.a?a*aa
      borderFlag:false,
      show: false,
      render: false
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
  methods: {
    hidePopup() {
      this.show = false;
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {
      this.$router.replace('/login')
    },
    sendCode () {
      fetch('https://www.daxunxun.com/users/sendCode?tel=' + this.username)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data === 1) {
            Toast('该手机号已经注册')
          } else if (data === 0) {
            Toast('获取验证码失败')
          } else {
            this.code = data.code // 模拟操纵
          }
        })
    },
    register () {
      if (this.sms !== this.code) {
        this.show=true
        this.$refs.showMessage.innerHTML="验证码错误"
        // Toast('验证码错误')
        return null
      }
      if (this.usernameIcon !== 'checked') {
        this.show=true
        // console.log(this.$refs.showMessage)
        this.$refs.showMessage.innerHTML="请输入正确的手机号码"
        // Toast('手机号格式错误')
        return null
      }
      if (this.passwordIcon !== 'checked') {
        this.show=true
        // console.log(this.$refs.showMessage)
        this.$refs.showMessage.innerHTML="请输入6-16位登录密码"
        // Toast('密码格式错误')
        return null
      }
      // 提交数据到服务器
      fetch('http://localhost:3000/users/register', {
        method: 'post',
        headers: { // 看后端的接口
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'tel=' + this.username + '&password=' + this.password
      }).then(res => res.json()).then(data => {
        console.log(data)
        if (data === 1) {
          Toast('注册成功')
          this.$router.push('/login')
        } else if (data === 2) {
          Dialog.confirm({
            title: '提示',
            message: '该用户已经注册，是否直接登录'
          }).then(() => {
            // on confirm
            this.$router.push('/login')
          }).catch(() => {
            // on cancel
          })
        } else {
          Toast('注册失败')
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
.content{
  /*padding: 0 30px;*/
  background:#fff;
}
.other-login {
  position: relative;
  height: 58px;
  line-height: 58px;
  text-align: center;
  color: #999;
  border:none;
}
.van-nav-bar__text{
  font-size: 14px;
}
.van-nav-bar__title{
  font-size: 16px;
}
.van-button--primary{
  background: #feb2c5;
  border:none;
  border-radius: 30px;
} 
.telYan{
  background:#fff;
  color: #feb2c5;
  border-radius: 30px;
  border:1px solid #feb2c5;
  font-size: 14px;
}
.last_info{
  color:#999;
  font-size: 12px;
  text-align: center;
  margin-top: 20px; 
}
.last_info a{
  color:#999;
}
.van-cell-group{
  padding: 0 30px;
}
.van-cell-group input{
  background:#f5f5f5;
  padding: 10px 0 10px 20px;
  border-radius: 30px;
}
.van-cell-group .van-cell{
  padding: 10px 0;
}
.regBtn{
  margin-top: 15px;
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
.regDiv{
  padding: 0 30px;
}
.van-cell-group .van-cell:first-child{
  padding-top:0;
}
</style>
