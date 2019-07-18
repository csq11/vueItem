<template>
  <div class="container">
    <header class="header cartheader"></header>
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

<style lang="scss">
  .cartheader, .header {
    background:#999;
  }
</style>
