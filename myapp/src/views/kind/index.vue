<template>
  <div class="container">
    <header class="header">分类头部</header>
    <div class="content">
     <!--  {{ count }}
      <button @click="add">加1</button>
      <Myinput
        label = "手机号"
        v-model="username"
        required
        clearable
        placeholder = "请输入您的手机号"
      />
      <Myinput
        label = "密码"
        v-model="password"
        placeholder = "请输入您的密码"
        clearable
        err="密码格式错误"
      /> -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <!-- <img src="https://s11.mogucdn.com/mlcdn/c45406/181123_498kc2f9gdc9if7ke2fe35egahhjl_640x960.jpg" alt=""> -->
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
