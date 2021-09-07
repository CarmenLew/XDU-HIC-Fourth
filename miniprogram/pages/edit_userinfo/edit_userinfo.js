// miniprogram/pages/edit_userinfo/edit_userinfo.js
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
      userinfo :getApp().globalData.userinfo
    })
    console.log(this.data.userinfo)
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
    var that = this
    console.log(e)
    let type = "newuserinfo.type"
   
      var newuserinfo = e.detail.value
      if (newuserinfo.school_id == ""){
        wx.showToast({
          title: '学号不能为空',
          icon:"none"
        })
      }else{

      
      newuserinfo.type = "updatecollection"
    wx.cloud.callFunction({
      name:"sign",
      data:newuserinfo
    }).then(res=>{
      console.log(res)   // 调用成功
      //更新app.js中的信息 start
      wx.cloud.callFunction({
        name:"sign",
        data:{
          type:"olduser"
        }
      }).then(res=>{
        console.log(res)
        getApp().globalData.userinfo = res.result
        wx.navigateTo({
          url: '/pages/user/user',
        })
      })   
      //更新app.js中的信息 end 
    })
     
    
  }
  }
})