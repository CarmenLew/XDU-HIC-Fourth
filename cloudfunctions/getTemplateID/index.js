// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  //获取当前用户的微信openid
  const wxContext = cloud.getWXContext()
  console.log(wxContext)
  //** 检测是否正确获取到用户的openid start */
  if(wxContext.OPENID == undefined){
    //返回执行结果
    var result = {}
    result.errCode = 1
    result.errMsg = '未能正确获取到用户的openid，请退出小程序重试'
    
    var data = {}
    result.data = data
    return result
  }
  //** 检测是否正确获取到用户的openid end */

  //返回执行结果
  var result = {}
  result.errCode = 0
  result.errMsg = '微信订阅消息模块ID获取成功'

  var data = {}
  data.template = '7nG6mOLUBgkfmLbCP1GZaRW-zy59AYRXgHRUCP9GFto'//面试模板id
  result.data = data

  return result
}