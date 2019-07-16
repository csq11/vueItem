<template>
  <div class="container">
    <header class="header">
      <div class="search-box">
        <input type="text" placeholder="搜索商品 分类 功效">
        <!-- <span><van-icon name="search"/></span> -->
        <van-button class="popbtn" @click="showPopup">
          <van-icon class="search-icon" name="search"/>
        </van-button>
        <van-popup v-model="show" position="right" :style="{width:'80%',height:'100%'}">内容</van-popup>
      </div>
    </header>
    <div class="content" id="content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <!-- <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) of bannerlist" :key = "index">
            <img :src="item" alt="">
          </van-swipe-item>
        </van-swipe> -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <Prolist :prolist = "prolist"/>
        </van-list>
      </van-pull-refresh>
      <Backtop :show="flag"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { List, PullRefresh, Icon, Popup, Button } from 'vant'
import Prolist from '@/components/common/Prolist'
import Backtop from '@/components/Backtop'

Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Icon)
Vue.use(Popup)
Vue.use(Button)
export default {
  data () {
    return {
      bannerlist: [],
      prolist: [],
      loading: false, // 当组件滚动到底部时，会触发load事件并将loading设置成true
      finished: false, // 当没有数据时，此值为true
      pageNum: 1, // 页码
      isLoading: false,
      flag: false,
      img: '',
      show: false
    }
  },
  methods: {
    showPopup () {
      this.show = true
    },
    onRefresh () {
      this.isLoading = true
      fetch('http://localhost:3000/products/paging').then(res => res.json()).then(data => {
        this.isLoading = false // 下拉刷新结束
        this.prolist = data // 重置列表的数据
        this.pageNum = 1 // 重置页码 --- 下拉刷新相当于第一页数据
        this.finished = false // 表示可以继续上拉加载下一页的数据
      })
    },
    onLoad () {
      console.log('可以加载数据了')
      this.loading = true // 开始加载数据
      fetch('http://localhost:3000/products/paging?count=10&start=' + this.pageNum * 20)
        .then(res => res.json()).then(data => {
          this.loading = false // 数据加载完毕
          this.pageNum++
          if (data.length === 0) {
            console.log('没有数据了')
            this.finished = true // 没有数据了
          } else {
            // 有数据就要涉及到数字的合并   concat
            this.prolist = [...this.prolist, ...data]
          }
        })
    },
    scrollFn () {
      // console.log(event.target.scrollTop)
      if (event.target.scrollTop > 150) {
        this.flag = true
      } else {
        this.flag = false
      }
    }
  },
  components: {
    Prolist, // Prolist: Prolist
    Backtop
  },
  mounted () {
    // 请求的是列表的数据
    fetch('http://localhost:3000/products').then(res => res.json()).then(data => {
      this.prolist = data
    })
    // 找到DOM节点
    const content = document.querySelector('#content')
    // 开启监听滚动条的滚动事件
    content.addEventListener('scroll', this.scrollFn)
  },
  beforeRouteLeave (from, to, next) { // 在离开这个路由之前 --- 导航守卫
    const content = document.querySelector('#content')
    content.removeEventListener('scroll', this.scrollFn)
    let position = content.scrollTop
    localStorage.setItem('position', position)
    next() // 继续执行后续的业务逻辑
  },
  watch: {
    $route (newVal, oldVal) {
      if (newVal.name === 'home') {
        const content = document.querySelector('#content')
        content.scrollTop = localStorage.getItem('position')
      }
    }
  }
}
</script>

<style lang="scss">
.search-box {
  width:100%;
  height: 100%;
  background: #fff;
  input {
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
.backTop {
  position: fixed;
  bottom: 0.6rem;
  right: 15px;
  width: 30px;
  height: 30px;
  background-color: #fff;
}
</style>
