// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var is_admin
  var groupName
  
  //实例化数据库连接
  const db = cloud.database()
  //检验是哪个组的管理员
  await db.collection('user')
  .where({
  openid:wxContext.OPENID
  })
  .get()
  .then(res =>{
    is_admin = res.data[0].is_admin
  })
  //获得相应的组名
  await db.collection('group')
  .where({
    groupid: is_admin
  })
  .get()
  .then(res =>{
    groupName = res.data[0].name
  })
  var data = {}
  await db.collection(groupName)
  .where({
    nickName:{
      $regex:'.*' + event.nickName + '.*'
    }
  })
  .get()
  .then(res =>{
    console.log('操作成功')
    console.log(res)
    data = res.data
  })
  var result = {}
  result.errCode = 0
  result.errMsg = '搜索成功'
  result.data = data
  return result
}
