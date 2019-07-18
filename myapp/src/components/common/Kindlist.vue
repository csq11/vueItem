<template>
  <ul class="kindlist">
    <!-- 编程式跳转 -->
    <li class="kinditem" v-for="(item, index) of kindlist" @click="goDetail(item.id)" :key="index">
      <div class="itemimg">
        <img :src="item.image_url.split(',')[0]"/>
      </div>
      <p class="iteminfo">{{ item.goos_name }}</p>
      <div class="appraise">{{ item.collection }}条评论</div>
      <div class="info">
        <ul class="price_ul">
          <li>￥{{ item.normal_price }}</li>
          <li>单买价{{ item.normal_price }}</li>
        </ul>
        <div class="buyBtn">去开团</div>
      </div>
    </li>
  </ul>
</template>

<script>

export default {
  // props: ['prolist']
  props: {
    kindlist: Array
  },
  methods: {
    goDetail (id) {
      this.$router.push({ path: '/detail/' + id }) // object
    }
  }
}
</script>

<style lang="scss">
@import '@/lib/reset.scss';
.buyBtn{
    color: #fff;
    border: 1px solid #fe4070;
    margin-top: .25rem;
    background: #fe4070;
    width: 88px;
    height: 26px;
    line-height: 26px;
    border-radius: 15px;
    text-align: center;
    /*align-self: center;*/
}
.price_ul{
    align-self: center;
    color:#fe4070;
    font-size: 16px;
}
.price_ul li:nth-child(2){
  font-size: 12px;
  color: #666;
}
.price_ul,.buyBtn{
  position: relative;
  top:-10px;
}
.info{
  @include flexbox();
  @include rect(100%, .7rem);
  justify-content: space-between;
  padding:0 10px;
}
.appraise{
  position: absolute;
  top:1.3rem;
  left:0px;
  font-size:12px;
  background-color:rgba(251,251,251,.8);
  border: 1px solid #eee;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  text-align: center;
  width:80px;
  align-self: center;
}
.kindlist {
  .kinditem {
    position: relative;
    /*@include flexbox();*/
    @include rect(100%, auto);
    @include border(0 0 0.3rem 0,  rgb(246, 244, 244), solid);
    @include margin(0 0);
    /*overflow: hidden;*/
    .itemimg {
      @include rect(1.5rem, 1.5rem);
      /*position: relative;*/
      /*top:-0.2rem;*/
      /*left:0.1rem;*/
      margin:0 auto;
      img {
        @include rect(1.5rem, 1.5rem);
        /*@include margin(0.1rem);*/
        @include border(1px, #000, solid);
      }
    }
    .iteminfo {
      text-align: center;
      text-overflow:ellipsis;
      white-space:nowrap;
      overflow: hidden;
      height:.4rem;
      line-height: .4rem;
     /* @include flex();
      height: 1.5rem;*/
    }
  }
}
</style>
