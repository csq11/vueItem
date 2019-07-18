<template>
  <div class="box">
    <div class="container">
      <van-nav-bar
        class="topbar"
        :title="shopname"
        right-text="home"
        left-arrow
        @click-left="back"
        @click-right="back"
      />
      <div class="content">
        <img class="main_pic" :src="img"/>
        <div class="wrap">
          <span class="norprice">￥{{ norprice }}</span>
          <span class="preprice">￥{{ preprice }}</span>
          <span class="pernum">{{ person }}人已购买</span>
          <p class="countDown">
            <span style="color:#999">还剩</span><van-count-down class="time" :time="time" />
          </p>
          <p class="goodsname">{{ goodsname }}</p>
          <div class="collapse">
            <van-collapse v-model="activeNames">
            <van-collapse-item name="1">
              <div slot="title"><span class="c-title">运费</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                至<van-icon class="icolor" name="location-o" />北京市-市辖区-东城区
              </div>
              <van-popup v-model="aaa">
                <van-area :area-list="areaList" />
              </van-popup>
            </van-collapse-item>
            <van-collapse-item title="运费" name="2">
              <div slot="title"><span class="c-title">运费</span>
                <span class="c-content">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件数满一件，全国包邮</span>
              </div>
              内容
            </van-collapse-item>
            <van-collapse-item title="说明" name="3" disabled>
              <div slot="title"><span class="c-title">说明</span>
                <span class="c-content">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <van-icon class="icolor" name="passed" />七天拆封无条件退货&nbsp;&nbsp;&nbsp;&nbsp;
                  <van-icon class="icolor" name="passed" />支持分期
                </span>
              </div>
              内容
            </van-collapse-item>
          </van-collapse>
          </div>
        </div>
        <!-- ------container end------ -->
        <div class="purchase">
          <span class="p-title">请选择</span>
          <span class="p-content">分类&nbsp;&nbsp;型号</span>
          <van-icon class="p-arrow" name="arrow" />
        </div>
        <!-- ----- Tabs  ------- -->
        <van-tabs v-model="active" color="#FE4070">
          <van-tab title="图文详情">
            <img class="goods1" :src="goods1"/>
            <img class="goods2" :src="goods2"/>
            <img class="main_pic" :src="img"/>
          </van-tab>
          <van-tab title="产品参数">
            <p class="can-line">
              <span class="can-title">商品名称</span>
              <span class="can-content"></span>
            </p>
            <p class="can-line">
              <span class="can-title">功效</span>
              <span class="can-content">
                保湿，滋润，排毒养颜
              </span>
            </p>
            <p class="can-line">
              <span class="can-title">特别说明</span>
              <span class="can-content">
                因整体来货，批号和日期在集装箱上，包装无批号和日期，建议自购买之日18个月之内用完，介意的MM慎购！
              </span>
            </p>
            <p class="can-line">
              <span class="can-title">产品包装</span>
              <span class="can-content">多款商品随机发，请放心购买！</span>
            </p>
            <p class="can-line">
              <span class="can-title">产品规格</span>
              <span class="can-content">1.5g</span>
            </p>
            <p class="can-line">
              <span class="can-title">原产地</span>
              <span class="can-content">法国(具体生产日期以产品为准)</span>
            </p>
            <p class="can-line">
              <span class="can-title">注意事项</span>
              <span class="can-content">
                因个人肤质不同，如有使用后不适者请立即停止使用
              </span>
            </p>
            <p class="can-line" style="width:100%;height:0.5rem;"></p>
          </van-tab>
          <!-- -----------     comments   ---------------------- -->
          <div class="wrap c-wrap">
            <van-tab title="评价">
              <ul>
                <li v-for="(item, index) of commList" :key="index">
                  <img class="pic" :src="item.pic" alt="">
                  <span class="name">{{ item.name }}</span>
                  <p class="date">{{ item.date }}</p>
                  <p class="comments">
                    {{ item.words }}
                  </p>
                  <div class="c-img">
                    <img class="c-pro-img" :src="item.img1" alt="">
                    <img class="c-pro-img" :src="item.img2" alt="">
                  </div>
                </li>
              </ul>
            </van-tab>
          </div>
          <!-- --------------------------------------------------- -->
        </van-tabs>
        <!-- <img class="main_pic" :src="img1" />
        <img class="main_pic" :src="img2" />
        <img class="main_pic" :src="img3" /> -->
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon
        icon="chat-o"
        text="客服"
        @click="chat"
      />
      <van-goods-action-icon
        info="5"
        icon="cart-o"
        text="购物车"
        @click="goCart"
      />
      <van-goods-action-icon
        icon="shop-o"
        text="店铺"
        @click="goShop"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addCart"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="buy"
      />
    </van-goods-action>
    <van-sku
      v-model="show"
      stepper-title="我要买"
      :sku="sku"
      :goods="goods"
      show-add-cart-btn
      reset-stepper-on-hide
      :initial-sku="initialSku"
    >
    </van-sku>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tab, Tabs, Button, Popup, Area, Icon, GoodsAction, GoodsActionIcon, GoodsActionButton, Sku, Collapse, CollapseItem, NavBar, CountDown } from 'vant'

Vue.use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton)
Vue.use(Sku)
Vue.use(NavBar)
Vue.use(CountDown)
Vue.use(Collapse).use(CollapseItem)
Vue.use(Icon)
Vue.use(Area)
Vue.use(Popup)
Vue.use(Button)
Vue.use(Tab).use(Tabs)
export default {
  data () {
    return {
      commList: [],
      // name: '',
      // words: '',
      // pic: '',
      // img1: '',
      // img2: '',
      // date: '',
      areaList: '',
      active: '',
      aaa: false,
      activeNames: [''],
      shopname: '',
      img: '',
      person: '',
      // img1: '',
      // img2: '',
      // img3: '',
      norprice: '',
      goodsname: '',
      time: 12 * 60 * 60 * 1000,
      goods1: '',
      goods2: '',
      show: false,
      goods: {
        // 商品标题
        title: '测试商品',
        // 默认商品 sku 缩略图
        picture: 'https://img.yzcdn.cn/1.jpg'
      },
      initialSku: {
        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
        // 值：skuValueId（规格值 id）
        s1: '30349',
        s2: '1193',
        // 初始选中数量
        selectedNum: 3
      },
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: '颜色', // skuKeyName：规格类目名称
            v: [
              {
                id: '30349', // skuValueId：规格值 id
                name: '红色', // skuValueName：规格值名称
                imgUrl: 'https://img.yzcdn.cn/1.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
              },
              {
                id: '1215',
                name: '蓝色',
                imgUrl: 'https://img.yzcdn.cn/2.jpg'
              }
            ],
            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
            s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: '1.00', // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: '留言', // 留言名称
            type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: '1' // 是否必填 '1' 表示必填
          }
        ],
        hide_stock: false // 是否隐藏剩余库存
      }
    }
  },
  computed: {
    preprice () {
      const that = this
      const preprice = parseInt(that.norprice * 1.7)
      return preprice
    }
  },
  mounted () {
    // console.log(this.$route) // 打印当前路由的信息
    // const id = this.$route.params.id
    // const { id } = this.$route.params
    // const { params: { id } } = this.$route // 解构中的解构
    const { $route: { params: { id } } } = this
    fetch('http://10.11.56.160:3000/products/detail?id=' + id).then(res => res.json()).then(data => {
      this.shopname = data[0].shopname
      this.img = data[0].image_url.split(',')[0]
      this.norprice = data[0].normal_price
      this.goodsname = data[0].goos_name
      this.person = data[0].collection
      // this.img1 = data[0].image_url.split(',')[1]
      // this.img2 = data[0].image_url.split(',')[2]
      // this.img3 = data[0].image_url.split(',')[3]
      this.goods1 = data[0].goods_more1
      this.goods2 = data[0].goods_more2
    })
    const randCount = Math.floor(Math.random() * 9 + 6)
    const randStart = Math.floor(Math.random() * 4 + 1)
    fetch('http://10.11.56.160:3000/consumers/comments?randCount=' + randCount + '&randStart=' + randStart).then(res => res.json()).then(data => {
      this.commList = [...this.commList, ...data]
      console.log(this.commList)
    })
    // fetch('http://10.11.56.160:3000/consumers/comments?randCount=2&randStart=3').then(res => res.json()).then(data => {
    //   console.log(data)
    // })
  },
  methods: {
    showPopup () {
      this.aaa = true
    },
    chat () {
      console.log('客服')
    },
    goCart () {
      console.log('去购物车')
    },
    goShop () {
      console.log('店铺')
    },
    addCart () {
      console.log('加入购物车')
      this.show = true
    },
    buy () {
      console.log('立即购买')
    },
    back () {
      this.$router.back()
    },
    share () {
      console.log('分享')
    }
  }
}
</script>

<style lang="scss">
.topbar {
  background:#e9e8e8;
  color:#222;
}
.van-nav-bar .van-icon {
    color: rgb(160, 155, 155);
}
.van-nav-bar__title {
  color: #222;
}
.van-nav-bar__text {
  color: rgb(160, 155, 155);
}
.wrap {
  width:90%;
  height:auto;
  // background:pink;
  margin:0 auto;
  position:relative;
}
.main_pic, .goods1, .goods2 {
  width:100%;
  height:70%;
}
.norprice {
  font-size:0.3rem;
  color:#FE4070;
  margin:0.2rem;
  margin-left:0;
}
.preprice {
  font-size:0.14rem;
  color:#999;
  margin:0.2rem 0;
}
.pernum {
  position:absolute;
  right:0;
  top:0.14rem;
}
.countDown .time {
  display:inline-block;
  margin-left:0.03rem;
  color:#999;
}
.goodsname {
  margin:0.16rem 0;
}
.collapse {
  position: relative;;
  left:-0.13rem;
  .icolor {
    color:#FE4070;
    vertical-align: baseline;
  }
  .c-title {
    color:#999;
  }
  .c-content {
    font-size:0.1rem;
  }
}
.purchase {
  width:100%;
  height:0.5rem;
  border-width:0.06rem 0 0.06rem 0;
  border-color:rgb(246, 241, 241);
  border-style:solid;
  line-height:0.40rem;
  position:relative;
  .p-title {
    color:#999;
    margin-left:0.23rem;
  }
  .p-content {
    margin-left:0.22rem;
    font-size:0.1rem;
  }
  .p-arrow {
    font-size:0.16rem;
    position:absolute;
    right:0.47rem;
    top:0.12rem;
    color:#999;
  }
}
.goods1, .goods2 {
  width:100%;
  height:90%;
}
.pic {
  width:0.3rem;
  height:0.3rem;
  border-radius:50%;
  margin-top:0.2rem;
  margin-right:0.2rem;
  vertical-align: bottom;
}
.name {
  margin-top:0.2rem;
  vertical-align: bottom;
}
.date {
  margin: 0.12rem 0;
  color:#999;
}
.c-img {
  width:100%;
  border-bottom:1px solid rgb(230, 228, 228);
  .c-pro-img {
    width:40%;
    height:40%;
    display:inline-block;
    margin:0.08rem;
    margin-left:0;
  }
}
.can-line {
width:100%;
height:auto;
line-height:0.4rem;
border-bottom:1px solid rgb(230, 228, 228);
display:flex;
  .can-title {
    display:inline-block;
    width:1.5rem;
    color:#999;
    font-size:0.14rem;
    margin-left:0.5rem;
  }
  .can-content {
    width:80%;
    display:inline-block;
    font-size:0.14rem;
    margin-right:0.6rem;
    margin-left:0.3rem;
    text-align:left;
  }
}
</style>
