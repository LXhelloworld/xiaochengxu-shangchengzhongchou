// miniprogram/pages/product/product.js
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
      console.log(this.data.product)
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