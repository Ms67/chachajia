// 云函数入口文件
const cloud = require('wx-server-sdk')
const fs = require('fs')
const path = require('path')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const fileID = 'cloud://xinxijia-dev-7f7d27.7869-xinxijia-dev-7f7d27/单个城市查询.json'
  const res = await cloud.downloadFile({
    fileID,
  })
  const buffer = res.fileContent
  var datalist = JSON.parse(buffer.toString('utf8'))["RECORDS"]
  const db = cloud.database()
  for (i in datalist){
    try {
        db.collection('test').add({
        // data 字段表示需新增的 JSON 数据
        data: datalist[i]
      })
      // console.log(datalist[i])
      console.log("add")
    } catch (e) {
      console.error(e)
    }
  } 
  

 
}