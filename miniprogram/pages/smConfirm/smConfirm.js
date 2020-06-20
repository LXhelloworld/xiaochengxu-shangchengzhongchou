// miniprogram/pages/smConfirm/smConfirm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:true
  },
  upLoadZImg(){
    wx.cloud.init();
    wx.chooseImage({
      count:1,
      sourceType:['album','camera'],
      success: (res) => {
        const uploadTask = wx.cloud.uploadFile({
          cloudPath:"shenfenImg/"+new Date().getTime()+"-"+Math.floor(Math.random()*1000),
          filePath:res.tempFilePaths[0],
          success:(upres)=>{
            this.setData({
              zImg:upres.fileID
            })
            wx.getStorage({
              key: 'id',
              success:(ures)=>{
                const db = wx.cloud.database();
                db.collection('users').doc(ures.data).update({
                  data:{
                    zImg:upres.fileID
                  }
                })
              }
            })
          }
        })
        uploadTask.onProgressUpdate((pres) => {
          this.setData({
            zProgress:pres.progress
          })
        })
      },
    })
  },
  upLoadFImg(){
    wx.cloud.init();
    wx.chooseImage({
      count:1,
      sourceType:['album','camera'],
      success: (res) => {
        const uploadTask = wx.cloud.uploadFile({
          cloudPath:"shenfenImg/"+new Date().getTime()+"-"+Math.floor(Math.random()*1000),
          filePath:res.tempFilePaths[0],
          success:(upres)=>{
            this.setData({
              fImg:upres.fileID
            })
            wx.getStorage({
              key: 'id',
              success:(ures)=>{
                const db = wx.cloud.database();
                db.collection('users').doc(ures.data).update({
                  data:{
                    fImg:upres.fileID
                  }
                })
              }
            })
          }
        })
        uploadTask.onProgressUpdate((pres) => {
          this.setData({
            fProgress:pres.progress
          })
        })
      },
    })
  },
  deleteZImg(){
    wx.cloud.deleteFile({
      fileList:[this.data.zImg]
    }).then((res)=>{
      this.setData({
        zImg:''
      })
      wx.getStorage({
        key: 'id',
        success:(res)=>{
          const db = wx.cloud.database();
          db.collection('users').doc(res.data).update({
            data:{
              zImg:''
            }
          }).then(()=>{
            this.setData({
              zProgress:0
            })
          })
        }
      })
    })
  },
  deleteFImg(){
    wx.cloud.deleteFile({
      fileList:[this.data.fImg]
    }).then(()=>{
      this.setData({
        fImg:''
      })
      wx.getStorage({
        key: 'id',
        success:(res)=>{
          const db = wx.cloud.database();
          db.collection('users').doc(res.data).update({
            data:{
              fImg:''
            }
          }).then(()=>{
            this.setData({
              fProgress:0
            })
          })
        }
      })
    })
  },
  smConfirm(){
    this.setData({
      show:false
    })
  },
  backIndex(){
    wx.switchTab({
      url: './../index/index',
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