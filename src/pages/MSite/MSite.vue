<template>
  <section class="msite">

    <!--首页头部-->
    <HeaderTop :title="address.name || '正在定位中...'">
         <span class="header_search" slot="left">
           <i class="iconfont icon-sousuo"></i>
         </span>
         <span class="header_login" slot="right">
           <span class="header_login_text">登录|注册</span>
         </span>
    </HeaderTop>

    <!--首页导航-->
    <nav class="msite_nav">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
                  <a href="javascript:" class="link_to_food" v-for="(c, index) in categorys" :key="index">
                    <div class="food_container">
                      <img :src="'https://fuss10.elemecdn.com' + c.image_url">
                    </div>
                    <span>{{c.title}}</span>
                  </a>
                </div>
              </div>
              <!-- Add Pagination -->
              <div class="swiper-pagination"></div>
            </div>
    </nav>


    <!--首页附近商家-->
    <div class="msite_shop_list">
            <div class="shop_header">
              <i class="iconfont icon-xuanxiang"></i>
              <span class="shop_header_title">附近商家</span>
            </div>
            <ShopList/>
    </div>
  </section>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'

import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

import {mapState} from 'vuex'

export default {
  mounted () {
     // 异步获取食品分类数据(后台==>state)
     this.$store.dispatch('getCategorys')
     
     // 异步获取商家列表数据(后台==>state)
     this.$store.dispatch('getShops')
  },

  watch: {
    categorys (value) {
      // 界面更新就立即创建swiper对象
      this.$nextTick(() => {
        // 创建轮播的对象
        var mySwiper = new Swiper('.swiper-container', {
           loop: true, // 循环模式选项

           // 如果需要分页器
           pagination: {
             el: '.swiper-pagination'
           }
        })
      }
      )
    }
  },

  computed: {
    ...mapState(['address', 'categorys']),

    categorysArr () {
            const {categorys} = this
            console.log(categorys.length)
            // 二维数组
            const bigArr = []
            // 内部的小数组(最大长度是8)
            let smallArr = []

            // 遍历总数组
            categorys.forEach(c => {
              // 将小数组保存到大数组(每个小数组只需要添加一次)
              if (smallArr.length===0) {
                bigArr.push(smallArr)
              }

              // 将c保存到smallArr
              smallArr.push(c)

              // 一旦小数组满了, 再准备一个新的小数组
              if (smallArr.length===8) {
                smallArr = []
              }
            })

            console.log(bigArr.length)
            return bigArr
    }
  },

  components: {
    HeaderTop,
    ShopList
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .msite  //首页
    width 100%

    .msite_header
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .icon-sousuo
          font-size 25px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        .header_title_text
          font-size 20px
          color #fff
          display block
      .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
          color #fff

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774


</style>
