// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var title = "面试通知"
  var content = "报名时间为13号~16号。面试时间初步定在17号下午、晚上，18号和19号，面试地点在竹园一号楼活动室,具体时间段以及更多最新消息请关注招新QQ群：776998675"
  return {title,content}
}