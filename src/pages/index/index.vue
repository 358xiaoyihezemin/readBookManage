<template>
  <div>
    <TopSwiper :tops='tops'></TopSwiper>
    <ceshi :key='item.id' v-for='item in books' :book='item'></ceshi>
    <p class='text-footer' v-if='!more'>
      没有更多数据
    </p>
  </div>
</template>
<script>
  // 35条数据
  // 每次加载10条
  // 0页   0-10
  // 1     10-20
  // 2     20-30（5）
  // page 当前第几页

  // 没有更多数据
  // 1. page=0 不能显示这条提醒
  // 2. page>0 数据长度<10 停止触底加载

  import {get} from '@/util'
  import ceshi from '@/components/ceshi'
  import TopSwiper from '@/components/TopSwiper'
  export default {
    components: {
      ceshi,
      TopSwiper
    },
    data () {
      return {
        books: [],
        page: 0,
        more: true,
        tops: []
      }
    },
    methods: {
      async getList (init) {
        if (init) {
          this.page = 0
          this.more = true
        }
        wx.showNavigationBarLoading()
        const books = await get('/weapp/booklist', {page: this.page})
        if (books.list.length < 10 && this.page > 0) {
          this.more = false
          console.log(this.more)
        }
        if (init) {
          this.books = books.list
          wx.stopPullDownRefresh()
        } else {
          // 下拉刷新，不能直接覆盖books 而是累加
          this.books = this.books.concat(books.list)
        }
        wx.hideNavigationBarLoading()
      },
      async getTop () {
        const tops = await get('/weapp/getTop')
        this.tops = tops.list
      }
    },
    onPullDownRefresh () {
      this.getList(true)
      this.getTop()
    },
    onReachBottom () {
      if (!this.more) {
        // 没有更多了
        return false
      }
      this.page = this.page + 1
      this.getList()
    },
    mounted () {
      this.getList()
      this.getTop()
    }
  }
</script>
<style lang='scss'>


</style>
