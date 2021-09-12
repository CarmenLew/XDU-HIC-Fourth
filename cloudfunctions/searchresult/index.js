// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  var application;
  var data =[];
  await db.collection("user")
  .where({
    openid:wxContext.OPENID
  })
  .get()
  .then(res=>{
    application = res.data[0].application
  })
  for (let i in application){
  await db.collection("group")
  .where({
    name:application[i]
  })
  .get()
  .then(res=>{
    data[i] = new Object()
    data[i].name = res.data[0].chinese_name;
    data[i].img =res.data[0].s_src;
  })
 }
  var result=[];
  if (application!=undefined )
  if ( application.length >0){
    for (let i in application){
      await db.collection(application[i])
      .where({
        openid:wxContext.OPENID
      })
      .get()
      .then(res=>{
        if (res.data[0].result == undefined){
          data[i].result = "审批中"
       }else
       {
       data[i].result = res.data[0].result
       }
      })
    }
  }
  
  return {
    data
  }
}