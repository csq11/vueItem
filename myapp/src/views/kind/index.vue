<template>
  <div class="container">
    <header class="header">
      <div data-type="1" class="active title" @click="changeType(1)">推荐</div>
      <div data-type="2" class="title" @click="changeType(2)">美妆</div>
      <div data-type="3" class="title" @click="changeType(3)">母婴健康</div>
      <div data-type="4" class="title" @click="changeType(4)">家居</div>
    </header>
    <div class="content">
     <!--  <van-list

        :finished="finished"
        finished-text="没有更多了"

      > -->
      <Kindlist :kindlist = "kindlist"/>
      <div v-show="hide"></div>
  <!--     </van-list> -->
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
      hide:false,
      flag:false,
      kindlist: [],
      // loading: false,
      finished: false,
      pageNum:1,
      productType:1
    }
  },
  computed: {
    
  },
  updated () {
    const content = document.querySelector('.content')
    content.addEventListener('scroll', this.onScroll)
  },
  mounted () {
    //paging/?count=10&pageNum=1&
    fetch('http://localhost:3000/products/?productType=1').then(res => res.json()).then(data => {
      // console.log('data',data)
      this.kindlist = data
    })
    
    // console.log(123);
    //js事件委托
    const header = document.querySelector('.header')
    header.onclick = function(ev){
      // console.log(header.children[0])
      for(var i=0;i<header.children.length;i++){
        // console.log(header.children[i])
        header.children[i].classList.remove("active")
      }
      var ev = ev || window.event;
      var target = ev.target || ev.srcElement;
      //alert(target.innerHTML);
      if(target.nodeName.toLowerCase() == "div"){
        target.classList.add("active");
      }
    }
  },
  methods: {
      goDetail (id) {
        this.$router.push({ path: '/detail/' + id }) // object
      },
      onScroll(){
        var bH=document.querySelector('.kindlist').offsetHeight-500;
         // console.log('bh',bH);
         // console.log('top',event.target.scrollTop);
         if (event.target.scrollTop > 150) {
            this.flag = true
          }else {
            this.flag = false
          }
      },
      changeType(type){
        const content = document.querySelector('.content');
        content.scrollTop = 0; 
        // alert(123466);
        // alert(1);
        // if(type===1){
        //   fetch('http://10.11.56.133:3000/products/?count=10&pageNum=1&productType=1').then(res => res.json()).then(data => {
        //     console.log(data)
        //     this.kindlist = data
        //   })
        // } else {
          // alert('sss');
          this.finished = false;
          // this.loading = false
          // this.$options.methods.onLoad();
          // paging/?count=10&pageNum='+this.pageNum+'&
          fetch('http://localhost:3000/products/?productType='+type).then(res => res.json()).then(data => {
            // console.log("s",data)
            if(data!=""||data!=null){
              // for(var i=0;i<data.length;i++){
              //   alert(JSON.stringify(data[i].image_url));
              // }
              
              // alert("aaaaa");
              var elem = document.getElementsByClassName("kindlist");
              elem[0].innerHTML = "";
              var fragment = document.createDocumentFragment();
              if(type!=this.productType){
                this.kindlist =data;
              }else {
                this.kindlist = [...this.kindlist, ...data];
              }
              var str="";
              for(let i=0;i<this.kindlist.length;i++){
                str+='<li class="kinditem" :key="index">'+
                  '<div class="itemimg">'+
                    '<img src="'+data[i].image_url.split(',')[0]+'"/>'+
                  '</div>'+
                  '<p class="iteminfo">'+data[i].goos_name+'</p>'+
                  '<div class="appraise">'+data[i].collection+'条评论</div>'+
                  '<div class="info">'+
                    '<ul class="price_ul">'+
                      '<li>￥'+data[i].normal_price+'</li>'+
                      '<li>单买价'+data[i].normal_price+'</li>'+
                    '</ul>'+
                    '<div class="buyBtn" @click="goDetail('+data[i].id+')">去开团</div>'+
                  '</div>'+
                '</li>';
              }
              elem[0].innerHTML=str;
              if(type!==this.productType){
                this.pageNum=1;
                this.productType=type;
              }else {
                this.pageNum++;
              }
            }else {
              this.finished=true;
              this.hide=true;
            }
            
            // alert(this.productType);
          })
        }
      }
      // touchBottom(){
      //   changeType(this.productType)
      // }
      // ...mapActions({
      //   changeType:'changeType'
      // })
    }
  // }
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
  .kinditem{
    background:#fff;
  }
</style>
