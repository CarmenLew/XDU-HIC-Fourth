// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const wxContext = cloud.getWXContext()
  console.log(event)
  to_add_data = {
    //新生姓名
    Name:event.Name,
    //学号
    avatarUrl:event.avatarUrl,
    school_id:event.school_id,
    openid:wxContext.OPENID,
    is_passed:0,//is_pass==0为未审核，1为通过，2为不通过
  }
  for (let i=0; i<event.yiyuan.length; i++){
    var f = 0 // f==0代表改用户在该分表中未创建信息，f==1则代表已创建。若未创建则创建信息，否则不作处理。
  await db.collection(event.yiyuan[i])
  .where({
    school_id:event.school_id
  })
  .get()
  .then(res=>{
    console.log(res)
    if (res.data.length>0) f=1
  })
  if (f==0){
    await db.collection(event.yiyuan[i])
        .add({
        data: to_add_data
        })
        .then(res => {
        console.log('新增用户成功')
        })
        console.log(event.yiyuan[i]);
  }else{
    console.log("该成员已经提交过"+event.yiyuan[i]+"啦")
  }

  }


  return {

  }
}