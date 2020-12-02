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
  //项目的开始和结束时间设定
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
  //上传图片
  upLoadImg(){
    wx.cloud.init();
    wx.chooseImage({   //选择图片
      count:1,
      sourceType:['album','camera'],
      success: (res) => {
        //上传图片到服务器
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
        //上传进度
        uploadTask.onProgressUpdate((pres) => {
          this.setData({
            imgProgress:pres.progress
          })
        })
      },
    })
  },
   /**
   * 上传项目计划书
   */
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
   /**
   * 上传项目信息到数据库
   */
  upLoadProduct(){
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('products').where({
      productName:this.data.productName 
    }).get().then((res)=>{
      if(res.data.length == 0){ //判断数据库中是否存在该项目
        db.collection('products').add({
          data:{
            productName:this.data.productName,
            productPrice:Number(this.data.productPrice),
            productIntro:this.data.productIntro,
            totalNum:Number(this.data.totalNum),
            num:Number(this.data.num),
            startTime:this.data.startTime,
            endTime:this.data.endTime,
            imgList:this.data.imgList,
            videoUrl:this.data.videoUrl,
            planUrl:this.data.planUrl,
            gqUrl:this.data.gqUrl
          }
        }).then(()=>{
          wx.redirectTo({
            url: './../manageProduct/manageProduct',
          })
        })
      }else{
        wx.redirectTo({
          url: './../manageProduct/manageProduct',
        })
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
    console.log(this.data.imgList)
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