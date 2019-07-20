<template>
<div>
    <header class="header">
      <div class="search-box">
        <input class="home-input" type="text" placeholder="搜索商品 分类 功效" disabled>
        <van-button class="popsearch" @click="showPopsearch"></van-button>
        <van-popup class="vanpop" v-model="show1" position="right" :style="{width:'100%',height:'100%'}">
          <div class="s-top">
            <van-icon class="s-arrow" name="arrow-left" @click="show2"/>
            <van-icon class="s-search" name="search" />
            <input class="s-input" type="text"  placeholder="搜索商品名称、品牌、功效">
            <span class="s-tip">搜索</span>
          </div>
        </van-popup>
        <!-- <span><van-icon name="search"/></span> -->
        <van-button class="popbtn" @click="showPopup">
          <van-icon class="search-icon" name="search"/>
        </van-button>
        <van-popup v-model="show" position="right" :style="{width:'80%',height:'100%'}">内容</van-popup>
      </div>
    </header>
  <ul class="prolist">
    <!-- 编程式跳转 -->
    <li class="proitem" v-for="(item, index) of prolist" @click="goDetail(item.id)" :key="index">
      <div class="itemimg">
        <img :src="item.image_url.split(',')[0]"/>
      </div>
      <div class="iteminfo">
        <p class="pro_title">{{ item.goos_name }}</p>
        <p class="price">￥{{ item.normal_price }}</p>
        <p class="com">{{ item.collection }}条评论</p>
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
</div>
</template>

<script>
import Vue from 'vue'
import { Icon, Popup, Button } from 'vant'

Vue.use(Icon)
Vue.use(Popup)
Vue.use(Button)
export default {
  // props: ['prolist']
  props: {
    prolist: Array
  },
  methods: {
    show2 () {
      this.show1 = false
      this.show = true
    },
    showPopsearch () {
      this.show1 = true
    },
    showPopup () {
      this.show = true
    },
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

.search-box {
  width:100%;
  height: 100%;
  background: #fff;
  position:relative;
  .home-input {
    display:inline-block;
    width:80%;
    height:80%;
    position:relative;
    left:0.2rem;
    top:0.08rem;
    background:rgb(236, 233, 233);
    border-radius: 20px;
    outline: none;
    padding-left:0.2rem;
    font-size:0.13rem;
    border:none
  }
  input::-webkit-input-placeholder {
    color:#ccc;
    font-size:0.15rem;
    text-align:center;
  }
  .popsearch {
    position:absolute;
    width:80%;
    height:80%;
    background:brown;
    left:0.2rem;
    top:0.08rem;
    opacity:0;
  }
  .vanpop {
    .s-top {
      width:100%;
      height:0.5rem;
      line-height:0.5rem;
      position:relative;
      border-bottom:1px solid #ccc;
      .s-arrow {
        font-size:0.2rem;
        position:absolute;
        left:0.1rem;
        top:0.15rem;
      }
      .s-input {
        position:relative;
        top:-0.01rem;
        width:70%;
        margin-left:0.2rem;
        background:rgb(236, 236, 236);
        padding-left:0.5rem;
        box-sizing: border-box;
        font-size:0.18rem;
        color:#999;
      }
      .s-input::-webkit-input-placeholder {
        color:#ccc;
        font-size:0.15rem;
        text-align:left;
      }
      .s-search {
        font-size:0.2rem;
        position:relative;
        left:0.8rem;
        top:0.06rem;
        z-index:100;
      }
      .s-tip {
        position:absolute;
        right:0.2rem;
        color:#888;
      }
    }
  }
  .popbtn {
    display:inline-block;
    width:0.3rem;
    height:0.3rem;
    position:absolute;
    right:0.18rem;
    top:0.12rem;
    font-size:0.3rem;
    vertical-align:top;
    background:rgba(255, 255, 255, 0);
    border:none
  }
  .search-icon {
    color:#222;
    position:absolute;
    left:0;
    top:0;
  }
}
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
