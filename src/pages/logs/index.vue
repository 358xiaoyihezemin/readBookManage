<template>
  <div class="container">
    <div class="userinfo">
      <img :src="userinfo.avatarUrl" alt="">
      <p v-if='userinfo.openId'>{{userinfo.nickName}}</p>
      <button v-else open-type="getUserInfo" lang="zh_CN" @click="login" >
        {{userinfo.nickName}}
      </button>
    </div>
    <button v-if='userinfo.openId' @click='scanBook' class='btn'>添加图书</button>
  </div>
</template>

<script>
  import qcloud from 'wafer2-client-sdk'
  import {showSuccess, post, showModal} from '@/util'
  import config from '@/config'
  export default {
    components: {
    },
    data () {
      return {
        userinfo: {
          avatarUrl: '../../../static/img/unlogin.png',
          nickName: '点击登录'
        }
      }
    },
    methods: {
      async addBook (isbn) {
        console.log(isbn)
        const res = await post('/weapp/addbook', {
          isbn,
          openid: this.userinfo.openId
        })
        showModal('添加成功', `${res.title}添加成功`)
      },
      scanBook () {
        wx.scanCode({
          success: (res) => {
            if (res.result) {
              this.addBook(res.result)
              // showModal('添加成功', `${res.result}添加成功`)
            }
          }
        })
      },
      login () {
        let user = wx.getStorageSync('userinfo')
        const self = this
        if (!user) {
          qcloud.setLoginUrl(config.loginUrl)
          qcloud.login({
            success: function (userinfo) {
              qcloud.request({
                url: config.userUrl,
                login: true,
                success (userRes) {
                  showSuccess('登录成功')
                  wx.setStorageSync('userinfo', userRes.data.data)
                  self.userinfo = userRes.data.data
                }
              })
            }

          })
        }
      }
    },
    onShow () {
      // console.log(123)
      let userinfo = wx.getStorageSync('userinfo')
      // console.log([userinfo])
      if (userinfo) {
        this.userinfo = userinfo
      }
      // console.log(this.userinfo)
    }
  }
</script>

<style lang='scss'>
  .container{
    padding:0 30rpx;

  }
  .userinfo{
    margin-top:100rpx;
    text-align:center;
    img{
      width: 150rpx;
      height:150rpx;
      margin: 20rpx;
      border-radius: 50%;
    }
  }


</style>
