// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  /** 检测是否正确获取到用户的openid start */
  const wxContext = cloud.getWXContext()
  console.log('获取用户微信信息')
  console.log(wxContext)

  if(wxContext.OPENID == undefined){
    //返回执行结果
    var result = {}
    result.errCode = 1
    result.errMsg = '未能正确获取到用户的openid，请退出小程序重试'
    var data = {}
    result.data = data
    return result
  }
  /** 检测是否正确获取到用户的openid end */

  /** 检测是传了必要参数 start */
  if(event.school_id == undefined||event.interviewResult == undefined){
    var result = {}
    result.errCode = 2
    result.errMsg = '未传必要参数，请重试'
    var data = {}
    result.data = data
    return result
  }
  /** 检测是传了必要参数 end */

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

  to_save_result = {
    result: event.interviewResult
  }
  console.log('要储存的结果')
  console.log(to_save_result)

  //保存结果
  var save_result = {}
  await db.collection(groupName)
  .where({
    school_id: event.school_id
  })
  .update({
    data: to_save_result
  })
  .then(res =>{
    console.log('保存成功')
    console.log(res.stats.updated)
  })

  //获取被面试者的openid和姓名
  await db.collection('user')
  .where({
    school_id: event.school_id
  })
  .get()
  .then(res =>{
    OPENID = res.data[0].openid
    userName = res.data[0].Name
  })
  var data = {}
  /** 给被面试者发送面试结果 start */
  var group
  switch (groupName) {
    case 'ACM_member':
      group = 'ACM'
      break;
    case 'AI_member':
      group = 'AI'
      break;
    case 'shumo_member':
      group = '数模'
      break;
    case 'qianhouduan_member':
      group = '前后端'
      break;
    case 'yingjian_member':
      group = '硬件'
      break;
    case 'sheji_member':
      group = '设计'
      break;
    case 'wailian_member':
      group = '外联'
      break;
    case 'xuanchuan_member':
      group = '宣传'
      break;
    case 'xinmeiti_member':
      group = '新媒体'
      break;
    default:
      group = '策划'
      break;
  }
  try {
    await sendResultMessage(OPENID,userName,group,event.interviewResult)
  } catch (e) {
    data['user_notice_msg'] = '发送消息失败'
    data['user_notice_error_tip'] = e 
  }
/** 给被面试者发送面试结果 end */

//将面试通过者的信息存入member表中
  if(event.interviewResult == '通过'){
  //判断用户是否已经存在于members中
   var member;
   await db.collection('members')
   .where({
     school_id:event.school_id
   })
   .get()
    .then(res =>{
      member = res.data[0]
   })

    //如果没有获取到信息，则新增数据
    if(member == undefined){
     await db.collection('members')
      .add({
       data:{
        nickName:userName,
        school_id:event.school_id,
        group: new Array(group)
      }
      })
      .then(res =>{
        console.log('新增成功')
        console.log(res)
     })
    }
  //如果获取到，则更新信息
    else{
    await db.collection('members')
    .where({
      school_id: event.school_id
    })
    .update({
      data:{
       group: db.command.push(group)
      }
    })
    .then(res =>{
      console.log('更新成功')
      console.log(res)
     })
    }
  }
//返回执行结果
 var result = {}
 result.errCode = 0
 result.errMsg = '执行成功'
 result.data = data
 return result
}

/**
* 发送面试结果
* @param {*} openid
* @param {*} username
* @param {*} content
* @param {*} time
*/

async function sendResultMessage(openid,userName,group,interviewResult){
  var context
  if(interviewResult == '通过'){
    context = '通过'
  }
  else{
    context = '未通过'  
  }
  // 用户的openid
  const OPENID = openid
  // 面试结果模板
  const templateID = '7nG6mOLUBgkfmLbCP1GZaWuKfVRAANMUTaJTYFqYJr4'
  //调用发送函数
  const sendResult = await cloud.openapi.subscribeMessage.send({
    touser: OPENID,
    templateId: templateID,
    miniprogram_state: 'developer', //跳转小程序类型：developer为开发版；trial为体验版;formal为正式版；默认为正式版
    page: 'pages/login/index',
    data:{
      thing1:{
        value:userName
      },
      thing2:{
        value:'西电华为创新俱乐部'
      },
      thing3:{
        value:group+'组'
      },
      phrase5:{
        value:context
      }
    }
  })
  return sendResult
}
