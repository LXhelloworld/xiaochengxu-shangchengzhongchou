// miniprogram/pages/orderList/orderList.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
 onLoadData(type){
  wx.getStorage({
    key: 'id',
    success:(res)=>{
      const db = wx.cloud.database();
      if(type == '0'){
        db.collection('userProduct').where({
          userId:res.data
        }).get().then((upres)=>{
          this.setData({
            productsList:upres.data,
            type:'0'
          })
        })
      }else{
        if(type == '1'){
          db.collection('userProduct').where({
            userId:res.data,
            paid:false
          }).get().then((upres)=>{
            this.setData({
              productsList:upres.data,
              type:'1'
            })
          })
        }else{
          db.collection('userProduct').where({
            userId:res.data,
            paid:true
          }).get().then((upres)=>{
            this.setData({
              productsList:upres.data,
              type:'2'
            })
          })
        }
      }
    }
  })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onLoadData(options.type)
  },
  showDialog(e){
    Dialog.confirm({
      message: '确定删除该项目吗？',
    })
      .then(() => {
        // on confirm
        this.deleteProduct(e.currentTarget.dataset.id)
      })
      .catch(() => {
        // on cancel
      });
  },
  deleteProduct(id){
    const db = wx.cloud.database();
    db.collection('userProduct').doc(id).remove().then(()=>{
      this.onLoadData(this.data.type)
    })
  },
  toPay(e){
    wx.redirectTo({
      url: './../payment/payment?id='+e.currentTarget.dataset.id,
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