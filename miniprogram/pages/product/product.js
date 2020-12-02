// miniprogram/pages/product/product.js
import Toast  from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    needNum:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    db.collection('products').where({
      productName:options.productName
    }).get().then((res)=>{
      this.setData({
        product:res.data
      })
      this.ProductProgress();
    })
  },
  //获取众筹进度
  ProductProgress(){
    const db = wx.cloud.database();
    db.collection('userProduct').where({
      productId:this.data.product._id,
      paid:true
    }).get().then((res)=>{
      var nowNum = 0;
      res.data.forEach((item)=>{
        nowNum += item.needNum
      })
      this.setData({
        proProgress:(nowNum/this.data.product[0].totalNum*100).toFixed(2),
        nowNum:nowNum
      })
    })
  },
  addNum(){
    if(this.data.needNum<this.data.product[0].num){
      this.data.needNum +=1
      this.setData({
        needNum:this.data.needNum
      })
    }
  },
  minusNum(){
    if(this.data.needNum>1){
      this.data.needNum -=1
      this.setData({
        needNum:this.data.needNum
      })
    }
  },
  downLoad(e){
    const downloadTask = wx.cloud.downloadFile({
      fileID: e.currentTarget.dataset.url,
      success: res => {
        if (res.statusCode == 200) {
          wx.openDocument({
            filePath: res.tempFilePath,
            showMenu:true,
            fileType:'pdf'
          })
        }
      },
      fail: err => {
        // handle error
      }
    })
    downloadTask.onProgressUpdate((res) => {
      this.setData({
        progress:res.progress
      })
    })
  },
  onSubmit(){
    var id = wx.getStorageSync('id')
    if(id){
      const db = wx.cloud.database();
      db.collection('userProduct').where({
        userId:id,
        paid:true
      }).get().then((res1)=>{
        var userNum = 0
        res1.data.forEach((item)=>{
          userNum +=item.needNum
        })
        if(userNum+this.data.needNum <= this.data.product[0].num){
          if(this.data.nowNum+this.data.needNum <= this.data.product[0].totalNum){
            const db = wx.cloud.database();
            db.collection('userProduct').add({
              data:{
                userId:id,
                productId:this.data.product[0]._id,
                productName:this.data.product[0].productName,
                productImg:this.data.product[0].imgList[0],
                productPrice:this.data.product[0].productPrice,
                productIntro:this.data.product[0].productIntro,
                needNum:this.data.needNum,
                paid:false
              }
            }).then((res)=>{
              wx.navigateTo({
                url: './../payment/payment?id='+res._id,
              })
            })
          }else{
            Toast('超过库存！请减少预购数量')
          }
        }else{
          Toast('超过限购数量！请减少预购数量或选择其他项目')
        }
      })
    }else{
      wx.navigateTo({
        url: './../login/login',
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})