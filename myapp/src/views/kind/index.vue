<template>
  <div class="container">
    <header class="header">团购</header>
    <div class="content">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <Kindlist :kindlist = "kindlist"/>
      </van-list>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { List } from 'vant'
import Kindlist from '@/components/common/Kindlist'
import Backtop from '@/components/Backtop'
Vue.use(List)
Vue.use(Backtop)

export default {
  components: {
    Kindlist,
    Backtop
  },
  data() {
    return {
      kindlist: [],
      loading: false,
      finished: false,
      // username: '',
      // password: '',
      pageNum:2
    }
  },
  mounted () {
    fetch('http://10.11.56.133:3000/products/?count=10&pageNum=1').then(res => res.json()).then(data => {
      console.log(data)
      this.kindlist = data
    })
    const content = document.querySelector('.content')
    content.addEventListener('scroll', this.onScroll)
  },
  methods: {
      onLoad () {
        fetch('http://10.11.56.133:3000/products/paging/?count=10&pageNum='+this.pageNum).then(res => res.json()).then(data => {
            this.loading = false // 数据加载完毕
            this.pageNum++
            if (data.length === 0) {
              console.log('没有数据了')
              this.finished = true // 没有数据了
            } else {
              // 有数据就要涉及到数字的合并   concat
              this.kindlist = [...this.kindlist, ...data]
            }
        })
        // 异步更新数据
          // setTimeout(() => {
          //   for (let i = 0; i < 10; i++) {
          //     this.list.push(this.list.length + 1);
          //   }
          //   // 加载状态结束
          //   this.loading = false;

          //   // 数据全部加载完成
          //   if (this.list.length >= 40) {
          //     this.finished = true;
          //   }
          // }, 500);
        },
      onScroll(){
         if (event.target.scrollTop > 150) {
            this.flag = true
          } else {
            this.flag = false
          }
      }
    }
  }
</script>

<style lang="scss">

</style>
