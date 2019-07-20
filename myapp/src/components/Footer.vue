<template>
  <footer class="footer">
      <ul>
        <router-link to="/home" tag="li">
          <span class = "iconfont icon-shouye"></span>
          <p>首页</p>
        </router-link>
        <router-link to="/kind" tag="li">
          <span class = "iconfont icon-tubiao113"></span>
          <p>拼团</p>
        </router-link>
        <router-link to="/cart" tag="li" class="cart">
          <span class = "iconfont icon-gouwuche"></span>
          <p>购物车</p>
        </router-link>
        <span v-if="this.$store.getters.totalNum != 0" class="num-spot">{{ this.$store.getters.totalNum }}</span>

        <router-link to="/user" tag="li">
          <span class = "iconfont icon-weibiaoti2fuzhi12"></span>
          <p>我的</p>
        </router-link>
      </ul>
    </footer>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.num-spot {
  position:absolute;
  width:0.16rem;
  height:0.16rem;
  text-align:center;
  line-height:0.16rem;
  border-radius:50%;
  background:#FE4070;
  color:#fff;
  font-size:0.02rem;
  left:65%;
}

</style>
