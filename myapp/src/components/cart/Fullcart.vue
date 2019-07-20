<template>
  <div class="whole-wrap">
    <van-notice-bar text="好消息！！聚美优品官方旗舰店周年庆于7月30日00：00起盛大促销，心动不如行动，赶快抢购鸭！！！" left-icon="volume-o"/>
    <ul class="wrap">
      <li class="mygoods" v-for="(item, index) of cartList" :key="index">
        <div class="shop-name">
          <van-checkbox class="ch-box" checked-color="#FE4070" name="oulaiya" v-model="item.flag"></van-checkbox>
          {{ item.title }}
        </div>
        <div class="info">
          <div class="left">
            <van-checkbox class="ch-box" checked-color="#FE4070" name="oulaiya" v-model="item.flag"></van-checkbox>
            <img class="pro-img" :src="item.img" alt="">
          </div>
          <div class="right">
            <p class="pro-name">{{ item.desc }}</p>
            <div class="pro-count">
              <span class="reduce count-btn" @click="item.num > 1 ? item.num -= 1 : item.num =1 ">－</span>
              <span class="count-num">{{ item.num }}</span>
              <span class="add count-btn" @click ="item.num += 1">＋</span>
            </div>
            <span class="price">￥{{ item.price }}</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="paybar">
      <div>
        <van-checkbox class="ch-box all-box" checked-color="#FE4070" v-model="checked"></van-checkbox>
        <span class="check-all">全选</span>
        <span class="total">合计</span>
        <span class="total-price">￥{{ totalPrice }}</span>
        <router-link class="pay-btn" to="/payment" tag="div">
            <span>去结算</span>
            <span>({{ totalNum }})</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Checkbox, CheckboxGroup, NoticeBar } from 'vant'
import { mapState } from 'vuex'

Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(NoticeBar)
export default {
  data () {
    return {
      checked: false,
      countnum: ''
    }
  },
  computed: {
    ...mapState({
      cartList (state) {
        return state.cartList
      }
    }),
    totalNum () {
      // var totalNum = 
      return this.$store.getters.totalNum
    },
    totalPrice () {
      return this.$store.getters.totalPrice
    }
  },
  mounted () {
    let arr = [
      {
        id: 1,
        title: '页面布局经典案例视频',
        price: 100,
        desc: '讲解各种常见及有趣的网页特效案例，通过51个有趣的网页案例，全面的掌握常见网页开发中的各种布局及特效。',
        num: 1,
        img: 'http://www.codingke.com/files/course/2019/05-30/113404c6ac63611990.png'
      },
      {
        id: 2,
        title: 'HTML5移动端混合应用开发项目案例实战视频',
        price: 200,
        desc: '本主要结束HTML5移动端混合应用开发,其Canvas、video视频、swiper案例、混合开发结合MUI等。',
        num: 1,
        img: 'http://www.codingke.com/files/course/2018/11-21/1704480a5110823439.jpg'
      },
      {
        id: 3,
        title: 'HTML5面试题讲解',
        price: 300,
        desc: '本视频主要围绕面试题展开，分析面试中各种常见题型并提出方案，让同学在面试中能够脱颖而出，取得成功。',
        num: 1,
        img: 'http://www.codingke.com/files/course/2018/01-04/160518e6ad6b029361.jpg'
      },
      {
        id: 4,
        title: '千锋前端全栈HTML5零基础项目实战就业班',
        price: 400,
        desc: '内容包含PC及移动端开发，全栈开发必须要掌握的技能，是基础到实战，编程小白成为全栈大神的精品课程。精选时下最流行技术，包含Node.js、Vue.js、React.js、ReactNative、微信公众号、微信小程序等内容，良心打造，物超所值。',
        num: 1,
        img: 'https://10.url.cn/qqke_course_info/ajNVdqHZLLDxeb5AdY0HJYqsKZaU5pSI6pwFd4bgvv4iakMCY9BGV5RlstPicWQyRNWrVf2pWtxVk/'
      }
    ]
    arr.map(item => {
      item.flag = false
    })
    this.$store.commit('changeCartList', {
      result: arr
    })
  }
}
</script>

<style lang="scss" scoped>
.whole-wrap {
  position:relative;
  .wrap {
    width:90%;
    height:auto;
    margin:0 auto;
    .mygoods {
      width:100%;
      height:1.7rem;
      border-top:0.05rem solid rgb(245, 243, 243);
      .shop-name {
        width:100%;
        height:0.4rem;
        display:inline-block;
        line-height:0.4rem;
        border-bottom:1px solid rgb(245, 243, 243);
        font-size:0.16rem;
        vertical-align: baseline;
        .ch-box {
          display:inline-block;
          vertical-align: middle;
          margin-right:0.14rem;
        }
      }
      .info {
        display:inline-flex;
        .left {
          width:1.2rem;
          height:1rem;
          .ch-box {
            display:inline-block;
            margin-right:0.14rem;
          }
          .pro-img {
            width:70%;
            height:80%;
            margin-top:0.1rem;
          }
        }
        .right {
          display:inline-block;
          flex:1;
          .pro-name {
            margin-left:0.1rem;
            margin-top:0.1rem;
            width:39%;
            height:0.2rem;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            margin-bottom:0.08rem;
          }
          .pro-count {
            width:1.5rem;
            height:0.24rem;
            margin-bottom:0.08rem;
            .count-btn {
              display:inline-block;
              width:0.24rem;
              height:0.24rem;
              font-size:0.2rem;
              text-align:center;
              line-height:0.2rem;
              border:1px solid #ccc;
              border-radius:50%;
              margin:0 0.1rem;
            }
            .count-num {
              display:inline-block;
              width:0.2rem;
              height:0.2rem;
              line-height:0.2rem;
              text-align:center;
              font-size:0.16rem;
            }
          }
          .price {
            font-size:0.16rem;
            color:#FE4070;
            margin-left:0.08rem;
          }
        }
      }
    }
  }
  .paybar {
    width:100%;
    height:0.6rem;
    position:fixed;
    bottom:0.5rem;
    line-height:0.6rem;
    background:#fff;
    .ch-box {
      display:inline-block;
      vertical-align: middle;
      margin-right:0.14rem;
    }
    .all-box {
      display:inline-block;
      width:auto;
      height:auto;
      margin:0.2rem;
      vertical-align: top;
    }
    .check-all {
      font-size:0.2rem;
      margin:0.1rem;
    }
    .total {
      font-size:0.17rem;
      color:#999;
    }
    .total-price {
      font-size:0.2rem;
      color:#FE4070;
    }
    .pay-btn {
      display:inline-block;
      width:1.3rem;
      height:0.4rem;
      background:#FE4070;
      color:#fff;
      text-align:center;
      border-radius:0.3rem;
      position:absolute;
      right:0.2rem;
      top:0.1rem;
      line-height:0.4rem;
      font-size:0.16rem;
    }
  }
}
</style>
