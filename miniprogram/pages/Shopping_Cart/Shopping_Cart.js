// miniprogram/pages/Shopping_Cart/Shopping_Cart.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group_t:[2,3,4,5,6],
    selected_g_t:[],
    selected_g_p:[],
    final_selected:[],
    select_all_color:"gray",
    final_selected_group_name:[]
  
  },
  deal_data:function(){
    var group = app.globalData.group;
    var department = app.globalData.department;
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
    wx.cloud.callFunction({
      name:"getTemplateID"
    }).then(res=>{
      console.log(res)
      that.data.templateID = res.result.data.template
      console.log(that.data.templateID)
    })  
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.cloud.callFunction({
      name:"message"
    }).then(res=>{
      console.log(res)
      that.setData({
        message_title:res.result.title,
        message_content:res.result.content
      })
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

  checkboxChange:function(e){
    console.log(e)
    var f_selected = e.detail.value
    this.setData({
      final_selected:f_selected
    })
  },
  select_all:function(e){
    if (this.data.select_all_color == "gray"){
      this.setData({
        select_all_color:"green",
        final_selected:this.data.department_selected_id
      })
    }else{
      this.setData({
        select_all_color:"gray",
        final_selected:[]
      })
    }
    
  },
  submit:function(){
    /*for (var i in this.data.final_selected)
    console.log("提交"+this.data.department[this.data.final_selected[i]].name)*/
    var that = this
   

    if (this.data.final_selected.length >0)
    {
    wx.showModal({
      content:"请再次确认您的意向",
      cancelColor: 'cancelColor',
      success(res){
        if (res.confirm){
          console.log("已确认")
          for (let i in that.data.final_selected){
            console.log(that.data.department[that.data.final_selected[i]].table)
              that.data.final_selected_group_name.push(that.data.department[that.data.final_selected[i]].table)
          }
            wx.showModal({
              title:that.data.message_title,
              content:that.data.message_content
            })
          
          
          wx.cloud.callFunction({
            name:'intention',
            data:{
                yiyuan:that.data.final_selected_group_name
            },
            success:res =>{
              wx.hideLoading({
                success: (res) => {},
              })
              wx.showToast({
                title: '已发送',
                icon:'success'
              })
            },
            fail:res =>{
              wx.showToast({
                title: '发送失败',
                icon:'error'
              })
            }
          }) //提交意愿函数待上线，目前缺少前方页面传来的数据
          var templateID = that.data.templateID
          wx.requestSubscribeMessage({
            tmplIds: [templateID],
            success: (result) => {console.log("获取订阅消息的用户权限")},
            fail: (result) => {console.log(result)},
            complete: (res) => {},
          })
        }
      }
    })
    }else{
      wx.showToast({
        title: '不能为空哟~',
        image:"/images/white_cart.png"
      })
    }
  }
})
