<template>
  <div>
    <!-- <button>登陆</button>
    <button>注册</button> -->
    <router-link to ="/login" ><van-button type="primary">登陆</van-button></router-link>
    <router-link to ="/register" ><van-button type="primary">注册</van-button></router-link>
    <AreaList></AreaList>
  </div>
</template>
<script>
import Vue from 'vue'
import { Button, Area } from 'vant'
import AreaList from '@/components/common/Area'
Vue.use(Button) // 类似于全局注册组件，无需在js中再次使用components注册组件
Vue.use(Area)

export default {
  components: {
    AreaList
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>{
       // if (localStorage.getItem('isLogin') === 'ok') {
        if(vm.$store.state.loginState === 'ok'){
          next('/user/login')
        }else {
          next()
        }
    })
  }
}
</script>
