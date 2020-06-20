// miniprogram/pages/manageCompany/manageCompany.js
import Toast  from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onChange(event) {
    // event.detail 为当前输入的值
    this.setData({
      gonggao:event.detail
    });
  },
  onChangeIntro(event) {
    // event.detail 为当前输入的值
    this.setData({
      companyIntro:event.detail
    });
  },
  onChangePhone(event) {
    // event.detail 为当前输入的值
    this.setData({
      companyPhone:event.detail
    });
  },
  onChangeEmial(event) {
    // event.detail 为当前输入的值
    this.setData({
      companyEmial:event.detail
    });
  },
  fb(){
    const db = wx.cloud.database();
    db.collection('company').get().then((res)=>{
      if(res.data.length>0){
        var id = res.data
        db.collection('company').doc(id[0]._id).update({
          data:{
            gonggao:this.data.gonggao
          }
        })
        Toast('发布成功');
      }else{
        db.collection('company').add({
          data:{
            gonggao:this.data.gonggao
          }
        })
      }
    })
},
fbIntro(){
  const db = wx.cloud.database();
    db.collection('company').get().then((res)=>{
      if(res.data.length>0){
        var id = res.data
        db.collection('company').doc(id[0]._id).update({
          data:{
            companyIntro:this.data.companyIntro
          }
        })
        Toast('发布成功');
      }else{
        db.collection('company').add({
          data:{
            companyIntro:this.data.companyIntro
          }
        })
      }
    })
},
fbPhone(){
  const db = wx.cloud.database();
    db.collection('company').get().then((res)=>{
      if(res.data.length>0){
        var id = res.data
        db.collection('company').doc(id[0]._id).update({
          data:{
            companyPhone:this.data.companyPhone
          }
        })
        Toast('发布成功');
      }else{
        db.collection('company').add({
          data:{
            companyPhone:this.data.companyPhone
          }
        })
      }
    })
},
fbEmail(){
  const db = wx.cloud.database();
    db.collection('company').get().then((res)=>{
      if(res.data.length>0){
        var id = res.data
        db.collection('company').doc(id[0]._id).update({
          data:{
            companyEmial:this.data.companyEmial
          }
        })
        Toast('发布成功');
      }else{
        db.collection('company').add({
          data:{
            companyEmial:this.data.companyEmial
          }
        })
      }
    })
},
toEditProduct(){
  wx.navigateTo({
    url: './../manageProduct/manageProduct',
  })
},
toEditUser(){
  wx.navigateTo({
    url: './../manageUser/manageUser',
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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