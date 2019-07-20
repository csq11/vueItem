import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // 需要管理的组件的状态
    loginState: '',
    tel:'',
    cartList: []
  },
  getters: {
    totalNum (state) {
      let totalNum = 0
      state.cartList.map(item => {
        item.flag ? totalNum += item.num : totalNum += 0
      })
      return totalNum
    },
    totalPrice (state) {
      let totalPrice = 0
      state.cartList.map(item => {
        item.flag ? totalPrice += item.price * item.num : totalPrice += 0
      })
      return totalPrice
    }
  },
  mutations: { // 唯一改变状态的地方
    changeLoginState (state, data) { // state代表的是初始化的数据，data代表改变的数据
      state.loginState = data
    },
    changeUser (state, data) { // state代表的是初始化的数据，data代表改变的数据
      state.tel = data
    },
    changeCartList (state,data) {
      state.cartList = data.result
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
