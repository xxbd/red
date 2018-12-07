// pages/register/register3/register3.js
const app = getApp()
const util = require("../../utils/util.js")
var i;

var only_num;
var form_data;
var formdate ='2016-09-01';
var formlocation ='美国';
var formmarker ='左上';
Page({
  data: {
    //用于控制匿名提交
    showOrHidden: false,
    //用于表单清空
    form_info:'',
    //单选框内容
    marker: ['左上', '左下', '右上', '右下'],
    array: ['美国', '中国', '巴西', '日本'],
    //控制地图展示
    modalHidden: true,
    tempFilePaths: [],
    percent: 0,
    //返回的主键id
    p_id:0,
    //max num
    maxImages: 9,
    isMaxImagesNum: false,
    num:0,
    in_percent: false,
    //上传的图片
    img_arr:[],
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0,
    markerindex: 0,
    date: '2016-09-01',
    
  },
  //
  //设置标记位置
  bindMarkerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    //formmarker = this.marker[e.detail.value]
    this.setData({
      markerindex: e.detail.value
    })
  },
  //设置选择区域
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    //formlocation = this.array[e.detail.value.l]
    this.setData({
      index: e.detail.value
    })
  },
  //switch事件
  switch1Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    this.setData({
      showOrHidden: e.detail.value
    })

  },
  //日期选择器
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    //formdate = e.detail.value;
    this.setData({
      date: e.detail.value
    })
  },
  // 预览所选图片
  selImagePre: function (e) {
    let _this = this;
    wx.previewImage({
      urls: this.data.img_arr,
      current: e.currentTarget.dataset.src
    })
  },
  //预览地图
  buttonTap: function () {
    this.setData({
      modalHidden: false
    })
  },

  /**
   * 点击取消
   */
  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  /**
   *  点击确认
   */
  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  // 上传
  upimg: function () {
    
    var that = this;
   
    if (that.data.img_arr.length < 9) {
      wx.chooseImage({
        
        sizeType: ['original', 'compressed'],
        sourceType: ['album','camera'],
        success: function (res) {
         
          
          that.setData({
            
            img_arr: that.data.img_arr.concat(res.tempFilePaths),
            num:that.data.img_arr.length
          })
          
          
            
        }
      })
    } else {
      wx.showToast({
        title: '最多上传9张图片',
        icon: 'loading',
        duration: 2000
      });
    }
  },
  //图片删除
  deleteImage: function (e) {
    var that = this;
    var images = that.data.img_arr;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          images.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          img_arr: images
        });
      }
    })
  },

 //重置
  Reset: function (e) {

    console.log(123)
    var that = this;
    that.setData({
     
      img_arr: [],
      form_info: ''
    })
  },

  //POST
  formSubmit: function (e) {
    var that = this;
    form_data = e.detail.value;
    //console.log(form_data);
    //console.log(e.detail.value);
    if (e.detail.value.name.length == 0 || e.detail.value.name.length >= 8) {

      wx.showToast({

        title: '姓名不能为空或过长!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function () {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.num.length == 0) {

      wx.showToast({

        title: '性别不能为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function () {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.phone.length == 0) {

      wx.showToast({

        title: '手机号不能为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function () {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.type.length == 0) {

      wx.showToast({

        title: '品种不能为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function () {

        wx.hideToast()

      }, 2000)

    } else {
      //可以成功上传
      //先上传表单
      wx.request({
        url: 'https://yqt.infobigdata.com/upload/form',
        //url: 'https://22937ni921.51mypc.cn/upload/form',
        data: {
          name:e.detail.value.name,
          phone:e.detail.value.phone,
          num: e.detail.value.num,
          type: e.detail.value.type,
          fun: e.detail.value.fun,
          date: e.detail.value.dating,
          location: this.data.array[e.detail.value.arraying],
          marker: this.data.marker[e.detail.value.markering],
        }
        ,
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data.msg)
         // wx.showModal({
            //title: '提示',
            //content: '提交成功!',
          //})
          //得到返回的主键id
          //that.setData({
            //p_id:res.id,
          //})
          //再继续上传图片
          that.upload(res.data.id)
          
         
        },
        fail:function(res){
          wx.showModal({
            title: '提示',
            content: '提交失败,请重新提交!',
          })

        }
      })
      //this.upload()
    }

     
    
  },

  upload: function (id) {
    var that = this
    var imgfile;
    for (var i = 0; i < this.data.img_arr.length; i++) {//循环遍历图片 
      wx.uploadFile({
        url: 'https://yqt.infobigdata.com/upload/testimage',//自己的接口地址
        //url: 'https://22937ni921.51mypc.cn/upload/testimage',
        filePath: that.data.img_arr[i],
        name: 'content',
        header: {
          "Content-Type": "multipart/form-data",
          'accept': 'application/json',
          'Authorization': 'okgoodit'//若有token，此处换上你的token，没有的话省略
        },
        formData: ({//上传图片所要携带的参数
          imgindex:i+1,
          pid:id,
        }),
        success: function (res) {
          that.setData({
            img_arr: [],
            form_info:''
          })
         
            wx.showToast({
              title: '已提交发布！',
              duration: 3000
            });
          
        },
        fail:function(res){
          wx.showToast({
            title: '发布失败！',
            duration: 3000
          });
        }
      })
    }
   
  },





  upconfirm: function () {
    this.up();
  },
  up: function () {
    var that = this;
    var data= form_data;

    data.openid = app.openid
    data.program_id = app.program_id
    data.only_num = only_num
     
    wx.uploadFile({
      url: 'https://6a41b37d.ngrok.io/upload/picture',
      filePath: that.data.img_arr[i],
      name: 'image', //文件对应的参数名字(key)
      formData: data,  //其它的表单信息
      success: function (res) {

      }, complete: function (complete) {
        console.log(complete)
        i++
        if (i == that.data.img_arr.length) {
          
          wx.request('https://sz800800.cn/pg.php/Aishen/uploade_photo_r', 'post', { 'only_num': only_num }, '正在加载数据', function (res) {
            console.log(res)
            if (res.data.state == 1) {
              wx.showModal({
                title: '提示',
                content: '提交成功!',
                success: function (res) {
                  that.onLoad()
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '提交失败,请重新提交!',
              })
            }
          })
        } else if (i < that.data.img_arr.length) {//若图片还没有传完，则继续调用函数
          that.up()
        }
      }
    })
  },

  onLoad: function (options) {

  },
  onShow: function () {
    only_num = 'jt' + Math.round(new Date() / 1000);
    i = 0
  },
  onReachBottom: function (e) {
    console.log(e)
  },
  onShareAppMessage: function () {

  },
  psw_1: function (e) {
    psw_vaule[0] = e.detail.value
  },
  psw_2: function (e) {
    psw_vaule[1] = e.detail.value
  }
})
