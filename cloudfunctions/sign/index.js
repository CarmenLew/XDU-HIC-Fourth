const getAuth = require('./getAuth/index')
const getOpenid = require('./getOpenid/index')
const selectOpenid = require('./selectOpenid/index')
const olduser = require('./olduser/index')
const newuser = require('./newuser/index')
const updatecollection = require('./updatecollection/index')


// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getAuth':
      return await getAuth.main(event, context)
    case 'getOpenid':
      return await getOpenid.main(event, context)
    case 'selectOpenid':
      return await selectOpenid.main(event, context)
    case 'olduser':
      return await olduser.main(event, context)
    case 'newuser':
      return await newuser.main(event, context)
    case 'updatecollection':
      return await updatecollection.main(event, context)
  }
}