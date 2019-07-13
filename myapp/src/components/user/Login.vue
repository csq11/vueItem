<template>
  <div>
    欢迎您****
  </div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    // if (localStorage.getItem('isLogin') === 'ok') {
    next(vm=>{
      // const { $store: { state: { loginState } } } = vm
      // console.log('vm',vm)
      if (vm.$store.state.loginState === 'ok') {
        next()
      }else {
        next('/user/nologin')
      }
    })
    
  }
}
</script>
