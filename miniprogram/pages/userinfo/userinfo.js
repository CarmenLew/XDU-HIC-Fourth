// pages/userinfo/userinfo.js
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
    var that = this;
    console.log(options)
    this.setData({
      school_id:options.school_id,
      comment:options.comment
    })
    wx.showLoading({
      title: '',
    })
      wx.cloud.callFunction({
        name:"getInformation",
        data:{
          school_id:options.school_id
        }
      }).then(res=>{
        console.log(res)
       
        this.setData({
          info:res.result.data[0],
          
        })
        if (that.data.info.gender==1){
          this.setData({
            gender:"男"
          })}else if (that.data.info.gender==0){
            this.setData({
              gender:"女"
            })
          }else {this.setData({
            gender:"??"
          })}
        
        console.log(this.data.info)
        wx.hideLoading({
          success: (res) => {},
        })
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
  bindFormSubmit: function(e) {
    var that = this
    var comment = e.detail.value.textarea;
    console.log(comment)
    wx.cloud.callFunction({
      name:'saveComment',
      data:{
        "comment":comment,
        "school_id":that.data.school_id
      }
    }).then(res=>{
      wx.showToast({
        title: '已保存',
        icon: 'success',
        duration: 1500,
      })
      setTimeout(
        function(){
          wx.navigateBack({
            delta: 1
          })
        },1200
      )
    })
  }
  
})