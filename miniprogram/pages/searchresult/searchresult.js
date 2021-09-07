// pages/searchresult/searchresult.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuinfo:[{
      name: getApp().globalData.search_word,
      userhead: ""
    }, 
  ],},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var i = 0
    var that = this
    // var stuinfo.name = app.globalData.search_word
    // for (i = 0; i < app.globalData.stuinfo.length; i++) {
    //   if (app.globalData.search_word == app.globalData.stuinfo[i].name) {
    //     that.setData({
    //       that.stuinfo.name = app.globalData.stuinfo[i].name,
    //       stuinfo.userhead = app.globalData.stuinfo[i].userhead
    //     })
    //   }
    // }

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

  }
})