// miniprogram/pages/addProduct/addProduct.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    imgList: [],
    startTime:'',
    endTime:'',
    videoUrl:'',
    productName:'',
    productPrice:0,
    totalNum:0,
    num:0,
    productIntro:'',
    currentDate: new Date().getTime(),
    minDate: new Date(2019,1,1).getTime(),
    maxDate: new Date(2030,1,1).getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
  },
  showPopup(e) {
    this.setData({ show: true,type:e.currentTarget.dataset.type });
  },
  confirmDate(event){
    if(this.data.type=="start"){
      this.setData({
        startTime: this.time(event.detail),
      });
    }else{
      this.setData({
        endTime: this.time(event.detail),
      });
    }
    this.onClose()
  },
  onClose() {
    this.setData({ show: false });
  },
  upLoadImg(){
    wx.cloud.init();
    wx.chooseImage({
      count:1,
      sourceType:['album','camera'],
      success: (res) => {
        const uploadTask = wx.cloud.uploadFile({
          cloudPath:"img/"+new Date().getTime()+"-"+Math.floor(Math.random()*1000),
          filePath:res.tempFilePaths[0],
          success:(upres)=>{
            this.data.imgList.push(upres.fileID)
            this.setData({
              imgList:this.data.imgList
            })
          }
        })
        uploadTask.onProgressUpdate((pres) => {
          this.setData({
            imgProgress:pres.progress
          })
        })
      },
    })
  },
  upLoadPlanFile(){
    wx.chooseMessageFile({
      count: 1,
      type:'file',
      success: (res) => {
        const uploadTask = wx.cloud.uploadFile({
          cloudPath:"file/"+this.data.productName+'项目计划书-'+new Date().getTime(),
          filePath:res.tempFiles[0].path,
          success:(upres)=>{
            this.setData({
              planUrl:upres.fileID,
              isPlan:true
            })
          }
        })
        uploadTask.onProgressUpdate((pres) => {
          this.setData({
            planProgress:pres.progress
          })
        })
      },
    })
  },
  upLoadgqFile(){
    wx.chooseMessageFile({
      count: 1,
      type:'file',
      success: (res) => {
        const uploadTask = wx.cloud.uploadFile({
          cloudPath:"gqfile/"+this.data.productName+'股权众筹计划书-'+new Date().getTime(),
          filePath:res.tempFiles[0].path,
          success:(upres)=>{
            this.setData({
              gqUrl:upres.fileID,
              isGq:true
            })
          }
        })
        uploadTask.onProgressUpdate((pres) => {
          this.setData({
            gqProgress:pres.progress
          })
        })
      },
    })
  },
  upLoadVideo(){
    wx.cloud.init();
    wx.chooseVideo({
      sourceType:['album','camera'],
      success: (res) => {
        const uploadTask = wx.cloud.uploadFile({
          cloudPath:"video/"+new Date().getTime()+"-"+Math.floor(Math.random()*1000),
          filePath:res.tempFilePath,
          success:(upres)=>{
            this.setData({
              videoUrl:upres.fileID
            })
          }
        })
        uploadTask.onProgressUpdate((pres) => {
          this.setData({
            videoProgress:pres.progress
          })
        })
      },
    })
  },
  onChangeName(e){
      this.setData({
        productName:e.detail.value
      })
  },
  onChangeTotal(e){
    this.setData({
      totalNum:e.detail.value
    })
  },
  onChangeOne(e){
    this.setData({
      productPrice:e.detail.value
    })
  },
  onChangeOnePeople(e){
    this.setData({
      num:e.detail.value
    })
  },
  onChangeIntro(e){
    this.setData({
      productIntro:e.detail.value
    })
  },
  upLoadProduct(){
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('products').doc('75777da85ee2009a0079157b264cf691').update({
      data:{
        productName:this.data.productName,
        productPrice:this.data.productPrice,
        productIntro:this.data.productIntro,
        totalNum:this.data.totalNum,
        num:this.data.num,
        startTime:this.data.startTime,
        endTime:this.data.endTime,
        imgList:this.data.imgList,
        videoUrl:this.data.videoUrl,
        planUrl:this.data.planUrl,
        gqUrl:this.data.gqUrl
      }
    })
  },

  deleteImg(e){
    var list = [];
    this.data.imgList.forEach((item)=>{
      if(item != e.currentTarget.dataset.item ){
        list.push(item)
      }
    })
    this.setData({
      imgList:list
    })
    wx.cloud.deleteFile({
      fileList:[e.currentTarget.dataset.item]
    })
  },
  deletePlanFile(e){
    this.setData({
      planUrl:''
    })
    wx.cloud.deleteFile({
      fileList:[e.currentTarget.dataset.item]
    })
  },
  deleteGqFile(e){
    this.setData({
      gqUrl:''
    })
    wx.cloud.deleteFile({
      fileList:[e.currentTarget.dataset.item]
    })
  },
  deleteVideo(e){
    this.setData({
      videoUrl:''
    })
    wx.cloud.deleteFile({
      fileList:[e.currentTarget.dataset.item]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    db.collection('products').doc(options.id).get().then((res)=>{
      this.setData({
        productName:res.data.productName,
        productPrice:res.data.productPrice,
        productIntro:res.data.productIntro,
        totalNum:res.data.totalNum,
        num:res.data.num,
        startTime:res.data.startTime,
        endTime:res.data.endTime,
        imgList:res.data.imgList,
        videoUrl:res.data.videoUrl,
        planUrl:res.data.planUrl,
        gqUrl:res.data.gqUrl
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

  },
  time(t){
    var date = new Date(t);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
       var Y = date.getFullYear() + '-';
       var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
       var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
       var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
       var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
       var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
        return Y+M+D;
  }
})