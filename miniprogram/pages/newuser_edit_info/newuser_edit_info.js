// miniprogram/pages/newuser_edit_info/newuser_edit_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      avatarUrl:getApp().globalData.userinfo.avatarUrl,
     // Name:getApp().globalData.userinfo.name,
     OPENID:getApp().globalData.OPENID,
      title:"华为创新俱乐部"
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  bindFormSubmit(e){
    console.log(e)
    var userinfo = e.detail.value
    if (userinfo.school_id == ""){
      wx.showToast({
        title: '学号不能为空',
        icon:"none"
      })
    } else{
    getApp().globalData.userinfo = userinfo
    getApp().globalData.userinfo.avatarUrl = this.data.avatarUrl
    //getApp().globalData.userinfo.Name = this.data.Name
    getApp().globalData.userinfo.OPENID = this.data.OPENID
    console.log(getApp().globalData.userinfo)
   //新增用户，写完
    var type = "Userinfo.type"
    this.setData({
      Userinfo : getApp().globalData.userinfo,
      [type]:"newuser"
    })
    console.log(this.data.Userinfo)
    wx.cloud.callFunction({
      name:"sign",
      data:getApp().globalData.userinfo
    }).then(res=>{
      wx.navigateTo({
        url: '/pages/user/user?status=2'
      })
    })
  }
  }
})