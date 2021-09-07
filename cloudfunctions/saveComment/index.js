//云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//云函数入口函数
exports.main = async(event, context) =>{

   /**检测是否正确获取到用户的openid start */ 
   const wxContext = cloud.getWXContext()
   console.log('获取用户微信信息')
   console.log(wxContext)
   if(wxContext.OPENID == undefined){
       //返回执行结果
       var result = {}
       result.errCode = 1
       result.errMsg = '未能正确获取到用户的openid，请退出小程序重试'
       return result
   }
    //**检测是否正确获取到用户的openid end */

    /**检测是否传了参数 start */
    if(event.comment == undefined || event.school_id == undefined){
        var result ={}
        result.errCode = 2
        result.errMsg = '未传必要参数，请重试'
        return result
    }
    /**检测是否传了参数 end */
    
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

    //要储存的面试意见
    to_save_comment = {
        
        comment: event.comment
    }
    console.log('要储存的数据')
    console.log(to_save_comment)
    //储存面试意见
    var add_result ={}
    await db.collection(groupName)
    .where({
        school_id:event.school_id
    })
    .update({
        data: to_save_comment
    })
    .then(res => {
        console.log('保存成功')
        console.log(res.stats.updated)
    })

    //返回执行结果
    var result = {}
    result.errCode = 0
    result.errMsg = '保存成功'
    return result
}