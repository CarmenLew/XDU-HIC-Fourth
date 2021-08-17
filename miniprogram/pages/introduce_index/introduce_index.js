// miniprogram/pages/introduce_index/introduce_index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group_touch_id:0,
    select_department_id:[],
    group:[{
      id:0,
      name:"全部",
      choose:true,
      contain:[0,1,2,3,4,5,6,7,8,9]
    },
    {
      id:1,
      name:"摄影",
      choose:false,
      contain:[7]
    },
    {
      id:2,
      name:"公共",
      choose:false,
      contain:[1,9]
    },
    {
      id:3,
      name:"编程",
      choose:false,
      contain:[2,3,4,5,6]
    },
    {
      id:4,
      name:"文案",
      choose:false,
      contain:[0,1]
    }
    ],
    department:[
      {
        id:0,
        name:"#宣传组",
        img_src:"/images/placeholder.png",
        text:"俱乐部的公众号、QQ、微博都是你的哦~",
        isclick:false
      },
      {
        id:1,
        name:"#策划组",
        img_src:"/images/placeholder.png",
        text:"我们一起来搞事情吧~",
        isclick:false
      },
      {
        id:2,
        name:"#人工智能组",
        img_src:"/images/placeholder.png",
        text:"来这里，肯努力，明天你就是技术大牛",
        isclick:false
      },
      {
        id:3,
        name:"#前后端组",
        img_src:"/images/placeholder.png",
        text:"想要自己动手写网站、APP、小程序吗？这个小程序就是我们开发的哦~",
        isclick:false
      },{
        id:4,
        name:"#硬件组",
        img_src:"/images/placeholder.png",
        text:"一行行代码，一条条电路，让电器“活过来”",
        isclick:false
      },
      {
        id:5,
        name:"#ACM组",
        img_src:"/images/placeholder.png",
        text:"ACM巨巨带你打ICPC",
        isclick:false
      },
      {
        id:6,
        name:"#数模组",
        img_src:"/images/placeholder.png",
        text:"数模大神亲自指导把关，快来鸭~",
        isclick:false
      },
      {
        id:7,
        name:"#新媒体组",
        img_src:"/images/placeholder.png",
        text:"用镜头语言来讲述我们的故事",
        isclick:false
      },
      {
        id:8,
        name:"#设计组",
        img_src:"/images/placeholder.png",
        text:"新人小组，期待你的加入!",
        isclick:false
      },
      {
        id:9,
        name:"#外联组",
        img_src:"/images/placeholder.png",
        text:"来江湖结交各路好汉",
        isclick:false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.group)
    getApp().globalData.group = this.data.group;
    getApp().globalData.department = this.data.department;
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
  /*用户点击推荐栏中的某个类别*/
  tap_group:function(e){
    console.log(e)
    var id = e.target.dataset.id
    this.setData({
      group_touch_id:id
    })
  },
  open_shopping_cart:function(e){
    console.log("click shopping cart")
    var that = this
    var id = this.data.select_department_id
    wx.navigateTo({
      url: '/pages/Shopping_Cart/Shopping_Cart',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data:id})
      }
    })
  },
  like:function(e){
    console.log(e)
    var id=this.data.group[this.data.group_touch_id].contain[e.target.dataset.id]
    console.log(id)
    var isclick ="department["+id+"].isclick"
    console.log(isclick)
    if (this.data.department[id].isclick ){
      console.log("cancel like")
      this.setData({
        [isclick]: false,
     })
    var new_select_id=[]
    for (var i in this.data.select_department_id)
    {
      if (id!=this.data.select_department_id[i])
      new_select_id.push(this.data.select_department_id[i])
    }
    this.data.select_department_id = new_select_id
    console.log(this.data.select_department_id)
    }
    else {
      console.log("change")
      this.setData({
        [isclick]: true,
      })
      this.data.select_department_id.push(id)
      console.log(this.data.select_department_id)
    }
  }
})