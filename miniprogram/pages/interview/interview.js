 // pages/interview/interview.js

 var app = getApp()

 Page({

   /**
    * 页面的初始数据
    */
   data: {
     is_hidden: [],
     //userheadUrl: "/images/tkk.png",
     //nameUrl: "唐可可",
     //numberUrl: "2333",
     search_word: ""
     /* stuinfo: [{
         name: "唐可可",
         userhead: "/images/tkk.png"
        }*/
     // ],
     // showStuInfo:stuinfo,

   },

   search: function (e) {
     var that = this
     console.log(this.data.search_word)
     var i = 0
     var flag = 0
     for (i = 0; i < that.data.stuinfo.length; i++) {
       if (that.data.search_word == that.data.stuinfo[i].Name) {
         //stuinfo: [{
         // name: that.data.stuinfo[i].name,
         //   userhead: that.data.stuinfo[i].userhead
         // }, ],
         flag++
         app.globalData.search_word = that.data.stuinfo[i].Name
         console.log(app.globalData.search_word)
         wx.navigateTo({
           url: '../searchresult/searchresult',
         })

       }
     }
     if (flag == 0) {
       wx.showToast({
         title: '该学生不存在',
         // icon: 'fail',
         image: "../../images/叉.png",
         duration: 1500,
       })
       setTimeout(
         function () {
           // wx.navigateBack({
           //   delta: 0
           // })
         }, 1200
       )
     }

     // wx.cloud.callFunction({
     //   name:'',
     //   data:{
     //     search_word: that.data.search_word,
     //   },
     //   success:res =>{
     //     console.log(res)
     //     if(res.result.search_word){
     //       that.setData({
     //         stuinfo: res.result.result.data.stuinfo
     //       })
     //     } else{
     //         if(){
     //           that.setData({
     //             stuinfo: []
     //           })
     //         }
     //       }
     //     }
     // })
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
     console.log("触发onload")
     let that = this
     wx.showLoading({
       title: '加载名单ing',
     })
     wx.cloud.callFunction({
       name: "getNamelist"
     }).then(res => {
        console.log(res)
       this.setData({
         stuinfo: res.result.result.data,
         group: res.result.result.group
       })
       for (let i in that.data.stuinfo) {
         if (that.data.stuinfo[i].result == "通过") {
           that.data.is_hidden.push(0)
         }else if (that.data.stuinfo[i].result == "不通过") {
           that.data.is_hidden.push(-1) //已通过为0，未通过为-1，未审批为1
        } else that.data.is_hidden.push(1) //0不显示，1显示
         console.log(that.data.is_hidden)
         that.setData({
           is_hidden: that.data.is_hidden
         })
       }
       wx.hideLoading({
         success: (res) => {},
       })
       console.log(that.data.stuinfo)
     })


     //异步 容易出bug:还没获取完信息就被点击，导致出错

   },

   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {
     //console.log("触发onready")
   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {
     // console.log("触发onshow")
   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {
     // console.log("触发onhide")
   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {
     // console.log("触发onUnload")
   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function () {

   },

   bindKeyInput: function (e) {
     var input = e.detail.value
     console.log("检测输入：" + input)
     this.setData({
       search_word: input
     })
   },

   goToUserInfo: function (e) {

     var id = e.target.dataset.id
     var school_id = this.data.stuinfo[id].school_id
     wx.navigateTo({
       url: '../userinfo/userinfo?school_id=' + school_id
     })
   },
   Agree: function (e) {
     //console.log(e)
     var id = e.target.dataset.id
     console.log(id)
     console.log(this.data.stuinfo[id])
     let school_id = this.data.stuinfo[id].school_id
     let result = "通过"
     this.saveResult(school_id, result, id)
     this.send_email(school_id,result)
   },
   disagree: function (e) {
     var id = e.target.dataset.id
     console.log(id)
     console.log(this.data.stuinfo[id])
     let school_id = this.data.stuinfo[id].school_id
     let result = "不通过"
     this.saveResult(school_id, result, id)
     this.send_email(school_id,result)
   },
   send_email:function(school_id,result){
     var email,name,group;
     var that = this;
     wx.cloud.callFunction({
       name:"getInformation",
       data:{
         school_id:school_id
       }
     }).then(res=>{
       console.log(res)
       email = res.result.data[0].email;
       name = res.result.data[0].Name;
       group = that.data.group
       console.log(name)
       console.log(email)
       console.log(result)
       console.log(group)
       if (email != undefined){
        wx.request({
        url: 'https://ksfu.top/hic/mail.php',
        method:'post',
        data:{
          name:name,
          email:email,
          group:group,
          res:result
        }
       })
     }
     })
     
   },
   saveResult: function (school_id, result, id) {
     var that = this
     console.log(school_id)
     console.log(result)
     wx.showLoading({
       title: '',
     })
     wx.cloud.callFunction({
       name: "saveResult",
       data: {
         school_id: school_id,
         interviewResult: result,
       }
     }).then(res => {
       console.log(res)
       if (res.result.errMsg == "执行成功") {
         that.data.is_hidden[id] = 0
         that.setData({
           is_hidden: that.data.is_hidden
         })
         wx.hideLoading({
           success: (res) => {
             wx.showToast({
               title: '操作成功',
             })
           },
         })

       }
     })
   },

   /**
    * 页面上拉触底事件的处理函数
    */
   // onReachBottom: function () {

   // },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {

   }


 })