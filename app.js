//app.js
App({
  onLaunch: function() {
    var that = this;
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || [];
    // logs.unshift(Date.now());
    // wx.setStorageSync('logs', logs);

    that.userLogin();

  },

  userLogin: function() {
    var that = this;
    wx.login({
      success: function(res) {
        if (res.code) {
          console.log(res.code);
        }
      },
      fail: function(res) {
        console.log(res);
      }
    });
  },

  getUserInfo: function(cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          });
        }
      });
    }
  },


  globalData: {
    userInfo: null,

  }
});