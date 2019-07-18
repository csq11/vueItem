<template>
  <div class="whole-wrap">
    <van-notice-bar text="好消息！！聚美优品官方旗舰店周年庆于7月30日00：00起盛大促销，心动不如行动，赶快抢购鸭！！！" left-icon="volume-o"/>
    <ul class="wrap">
      <li class="mygoods">
        <div class="shop-name">
          <van-checkbox class="ch-box" checked-color="#FE4070" name="oulaiya" v-model="checked"></van-checkbox>
          欧莱雅官方旗舰店
        </div>
        <div class="info">
          <div class="left">
            <van-checkbox class="ch-box" checked-color="#FE4070" name="oulaiya" v-model="checked"></van-checkbox>
            <img class="pro-img" src="https://s11.mogucdn.com/mlcdn/c45406/181123_498kc2f9gdc9if7ke2fe35egahhjl_640x960.jpg" alt="">
          </div>
          <div class="right">
            <p class="pro-name">旋转化妆品收纳盒透明亚克力梳妆台护肤品口红桌面整理置物架网红</p>
            <span class="price">￥199</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="paybar">
      <div>
        <van-checkbox class="ch-box" checked-color="#FE4070" name="oulaiya" v-model="checked"></van-checkbox>
        <span class="check-all">全选</span>
        <span class="total">合计</span>
        <span class="total-price">￥199</span>
        <div class="pay-btn">
            <span>去结算</span>
            <span>(1)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Checkbox, CheckboxGroup, NoticeBar } from 'vant'

Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(NoticeBar)
export default {
  data () {
    return {
      checked: false
    }
  }
}
</script>

<style lang="scss">
.whole-wrap {
  position:relative;
  .wrap {
    width:90%;
    height:auto;
    margin:0 auto;
    .mygoods {
      width:100%;
      height:2.05rem;
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
          width:1.7rem;
          height:1.5rem;
          .ch-box {
            display:inline-block;
            margin-right:0.14rem;
          }
          .pro-img {
            width:75%;
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
          }
          .price {
            font-size:0.2rem;
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
    background:orange;
    position:fixed;
    bottom:0.5rem;
    line-height:0.6rem;
    .ch-box {
      display:inline-block;
      vertical-align: middle;
      margin-right:0.14rem;
    }
    .check-all {
      font-size:0.2rem;
    }
    .total {
      font-size:0.17rem;
      color:#999;
    }
    .total-price {
      font-size:0.2rem;
      color:#FE4070;
    }
  }
}
</style>
