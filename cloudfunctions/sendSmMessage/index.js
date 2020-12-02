// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.customerServiceMessage.send({
        touser: 'oz9TM4u2Zi_rBxnLOpX0Te32-jiU',
        msgtype: 'text',
        text: {
          content: 'Hello World'
        }
      })
    return result
  } catch (err) {
    return err
  }
}