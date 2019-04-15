require('./utils/v-request.js')


//app.js
App({
  onLaunch: function() {
   // 云开发的初始化
    wx.cloud.init({
      env: 'xinxijia-dev-7f7d27',
      traceUser: true
    });

    // // 判断手机存储中是否建立了收藏夹,没有则新建(该方法为异步方法,应采用同步方法)
    // wx.getStorageInfo({
    //   success(res) {
    //     if (res.keys.indexOf('star') > -1){
    //       console.log('已建立收藏夹')
    //     }else{
    //       console.log('收藏夹不存在,已新建');
    //       wx.setStorage({
    //         key: 'star',
    //         data: []
    //       })
    //     }
    //   }
    // });

    //同步判断手机存储中是否建立了收藏夹, 没有则新建
    try {
      const res = wx.getStorageInfoSync()
      if (res.keys.indexOf('star') > -1) {
        // console.log('收藏夹已存在')
      } else {
        // console.log('收藏夹不存在,已新建');
        try {
          wx.setStorageSync('star', [])
        } catch (e) { }
      }
    } catch (e) {
      // Do something when catch error
    }

  }







});