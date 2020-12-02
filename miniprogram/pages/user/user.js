// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   userName:'未登录'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'id',
      success:(res)=>{
        const db = wx.cloud.database();
        db.collection('users').doc(res.data).get().then((ures)=>{
          if(ures.data.shenfen == '管理员'){
            this.setData({
              userName:ures.data.nickName,
              avatarUrl:ures.data.avatarUrl,
              showManage:true
            })
          }else{
            this.setData({
              userName:ures.data.nickName,
              avatarUrl:ures.data.avatarUrl,
              showManage:false
            })
          }
        
      }).catch(()=>{
        wx.setStorage({
          data: '',
          key: 'id',
        })
      })
      }
    })
  },

  jumpOrder(e){
    wx.navigateTo({
      url: './../orderList/orderList?type='+e.currentTarget.dataset.type,
    })
  },




  call:function(){
    wx.cloud.callFunction({
      name:'sendMessage',
      success:function(res) {
        console.log('result:',res.result)
      },
      fail:console.error
    })
    /* wx.makePhoneCall({
      phoneNumber: '13348680343',
    }) */
  },
  login(){
    var id = wx.getStorageSync('id')
    if(!id){
      wx.navigateTo({
        url: './../login/login',
      })
    }
  },
  jumpMp(){
    wx.navigateTo({
      url: './../manageCompany/manageCompany',
    })
  },
  jumpCompanyIntro(){
    wx.navigateTo({
      url: './../companyIntro/companyIntro',
    })
  },
  jumpConnection(){
    wx.navigateTo({
      url: './../connection/connection',
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
    wx.getStorage({
      key: 'id',
      success:(res)=>{
        const db = wx.cloud.database();
        db.collection('users').doc(res.data).get().then((ures)=>{
          if(ures.data.shenfen == '管理员'){
            this.setData({
              userName:ures.data.nickName,
              avatarUrl:ures.data.avatarUrl,
              showManage:true
            })
          }else{
            this.setData({
              userName:ures.data.nickName,
              avatarUrl:ures.data.avatarUrl,
              showManage:false
            })
          }
        
      }).catch(()=>{
        wx.setStorage({
          data: '',
          key: 'id',
        })
      })
      }
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