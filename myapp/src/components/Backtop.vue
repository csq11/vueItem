<template>
  <div class="backTop" v-show = "show" @click="backtop">
    <van-icon name="upgrade" size="30px"/>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'
Vue.use(Icon)
/***
 * 哪一个页面需要使用返回顶部
 * 组件的滚动区域的标签上添加属性  id="content"
 * v-show代表的是返回顶部按钮  显示还是隐藏
 * 在组件内部 mounted 的钩子函数内部，监听滚动条的变化
 * data () {
 *  return {
 *    flag: false
 *  }
 * }
 * mounted () {
 *  const content = document.querySelector('#content')
    // 开启监听滚动条的滚动事件
    content.addEventListener('scroll', this.scrollFn)
 * }
  实现滚动的函数
  methods: {
    scrollFn () {
      if (event.target.scrollTop > 150) {
        this.flag = true
      } else {
        this.flag = false
      }
    }
  }
 * <div class="content" id="content">
 *  <Backtop v-show="flag"/>
 * </div>
 */
export default {
  props: ['show'],
  methods: {
    backtop () {
      const content = document.querySelector('.content')
      content.scrollTop = 0 // 可以自行扩展回到顶部的效果
    }
  }
}
</script>
<style lang="scss">
  .backTop {
    border-radius: 50%;
    position: fixed;
    bottom: 0.6rem;
    right: 15px;
    width: 40px;
    height: 40px;
    background: #fff;
    z-index: 99;
    overflow: hidden;
    color: #666;
    font-size:40px!important;
  }
</style>