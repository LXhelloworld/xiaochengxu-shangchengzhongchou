// miniprogram/pages/manageUser/manageUser.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  showDialog(e){
    Dialog.confirm({
      message: '确定设其为管理员么？',
    })
      .then(() => {
        // on confirm
        this.setGuanliyuan(e.currentTarget.dataset.id)
      })
      .catch(() => {
        // on cancel
      });
  },
  showSmDialog(e){
    Dialog.confirm({
      message: '确定通过其实名认证么？',
    })
      .then(() => {
        // on confirm
        this.smConfirm(e.currentTarget.dataset.id)
      })
      .catch(() => {
        // on cancel
      });
  },
  showCancelDialog(e){
    Dialog.confirm({
      message: '确定取消其管理员身份么？',
    })
      .then(() => {
        // on confirm
        this.cancelGuanliyuan(e.currentTarget.dataset.id)
      })
      .catch(() => {
        // on cancel
      });
  },
  setGuanliyuan(id){
    const db = wx.cloud.database();
    db.collection('users').doc(id).update({
      data:{
        shenfen:'管理员'
      }
    }).then((res)=>{
      this.onLoad()
    })
  },
  cancelGuanliyuan(id){
    const db = wx.cloud.database();
    db.collection('users').doc(id).update({
      data:{
        shenfen:'用户'
      }
    }).then((res)=>{
      this.onLoad()
    })
  },
  smConfirm(id){
    const db = wx.cloud.database();
    db.collection('users').doc(id).update({
      data:{
        smConfirm:true
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    db.collection('users').get().then((res)=>{
      this.setData({
        userList:res.data
      })
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