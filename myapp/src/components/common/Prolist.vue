<template>
  <ul class="prolist">
    <!-- 编程式跳转 -->
    <li class="proitem" v-for="(item, index) of prolist" @click="goDetail(item.id)" :key="index">
      <div class="itemimg">
        <img :src="item.image_url.split(',')[0]"/>
      </div>
      <div class="iteminfo">
        <p class="pro_title">{{ item.goos_name }}</p>
        <p class="price">￥158</p>
        <p class="com">1180条评论</p>
      </div>
    </li>
    <!-- 声明式跳转 -->
    <!-- <router-link tag="li" :to="{ name: 'detail', params: { id: item.id }}" class="proitem" v-for="(item, index) of prolist" :key="index">
      <div class="itemimg">
        <img :src="item.images.small" :alt="item.alt" />
      </div>
      <div class="iteminfo">
        <h3>{{ item.title }} --- {{ item.rating.average }}</h3>
        <div class="directors">
          导演：<span v-for="(itm, idx) of item.directors" :key="idx">{{ itm.name }}/</span>
        </div>
        <div class="casts">
          演员： <span v-for="(itm, idx) of item.casts" :key="idx">{{ itm.name }}/</span>
        </div>
        <Rating :rating="(item.rating.average / 2).toFixed(1)"/>
      </div>
    </router-link> -->
  </ul>
</template>

<script>

export default {
  // props: ['prolist']
  props: {
    prolist: Array
  },
  methods: {
    goDetail (id) {
      // vue的路由其实你可以看做是一个数组，每次添加一个页面（每次给数组中push一个），点击返回的时候，就去上一个值
      // 首页---分类 ['/home']  ==== >   [ '/home', '/kind']
      // 分类点击返回 [ '/home', '/kind'] ==== > ['/home']，但是并不是就删除了 '/kind'
      // 编程式导航其实就是调用  this.$router.push()  this.$router.back() ...
      // console.log(this.$router)
      // this.$router.push('/detail/' + id) // string
      // this.$router.push({ name: 'detail', params: { id: id } }) // object
      this.$router.push({ path: '/detail/' + id }) // object
    }
  }
}
</script>

<style lang="scss">
@import '@/lib/reset.scss';
.prolist {

  .proitem {
    @include flexbox();
    @include rect(100%, 1.5rem);
    @include border(0 0 0.3rem 0,  rgb(246, 244, 244), solid);
    @include margin(0.1rem 0);
    .itemimg {
      @include rect(1.5rem, 1.5rem);
      position: relative;
      top:-0.2rem;
      left:0.1rem;
      img {
        @include rect(1.5rem, 1.5rem);
        @include margin(0.1rem);
        @include border(1px, #000, solid);
      }
    }
    .iteminfo {
      position:relative;
      left:0.2rem;
      .pro_title {
        width:90%;
        height:45%;
        overflow:hidden;
        padding:0 0.2rem;
        font-size:0.13rem;
      }
      .price {
        font-size:0.16rem;
        color:#FE4070;
        margin-top:0.18rem;
        padding-left:0.2rem;
      }
      .com {
        font-size:0.12rem;
        color:#999;
        padding-left:0.2rem;
      }
    }
  }
}
</style>
