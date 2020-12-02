// miniprogram/pages/payment/payment.js
import area from 'area.js';
import Toast  from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    areaList:area,
    cityValue:'',
    name:'',
    phone:0,
    addr:'',
    shouPay:true
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  confirm(e){
    this.onClose();
    this.setData({
      cityValue:e.detail.values[0].name+e.detail.values[1].name+e.detail.values[2].name
    })
  },
  onChangeAddr(event){
    this.setData({
      addr:event.detail
    })
  },
  onChangeName(event){
    this.setData({
      name:event.detail
    })
  },
  onChangePhone(event){
    this.setData({
      phone:event.detail
    })
  },
  pay(){
    wx.getStorage({
      key: 'id',
      success:(res)=>{
        const db = wx.cloud.database();
        db.collection('users').doc(res.data).get().then((res)=>{
          if(res.data.smConfirm){
            if(this.data.phone==0 &&this.data.name=='' &&this.data.cityValue==''){
              Toast('地址电话姓名不能为空！')
            }else{
              db.collection('userProduct').doc(this.data.userProduct._id).update({
                data:{
                  paid:true,
                  address:this.data.cityValue+this.data.addr,
                  phone:this.data.phone,
                  name:this.data.name
                }
              }).then(()=>{
                this.setData({
                  shouPay:false
                })
              })
            }
          }else{
            wx.redirectTo({
              url: './../smConfirm/smConfirm',
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    db.collection('userProduct').doc(options.id).get().then((res)=>{
      this.setData({
        userProduct:res.data,
        totalPrice:(res.data.productPrice*res.data.needNum).toFixed(2)
      })
    })
  },
  backIndex(){
    wx.switchTab({
      url: './../index/index',
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