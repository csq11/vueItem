<template>
  <div class="container">
    <header class="header cartheader">购物车</header>
    <div class="content">
      <!-- <Emptycart /> -->
      <Fullcart />
    </div>
  </div>
</template>

<script>
// import Emptycart from '@/components/cart/Emptycart.vue'
import Fullcart from '@/components/cart/Fullcart.vue'
export default {
  components: {
    Fullcart
  }
  // beforeRouteEnter (to,from,next) {
  //   next(vm => {
  //     if (vm.$store.state)
  //   })
  // }
}
</script>

<style lang="scss" scoped>
  .cartheader, .header {
    background:#999;
  }
  .cartheader {
    text-align:center;
    font-size:0.16rem;
    line-height:0.5rem;
    color:#fff;
    background:#FE4070 !important
  }
</style>
