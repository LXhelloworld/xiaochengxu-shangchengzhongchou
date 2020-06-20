// miniprogram/pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getUser(res){
    if(res.detail.userInfo){
      //把用户信息传入数据库，并得到id
      var that = this;
      var user = res.detail.userInfo;
      wx.cloud.callFunction({
        //调用的函数名字
        name:'add',
        success:function(res) {
          var openID = res.result.openid;
          const db = wx.cloud.database();
          db.collection('users').where({
            openID:openID
          }).get().then((res)=>{
            if(res.data.length>0){
              console.log(res.data)
              wx.setStorageSync('openID', openID);
                wx.setStorageSync('id', res.data[0]._id);
                wx.navigateBack({
                  delta:1
                })
            }else{
              db.collection('users').add({
                data:{
                  openID:openID,
                  nickName:user.nickName,
                  gender:user.gender,
                  avatarUrl:user.avatarUrl,
                  productsList:[],
                  shenfen:"用户",
                  smConfirm:false,
                  smImg:[]
                }
              }).then((res)=>{
                wx.setStorageSync('openID', openID);
                wx.setStorageSync('id', res._id);
                wx.navigateBack({
                  delta:1
                })
              })
            }
          })
          
        },
      fail:console.error
      })
    }else{
      wx.navigateBack({
        delta:1
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