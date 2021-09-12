// miniprogram/pages/user/user.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_admin:0,
    is_member:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //1管理员，0老成员，2新成员
     var that = this
     console.log(options)
     wx.showLoading({
       title: '',
     })
     if (options.status == "1" || options.status == "0"){ //若为管理员、老成员，搜索信息
      wx.cloud.callFunction({
        name:"sign",
        data:{
          type:"olduser"
        }
      }).then(res=>{
        console.log(res)
        getApp().globalData.userinfo = res.result
        this.setData({
         is_member:true,
         userinfo:getApp().globalData.userinfo
        })
       
      })   
      if (options.status == "1"){
        this.setData({
          is_admin :1
        })
        
      }
     }else if (options.status == "2"){
      console.log("您是新成员")
      getApp().globalData.userinfo.title = "华为创新俱乐部"
     }
     //可能会有异步bug
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    this.setData({
      userinfo:getApp().globalData.userinfo
   })
   console.log(this.data.userinfo)
   wx.hideLoading({
    success: (res) => {},
  })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  look:function(){
    wx.navigateTo({
      url: '/pages/introduce_index/introduce_index',
    })
  },
  not_open:function(){
    wx.showToast({
      title: '敬请期待~',
      icon:'none'
    })
  },
  interview:function(){
    wx.navigateTo({
      url: '/pages/interview/interview',
    })
  },
  edit_userinfo:function(){
    wx.navigateTo({
      url: '/pages/edit_userinfo/edit_userinfo',
    })
  },
  edit_title:function(){
    var that = this
    wx.showModal({
      editable:true,
      showCancel:true,
      placeholderText:"请修改你的头衔~",
      success(res){
        console.log(res)
        if (res.confirm){
          var change_title = res.content
          console.log(change_title)
          getApp().globalData.userinfo.title = change_title
            that.setData({
              userinfo: getApp().globalData.userinfo
            })
          wx.cloud.callFunction({
            name:'saveTitle',
            data:{
              title:change_title
            }
          }).then(res=>{
            wx.showToast({
              title: '修改成功',
            })
            
          })
        }
       
      }
    })
  }
})