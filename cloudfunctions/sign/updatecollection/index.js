const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {
  const db = cloud.database()
  const wxContext = cloud.getWXContext()
  console.log(wxContext.OPENID)
  await db.collection('user')
  .where({
  openid:wxContext.OPENID
  })
  .update({
  data:{
  Name:event.Name,
  avatarUrl:event.avatarUrl,
  birthday:event.birthday,
  gender:event.gender,
  grade:event.grade,
  professional:event.professional,
  school_id:event.school_id,
  email:event.email,
  phone:event.phone,
  Personal_introduction:event.Personal_introduction,
  }
  })
 .then(res => {
    console.log('更新成功')
    console.log(res)
  })

}