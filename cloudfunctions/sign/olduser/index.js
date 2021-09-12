const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  await db.collection('user')
.where({
  openid:wxContext.OPENID
})
.field({
  avatarUrl:true,
  Name:true,
  gender:true,
  grade:true,
  birthday:true,
  professional:true,
  school_id:true,
  phone:true,
  email:true,
  Personal_introduction:true,
  is_passed:true,
  title:true
})
.get()
.then(res => {
  console.log('获取用户最新信息成功')
  console.log(res.data)

  user = res.data[0]
})
return user
}
