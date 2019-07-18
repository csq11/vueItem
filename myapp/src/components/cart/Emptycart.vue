<template>
  <div class="nogoods">
    <img src="http://f3.jmstatic.com/static_cart_mobile/images/no-card-oops.png" alt="">
    <p>您的购物车中还没有商品，先去挑选心爱的商品吧</p>
    <router-link tag="button" to="/home">去逛逛</router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  .nogoods {
    width:100%;
    height:70%;
    img {
      width:26%;
      height:31%;
      display:block;
      margin:1rem auto;
      margin-bottom:0.15rem;
    }
    p {
      text-align:center;
      font-size:0.16rem;
    }
    button {
      width:1.5rem;
      height:0.4rem;
      margin:0.2rem auto;
      color:#fff;
      font-size:0.16rem;
      display:block;
      border:none;
      border-radius:0.5rem;
      background:#FE4070;
    }
  }
</style>
