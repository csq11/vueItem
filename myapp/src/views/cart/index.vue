<template>
  <div class="container">
    <header class="header">购物车头部</header>
    <div class="content">购物车内容</div>
  </div>
</template>

<script>
export default {
  mounted () {
    fetch('http://localhost:3000/api/products').then(res => res.json()).then(data => {
      console.log(data)
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log(vm)
      // const loginState = vm.$store.state.loginState
      const { $store: { state: { loginState } } } = vm
      if (loginState === 'ok') {
        next()
      } else {
        next('/login')
      }
    })
  }
}
</script>

<style lang="scss">

</style>
