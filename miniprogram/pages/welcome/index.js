// pages/welcome/index.js
const app = getApp();
var touchStartX = 0;//触摸时的原点  
var touchStartY = 0;//触摸时的原点  
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动  
var interval = "";// 记录/清理时间记录  
var touchMoveX = 0; // x轴方向移动的距离
var touchMoveY = 0; // y轴方向移动的距离
Page({

  /*页面的初始数据*/
  data: {
    animation: {},
    isLogin: "请登陆",
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    headimg:'/images/hic-head.jpg',
  },

  // 触摸开始事件  
  touchStart: function (e) {
    touchStartX = e.touches[0].pageX; // 获取触摸时的原点  
    touchStartY = e.touches[0].pageY; // 获取触摸时的原点  
    // 使用js计时器记录时间    
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸移动事件  
  touchMove: function (e) {
    touchMoveX = e.touches[0].pageX;
    touchMoveY = e.touches[0].pageY;
  },
  // 触摸结束事件  
  touchEnd: function (e) {
    var moveX = touchMoveX - touchStartX
    var moveY = touchMoveY - touchStartY
    if (Math.sign(moveX) == -1) {
      moveX = moveX * -1
    }
    if (Math.sign(moveY) == -1) {
      moveY = moveY * -1
    }
    if (moveX <= moveY) {// 上下
      // 向上滑动
      if (touchMoveY - touchStartY <= -30 && time < 10) {
        console.log("向上滑动");
        /*
        wx.navigateTo({
          title: "登陆",
              url: '../login/index',//要跳转到的页面路径
              //url: '../test/index',
        })
        */ 
        
       wx.cloud.callFunction({
        name: 'sign',
        config: {
          env: this.data.envId
        },
        data: {
          type: 'selectOpenid'
        }
      }).then((resp) => {
       // console.log("qiansuccessgetauth")
        //console.log(resp)
        let res = resp.result;
        console.log(res);
        //res = 1;
        //console.log(resp.resulres);
        let  jmp = '';//若为管理员，则返回1；若为老成员，则返回0；若为新成员，则返回2
        //1管理员，0老成员，2新成员
        if(res == 1) {//管理员
          jmp = '../user/user?status=1';
        } else if(res == 0) {//老成员
          jmp = '../user/user?status=0';
        } else if(res == 2){ //新成员
          jmp = '/pages/newuser_edit_info/newuser_edit_info';
        }
        
        wx.reLaunch({
          title: "跳转",
              url: jmp,//要跳转到的页面路径
              //url: '../test/index',
        })
     })


      }
    clearInterval(interval); // 清除setInterval  
    time = 0;
    }
  },

  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    
  },

  /* 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {

  },

  onShow: function () {
    this.setData({
      headimg: getApp().globalData.headimg,
    })
    // 1: 创建动画实例animation:
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
     })
     this.animation = animation
     var next = true;
     //连续动画关键步骤
     setInterval(function () {
      //2: 调用动画实例方法来描述动画
      if (next) {
       //animation.scale(1.5,1.5).step();
       animation.translateY(12).step();
       //animation.rotate(19).step()
       next = !next;
      } else {
       //animation.scale(1,1).step();
       animation.translateY(-12).step();
       //animation.rotate(-19).step()
       next = !next;
      }
      //3: 将动画export导出，把动画数据传递组件animation的属性 
      this.setData({
       animation: animation.export()
      })
     }.bind(this), 600)
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

  /*页面上拉触底事件的处理函数 */
  onReachBottom: function () {

  },

  /*用户点击右上角分享*/
  onShareAppMessage: function () {

  },
   //js部分示例代码
  //跳转到非tabBar页面  
  jmp: function() {
    /*
    wx.navigateTo({
      title: "登陆",
          url: '../login/index',//要跳转到的页面路径
          //url: '../test/index',
  }) 
  */

 wx.cloud.callFunction({
  name: 'sign',
  config: {
    env: this.data.envId
  },
  data: {
    type: 'selectOpenid'
  }
}).then((resp) => {
 // console.log("qiansuccessgetauth")
  //console.log(resp)
  let res = resp.result;
  console.log(res);
  //res = 1;
  //console.log(resp.resulres);
  let  jmp = '';//若为管理员，则返回1；若为老成员，则返回0；若为新成员，则返回2
  //1管理员，0老成员，2新成员
  if(res == 1) {//管理员
    jmp = '../user/user?status=1';
  } else if(res == 0) {//老成员
    jmp = '../user/user?status=0';
  } else if(res == 2){ //新成员
    jmp = '/pages/newuser_edit_info/newuser_edit_info';
  }
  
  wx.reLaunch({
    title: "跳转",
        url: jmp,//要跳转到的页面路径
        //url: '../test/index',
  })
})
  },

})
