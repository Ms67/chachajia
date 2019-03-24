// pages/user/star/star.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isStared: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    try {
      const value = wx.getStorageSync('star')
      // console.log(value)
      this.setData({
        listData: value.reverse()
      })

    } catch (e) {
      // Do something when catch error
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //点击取消收藏
  onTabStar(e) {
    var that = this

    wx.showModal({
      title: '取消收藏',
      content: '确定要取消收藏吗?',
      success(res) {
        if (res.confirm) {
          
          console.log(e.currentTarget.dataset.id)
          var key = e.currentTarget.dataset.id;
          var tempData = [];
          try {
            const value = wx.getStorageSync('star')
            if (value) {
              tempData = value
              for (var i = 0; i < value.length; i++) {
                if (tempData[i]['_id'] == key) {
                  tempData.splice(i, 1)
                }
              };
            }
          } catch (e) {
            // Do something when catch error
          }
          try {
            that.setData({
              listData: tempData
            })
            wx.setStorageSync('star', tempData)
          } catch (e) { };
          
        } else if (res.cancel) {
          
        }
      }
    })

    
  }



})