import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // 需要管理的组件的状态
    loginState: '',
    productType:1
  },
  mutations: { // 唯一改变状态的地方
    changeLoginState (state, data) { // state代表的是初始化的数据，data代表改变的数据
      state.loginState = data
    },
    changeTypes (state, data) { // state代表的是初始化的数据，data代表改变的数据
      state.productType = data
    }
  },
  actions: { // 异步操作
    changeType(context,type){
      if(type===1){
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
  }
})
