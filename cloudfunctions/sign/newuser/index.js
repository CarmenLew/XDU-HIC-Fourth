const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {
    const db = cloud.database()
   //构造要添加的数据
   to_add_data = {
    //openid
    openid:event.OPENID,
    //注册时间
    signTime: new Date(),
    //头像地址
    avatarUrl:event.avatarUrl,
    //新生姓名
    Name:event.Name,
    //性别
    gender:event.gender,
    //年级
    grade:event.grade,
    //生辰
    birthday:event.birthday,
    //专业
    professional:event.professional,
    //学号
    school_id:event.school_id,
    //手机号
    phone:event.phone,
    //个人简介
    Personal_introduction:event.Personal_introduction,
    //是否为管理员
    is_admin:0,
    //是否通过
    is_passed:0,
    title:"华为创新俱乐部"
}
  console.log('新构造的用户数据')
  console.log(to_add_data)
  var add_resule = {}
  await db.collection('user')
  .add({
    data: to_add_data
  })
  .then(res => {
    console.log('新增用户成功')
    console.log(to_add_data)
    add_result = res._id
  })
}