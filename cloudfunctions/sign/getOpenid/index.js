const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {
  /** 检测用户的openid是否被正确获取start */
  const wxContext = cloud.getWXContext()

  console.log('成功获取用户信息')
  console.log(wxContext)

  if(wxContext.OPENID == undefined){
    //返回执行结果
    var result = {}
    result.errCode = 1
    result.errMsg = '未能正确获取到用户的信息,请重试'
    var data = {}
    result.data = data
    return result
  }
  /** 检测用户的openid是否被正确获取end */
}