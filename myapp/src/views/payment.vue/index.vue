<template>
  <div id="pay">
    <div class="pay-title">
       <van-icon class="p-left" name="arrow-left" @click="clickLeft" />
       <span class="p-title">结算中心</span>
       <van-icon class="p-right" name="wap-home" />
    </div>
    <router-view></router-view>
    <div class="name-rule">
      <div>
        <span class="renzheng">实名认证</span>
      </div>
      <div>
        <span class="tongguan">为保通关，请使用和收货人相一致的收获信息</span>
        <span class="tianjia">添加</span>
      </div>
    </div>
    <img class="color-line" src="data:image/png;base64,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" alt="">
    <div class="receive-rule">
      <van-icon class="calender" name="calender-o" />
      <span>工作日/双休/节假日均可收货</span>
      <van-icon class="arrow" name="arrow" />
    </div>
    <div class="order-info">
      
    </div>
    <div class="order-bar">
      <div class="foot-left">
        <span class="heji">合计</span>
        <span class="jiage">￥199</span>
        <p class="count-tip">共计3件商品</p>
      </div>
      <div class="foot-right">
        <div class="order-btn">提交订单</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Cell, CellGroup, Icon } from 'vant'

Vue.use(Cell).use(CellGroup)
Vue.use(Icon)
export default {
  methods: {
    clickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
#pay {
.pay-title {
  font-size:0.16rem;
  width:100%;
  height:0.5rem;
  line-height:0.5rem;
  background:#fff;
  display:flex;
  justify-content: space-between;
  .p-left {
    width:auto;
    height:0.5rem;
    vertical-align: bottom;
    margin-left:0.2rem;
    line-height:0.5rem;
    font-size:0.2rem;
  }
  .p-title {
    text-align:center;
    vertical-align: middle;
  }
  .p-right {
    width:auto;
    height:0.5rem;
    vertical-align: bottom;
    margin-right:0.2rem;
    line-height:0.5rem;
    font-size:0.2rem;
  }
}
.name-rule {
  width:100%;
  height:0.9rem;
  background:rgb(255, 243, 209);
  .renzheng {
    font-size:0.16rem;
    font-weight:bold;
    margin:0.2rem;
    line-height:0.5rem;
  }
  .tongguan {
    margin:0.2rem;
    line-height:0.16rem;
  }
  .tianjia {
    display:inline-block;
    width:0.4;
    height:auto;
    border:1px solid #FE4070;
    color:#FE4070;
    border-radius:0.1rem;
    padding:0 0.06rem;
    font-size:0.12rem;
    
  }
}
.color-line {
  position:absolute;
  top:1.35rem;
  width:100%;
  height:0.05rem;
}
.receive-rule {
  width:100%;
  height:0.5rem;
  line-height:0.4rem;
  background:#fff;
  border-top:0.06rem solid #f0f0f0;
  border-bottom:0.06rem solid #f0f0f0;
  font-size:0.15rem;
  .calender, .arrow {
    vertical-align: middle;
    font-size:0.2rem;
    margin:0 0.2rem;
    color:#ccc
  }
  .arrow {
      margin-left:1.2rem;
      font-size:0.12rem;
  }
}
.order-bar {
  width:100%;
  height:0.6rem;
  border-top:1px solid #ccc; 
  line-height:0.58rem;
  position:fixed;
  bottom:0rem;
  .foot-left {
    width:1rem;
    line-height:0.26rem;
    margin:0.04rem 0.2rem;
    display:inline-block;
    .heji {
      color:#222;
      font-size:0.14rem;
    }
    .jiage {
      font-size:0.2rem;
      color:#FE4070;
    }
    .count-tip {
      color:#999;
      line-height:0.2rem;
    }
  }
  .foot-right {
    display:inline-block;
    position:absolute;
    top:0.1rem;
    right:0.2rem;
    .order-btn {
      width:1.6rem;
      height:0.36rem;
      background:#FE4070;
      color:#fff;
      font-size:0.16rem;
      text-align:center;
      line-height:0.36rem;
      border-radius:0.16rem;
    }
  }
}
}
</style>
