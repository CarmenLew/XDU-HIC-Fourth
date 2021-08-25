// miniprogram/pages/Shopping_Cart/Shopping_Cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group_t:[2,3,4,5,6],
    selected_g_t:[],
    selected_g_p:[],
    final_selected:[]
  },
  deal_data:function(){
    var group = getApp().globalData.group;
    var department = getApp().globalData.department;
    this.setData({
      group :group,
      department:department
    }) //直接赋值不会显示
    var selected= this.data.department_selected_id
    console.log(selected)
   for (var i in selected){ 
     let bool = false
     for (var j in this.data.group_t )
     { 
     if (selected[i] == this.data.group_t[j]) {
      this.data.selected_g_t.push(selected[i]) 
      bool = true ;
      break;
      }  
     }
     if (bool == false)
      {this.data.selected_g_p.push(selected[i]) }
   }
   console.log(this.data.selected_g_t)
    console.log(this.data.selected_g_p)
   this.setData({
    selected_g_t:this.data.selected_g_t,
    selected_g_p:this.data.selected_g_p
   })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log("accept data")
      console.log(data)
      that.setData({
        department_selected_id:data.data
      })
      that.deal_data()
    })/* 回调函数需要时间执行，会导致data还没出来就执行下面的代码，导致数据错乱*/
    
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

  checkboxChange:function(e){
    console.log(e)
    var f_selected = e.detail.value
    this.setData({
      final_selected:f_selected
    })
  }
})