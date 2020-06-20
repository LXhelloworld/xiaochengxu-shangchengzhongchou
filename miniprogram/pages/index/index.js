// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productsList:[],
    gonggao:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    db.collection('company').get().then((res)=>{
        this.setData({
          gonggao:res.data[0].gonggao
        })
      
    })
    db.collection('products').get().then((res)=>{
      this.setData({
        productsList:res.data
      })
    })
  },

  jumpProduct(e){
    console.log(e);
    wx.navigateTo({
      url: '../product/product?productName='+e.currentTarget.dataset.productname,
    })
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
    const db = wx.cloud.database();
    db.collection('company').get().then((res)=>{
        this.setData({
          gonggao:res.data[0].gonggao
        })
    })
    db.collection('products').get().then((res)=>{
      this.setData({
        productsList:res.data
      })
    })
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