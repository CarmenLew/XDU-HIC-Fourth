var app = getApp();
Page({
  data: {
      nm: app.globalData.nm,
      headimg: "/images/hic-head.jpg",
      hasUserInfo: false,
      canIUseGetUserProfile: false,
      haveGetOpenId: false,
      openId: '',
  },
  onLoad() {
    
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
  },
  getUserProfile(e) {
    var that = this
    wx.requestSubscribeMessage({
      tmplIds: ["7nG6mOLUBgkfmLbCP1GZaWuKfVRAANMUTaJTYFqYJr4"],
      success: (result) => {console.log("获取订阅消息的用户权限")},
      fail: (result) => {console.log(result)},
      complete: (res) => {},
    })
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于进入HIC招新小程序', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000,
        })
        //console.log(res);
        //console.log(app.globalData.nm);
        //app.globalData.userinfo.Name = res.userInfo.nickName;
        app.globalData.userinfo.avatarUrl = res.userInfo.avatarUrl;
        console.log(app.globalData.nm);
        this.setData({
          headimg: app.globalData.userinfo.avatarUrl,
          nm: app.globalData.userinfo.Name,
          hasUserInfo: true
        })
        //console.log(app.globalData.headimg);

        wx.showLoading({
          title: '',
        })

        wx.cloud.callFunction({
          name: 'sign',
          config: {
           // env: this.date.envId
          },

          data: {
            type: 'getAuth'
          }
        }).then((resp) => {
          
          //console.log(resp)
          this.setData({
            haveGetOpenId: true,
            openId: resp.result.openid
          })
          app.globalData.userinfo.OPENID = that.data.openId
          wx.hideLoading()
          //console.log(resp.result.openid);
          app.globalData.haveGetOpenId = true;
          app.globalData.OPENID = resp.result.openid;
          //console.log(app.globalData.openId);
          
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
       })
      
       
        //  url: '../welcome/index'
        //}) 
      }
    })
  },

  jmp1:function(){
    //wx.reLaunch({
    wx.navigateTo({
      title: "跳转",
          url: '../user-admin/index',
    })
  },
  jmp2:function(){
    //wx.reLaunch({
    wx.navigateTo({
      title: "跳转",
          url: '../user-new/index',
    })
  },
  jmp3:function(){
    //wx.reLaunch({
    wx.navigateTo({
    title: "跳转",
          url: '../user-old/index',
    })
  },

})