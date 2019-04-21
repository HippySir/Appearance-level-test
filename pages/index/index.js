//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tempFilePaths:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3060379127,3859427235&fm=26&gp=0.jpg',
    personbeauty:0,
    personage:0,
    personexpression:0,
    persongender:0,
    data:null
  },
  //事件处理函数
  // 拍摄照片或者获取图片的函数
  takephoto(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:res=> {
        // tempFilePath可以作为img标签的src属性显示图片
        // const tempFilePaths = res.tempFilePaths;
        // console.log(res);
        if ( res.tempFiles[0].size > 1024*1024){
            // 如果图片的尺寸过大那么就不能够发送请求
          wx.showToast({
            title: '图片的尺寸过大，请重新选择图片',
            icon: 'none',
            duration: 2000
            
          })
          return;
        }
        // let tempfilepath = res.tempFiles[0].path;
        this.setData({
          tempFilePaths: res.tempFiles[0].path,
        });
        console.log(this.data.tempFilePaths);
        this.uploadpictures();
      }
    })
  },
  // 上传图片的函数
  uploadpictures(){
    console.log('123');
    wx.uploadFile({
      url: 'https://ai.qq.com/cgi-bin/appdemo_detectface', 
      filePath: this.data.tempFilePaths,
      name: 'image_file',
      success:res=> {

        let data = JSON.parse(res.data);
        console.log(data);
        // let gendera = data.data.face[0].gender > 0 ? "男" : "女";
        // do something
        this.setData({
          personbeauty: data.data.face[0].beauty,
          personage: data.data.face[0].age,
          personexpression: data.data.face[0].expression,
          persongender: data.data.face[0].gender,
          data: data
        })
        
      }
    })
  }
 
})
