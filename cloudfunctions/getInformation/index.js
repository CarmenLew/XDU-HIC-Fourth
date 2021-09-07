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
  //实例化数据库连接
  const db = cloud.database()
  var data = {}
  await db.collection('user')
  .where({
    school_id:event.school_id
  })
  .get()
  .then(res =>{
    console.log(res)
    data = res.data
  })
  var result = {}
  result.errCode = 0
  result.errMsg = '操作成功'
  result.data = data
  return result
}