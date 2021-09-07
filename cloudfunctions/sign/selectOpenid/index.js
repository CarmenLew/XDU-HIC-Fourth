const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
 
//根据用户的openid获取用户信息start 
var user;
var is_admin;
var result = 0;
await db.collection('user')
.where({
  openid:wxContext.OPENID
})
.get()
.then(res =>{
  console.log(res)
  user = res.data.length
 if (user >0){
  is_admin = res.data[0].is_admin
  console.log(is_admin)
//根据用户的openid获取用户信息end 
if(is_admin > 0){
  result = 1
}
}
//若为管理员，则返回1；若为老成员，则返回0；若为新成员，则返回2
//如果没有获取到，则新增数据
if(user == 0 ){
  console.log('检测到为新用户')
  result = 2
}
console.log('select')
console.log(result)
})
return result
}
