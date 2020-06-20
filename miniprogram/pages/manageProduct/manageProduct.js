// miniprogram/pages/manageProduct/manageProduct.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gonggao:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoadData(){
    const db = wx.cloud.database();
    db.collection('products').get().then((res)=>{
      this.setData({
        productsList:res.data
      })
    })
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onLoadData();
  },
   /**
   * 跳转修改编辑项目页面并传入项目id
   */
  editProduct(e){
    wx.redirectTo({
      url: './../editProduct/editProduct?id='+e.currentTarget.dataset.id,
    })
  },
   /**
   * 加载弹窗
   */
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
   /**
   * 删除项目
   */
  deleteProduct(id){
    const db = wx.cloud.database();
    //获取项目信息，并删除项目文件，图片，视频等
    db.collection('products').doc(id).get().then((res)=>{
      wx.cloud.deleteFile({
        fileList:[...res.data.imgList,res.data.videoUrl,res.data.planUrl,res.data.gqUrl]
      })
    })
    //删除项目数据库数据
    db.collection('products').doc(id).remove().then(()=>{
      this.onLoadData();
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
    db.collection('products').get().then((res)=>{
      this.setData({
        productsList:res.data
      })
    })
  },
  //跳转添加项目页面
  jumpAddProduct(){
    wx.navigateTo({
      url: './../addProduct/addProduct',
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