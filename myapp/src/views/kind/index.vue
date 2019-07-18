<template>
  <div class="container">
    <header class="header">
      <div data-type="1" class="active title">推荐</div>
      <div data-type="2" class="title">美妆</div>
      <div data-type="3" class="title">母婴健康</div>
      <div data-type="4" class="title">家居</div>
    </header>
    <div class="content">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <Kindlist :kindlist = "kindlist"/>
      </van-list>
      <Backtop :show="flag"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { List } from 'vant'
import Kindlist from '@/components/common/Kindlist'
import Backtop from '@/components/Backtop'
import { mapActions } from 'vuex'
Vue.use(List)
Vue.use(Backtop)

export default {
  components: {
    Kindlist,
    Backtop
  },
  data() {
    return {
      flag:false,
      kindlist: [],
      loading: false,
      finished: false,
      pageNum:2
    }
  },
  computed: {
    
  },
  mounted () {
    fetch('http://10.11.56.133:3000/products/?count=10&pageNum=1').then(res => res.json()).then(data => {
      console.log(data)
      this.kindlist = data
    })
    const content = document.querySelector('.content')
    content.addEventListener('scroll', this.onScroll)
    console.log(123);
    // js事件委托
    const header = document.querySelector('.header')
    header.onclick = function (ev) {
      // console.log(header.children[0])
      for(var i = 0; i < header.children.length; i++){
        console.log(header.children[i])
        header.children[i].classList.remove("active")
      }
      ev = ev || window.event;
      var target = ev.target || ev.srcElement
      // alert(target.innerHTML);
      if (target.nodeName.toLowerCase() === "div"){
        target.classList.add("active")
        //状态type切换
        var type=target.getAttribute("data-type");
        console.log(this.$store)
        // this.$store.commit("changeTypes",{
        //   productType:type
        // })
        // this.changeType(type)
      }

    }
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
      },
      changeType(type){
        if (type===1){
          fetch('http://10.11.56.133:3000/products/?count=10&pageNum=1').then(res => res.json()).then(data => {
            console.log(data)
            this.kindlist = data
          })
        } else {
          alert('sss');
          fetch('http://10.11.56.133:3000/products/?count=10&pageNum=1&type='+type).then(res => res.json()).then(data => {
            console.log(data)
            this.kindlist = data
          })
        }
      }
      // ...mapActions({
      //   changeType:'changeType'
      // })
    }
  }
</script>

<style lang="scss">
@import '@/lib/reset.scss';
  .header{
    @include flexbox();
    /*display: flex;*/
    text-align: center;
    color:#666;
    background:#fff;
    justify-content:space-around;
    border-bottom: #eee 1px solid;
  }
  .header>div{
    line-height: .44rem;
  }
  .active{
    color:#fe4070;
    border-bottom: 1px #fe4070 solid;
  }

</style>
