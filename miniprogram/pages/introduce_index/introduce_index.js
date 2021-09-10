// miniprogram/pages/introduce_index/introduce_index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_src:"/images/order.svg",
    message_src:"/images/message.svg",
    group_touch_id:0,
    select_department_id:[],
    show_message:false,
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
        table:"xuanchuan_member",
        text:"俱乐部的公众号、QQ、微博都是你的哦~",
        isclick:false,
        s_src:"https://i.loli.net/2021/08/24/SfsxVnJ2XlvYDM6.png",
        d_src:"cloud://cloud1-6grlmnp6a2096931.636c-cloud1-6grlmnp6a2096931-1305879893/images/宣传组@3x.png"
      },
      {
        id:1,
        name:"#策划组",
        table:"cehua_member",
        text:"我们一起来搞事情吧~",
        isclick:false,
        s_src:"https://i.loli.net/2021/08/24/4W796pL2MXjwV8A.png",
        d_src:"cloud://cloud1-6grlmnp6a2096931.636c-cloud1-6grlmnp6a2096931-1305879893/images/策划组@3x.png"
      },
      {
        id:2,
        name:"#人工智能组",
        table:"AI_member",
        text:"来这里，肯努力，明天你就是技术大牛",
        isclick:false,
        s_src:"https://i.loli.net/2021/08/24/V6nTq8vREzG9cAF.png",
        d_src:"cloud://cloud1-6grlmnp6a2096931.636c-cloud1-6grlmnp6a2096931-1305879893/images/ai组@3x.png"
      },
      {
        id:3,
        name:"#前后端组",
        table:"qianhouduan_member",
        text:"想要自己动手写网站、APP、小程序吗？这个小程序就是我们开发的哦~",
        isclick:false,
        s_src:"https://i.loli.net/2021/08/24/iwVxcgtJBCYRKPf.png",
        d_src:"cloud://cloud1-6grlmnp6a2096931.636c-cloud1-6grlmnp6a2096931-1305879893/images/前后端组@3x.png"
      },{
        id:4,
        name:"#硬件组",
        table:"yingjian_member",
        text:"一行行代码，一条条电路，让电器“活过来”",
        isclick:false,
        s_src:"https://i.loli.net/2021/08/24/K9jbof3DiUgeN7p.png",
        d_src:"cloud://cloud1-6grlmnp6a2096931.636c-cloud1-6grlmnp6a2096931-1305879893/images/硬件组@3x.png"
      },
      {
        id:5,
        name:"#ACM组",
        table:"ACM_member",
        text:"ACM巨巨带你打ICPC",
        isclick:false,
        s_src:"https://i.loli.net/2021/08/24/CiQugrNGzpHZJOF.png",
        d_src:"cloud://cloud1-6grlmnp6a2096931.636c-cloud1-6grlmnp6a2096931-1305879893/images/acm组@3x.png"
      },
      {
        id:6,
        name:"#数模组",
        table:"shumo_member",
        text:"数模大神亲自指导把关，快来鸭~",
        isclick:false,
        s_src:"https://i.loli.net/2021/08/24/KqJ3uAzGneyUd8s.png",
        d_src:"cloud://cloud1-6grlmnp6a2096931.636c-cloud1-6grlmnp6a2096931-1305879893/images/数模组@3x.png"
      },
      {
        id:7,
        name:"#新媒体组",
        table:"xinmeiti_member",
        text:"用镜头语言来讲述我们的故事",
        isclick:false,
        s_src:"https://i.loli.net/2021/08/24/UjNoMIT5dacH12q.png",
        d_src:"cloud://cloud1-6grlmnp6a2096931.636c-cloud1-6grlmnp6a2096931-1305879893/images/新媒体组@3x.png"
      },
      {
        id:8,
        name:"#设计组",
        table:"sheji_member",
        text:"新人小组，期待你的加入!",
        isclick:false,
        s_src:"https://i.loli.net/2021/08/24/njG8KqQ1Eyu9IvZ.png",
        d_src:"cloud://cloud1-6grlmnp6a2096931.636c-cloud1-6grlmnp6a2096931-1305879893/images/设计组@3x.png"
      },
      {
        id:9,
        name:"#外联组",
        table:"wailian_member",
        text:"来江湖结交各路好汉",
        isclick:false,
        s_src:"https://i.loli.net/2021/08/24/m8XgOzVRQnuJW2v.png",
        d_src:"cloud://cloud1-6grlmnp6a2096931.636c-cloud1-6grlmnp6a2096931-1305879893/images/外联组@3x.png"
      }
    ],
    g_introduction:[
      {
        id:0,
        name:"俱乐部总介绍",
        src:"cloud://cloud1-6grlmnp6a2096931.636c-cloud1-6grlmnp6a2096931-1305879893/images/HIC_introduction.png"
      },
      {
        id:1,
        name:"花粉部总介绍",
        src:"cloud://cloud1-6grlmnp6a2096931.636c-cloud1-6grlmnp6a2096931-1305879893/images/花粉部@3x.png"
      },
      {
        id:2,
        name:"技术部总介绍",
        src:"cloud://cloud1-6grlmnp6a2096931.636c-cloud1-6grlmnp6a2096931-1305879893/images/技术部@3x.png"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().globalData.group = this.data.group;
    getApp().globalData.department = this.data.department;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.cloud.callFunction({
      name:"searchresult"
    }).then(res=>{
      console.log(res)
      this.setData({
        application_result:res.result.data
      })
      console.log(this.data.application_result)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (res) {
    if (getApp().globalData.is_add){
      let length = getApp().globalData.select_department_id.length
      let add_id = getApp().globalData.select_department_id[length-1]
      console.log(add_id)
      let is_click ="department["+add_id+"].isclick"
      this.setData({
        select_department_id:getApp().globalData.select_department_id,
        [is_click]:true
      })
      this.red_point()
    }
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
    
    var id = e.target.dataset.id
    this.setData({
      group_touch_id:id
    })
  },
  open_shopping_cart:function(e){
    
    var that = this
    var id = this.data.select_department_id
    wx.navigateTo({
      url: '/pages/Shopping_Cart/Shopping_Cart',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: id })
        console.log("emit data")
      }
    })
  },
  general_introduce:function(e){
    
    var that = this
    var id = e.target.dataset.id
    var g_src = this.data.g_introduction[id].src
    var g_name = this.data.g_introduction[id].name
    console.log(g_src)
    wx.navigateTo({
      url: '/pages/general_introduction/general_introduction',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { src:g_src ,
        name:g_name})
      }
    })
  },
  like:function(e){
    console.log(e)
    var id=this.data.group[this.data.group_touch_id].contain[e.target.dataset.id]
    this.add_to_cart(id)
    this.red_point()
    getApp().globalData.select_department_id = this.data.select_department_id
    console.log( getApp().globalData.select_department_id)
  },
  red_point:function(){
    if (this.data.select_department_id.length==0){ 
      //未知错误：全部取消like后判断 this.data.select_department_id == [] 也为false，随后改为判断length
      this.setData({
        order_src:"/images/order.svg"
      })
    }else{
      this.setData({
        order_src:"/images/order_unread.svg"
      })
    }
  },
  add_to_cart:function(id){
    console.log("chufa")
    var isclick ="department["+id+"].isclick"
    if (this.data.department[id].isclick ){
      this.setData({
        [isclick]: false,
     })
    var new_select_id=[]
    for (var i in this.data.select_department_id)
    {
      if (id!=this.data.select_department_id[i])
      new_select_id.push(this.data.select_department_id[i])
    }
    this.setData({
      select_department_id:new_select_id
    })
    console.log(this.data.select_department_id)
    }
    else {
      this.data.select_department_id.push(id)
      this.setData({
        select_department_id:this.data.select_department_id,
        [isclick]: true
      })
      console.log(this.data.select_department_id)
    }

  },
  detail_introduction:function(e){
    var that = this
    var id=this.data.group[this.data.group_touch_id].contain[e.currentTarget.dataset.id]
    var d_src = this.data.department[id].d_src
    var t_group = this.data.group[3].contain
   
    let f = false; //f==false则代表点击的是花粉部的小组，否则为技术部的小组
    for (var i in t_group){
      if ( id == t_group[i]){
        f = true
      }
    }
    var background_img_src =""
    if (f) background_img_src = "https://i.loli.net/2021/08/24/pJxLBoZcmbXyQif.png" 
    else background_img_src ="https://i.loli.net/2021/08/24/goNF8mWUPtZywMO.png"
    wx.navigateTo({
      url: '/pages/detail_introduction/detail_introduction',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { 
          src:d_src,
          background_img_src:background_img_src,
          id:id
         })
      }
    })
    
  },
  show_message:function(){
    this.setData({
      show_message:true
    })
  }
})