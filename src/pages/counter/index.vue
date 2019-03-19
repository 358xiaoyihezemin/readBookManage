<template>
  <div >
    <BookInfo :info='info' ></BookInfo>
    <button open-type='share' class="btn">转发给好友</button>
    <button v-if='userinfo.openId' @click='delBook' class='btn'>删除图书</button>
  </div>

</template>

<script>
// Use Vuex
import {get, post, showModal} from '@/util'
import BookInfo from '@/components/BookInfo'
export default {
  components: {
    BookInfo
  },
  computed: {

  },
  data () {
    return {
      userinfo: {},
      bookid: '',
      info: {}
    }
  },
  methods: {
    async getDetail () {
      const info = await get('/weapp/bookdetail', {id: this.bookid})
      wx.setNavigationBarTitle({
        title: info.title
      })
      this.info = info
    },
    async delBook () {
      if(this.info.openid !== this.userinfo.openId){
        wx.showModal({
          title: '提示',
          content: '非本人添加的图书不能删除',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
      const res = await post('/weapp/delbook', {
        id:this.bookid
      })
      wx.showModal({
        title: '提示',
        content: '删除成功',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
    const userinfo = wx.getStorageSync('userinfo')
    console.log('userinfo', userinfo)
    if (userinfo) {
      this.userinfo = userinfo
    }
  }
}
</script>

<style>

</style>
