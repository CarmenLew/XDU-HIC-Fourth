// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  console.log(wxContext.OPENID)
  await db.collection('user')
  .where({
  openid:wxContext.OPENID
  })
  .update({ 
  data:{
    title:event.title,
  }
  })
 .then(res => {
    console.log('更新成功')
    console.log(res)
  })
  
}