<template>
  <div class="container">
    <header class="header">团购</header>
    <div class="content"
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item"
          :title="item"
        />
      </van-list>
    </div>

  </div>
</template>

<script>
import Myinput from '@/components/Myinput'
export default {
  components: {
    Myinput
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      username: '',
      password: ''
    }
  }
    ,
  method: {
    onLoad() {
      fetch('http://localhost:3000/products').then(res => res.json()).then(data => {

      })
      // 异步更新数据
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 500);
      }
    }
  }
</script>

<style lang="scss">

</style>
