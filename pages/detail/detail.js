// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options);
    //存储id数据
    this.setData(options);
    //根据id查询详细数据
    this.searchById(this.data.id);
    //查询该条数据是否被收藏
    this.isStaredOrNot()
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
  //根据id获取材料详细信息
  searchById(id) {
    var that = this
    const db = wx.cloud.database();
    db.collection('vipdata').where({
      _id: id,
    }).get({
      success(res) {
        // console.log(res.data)
        that.setData(
          res.data[0]
        );
        that.setData({
            fullData: res.data[0]
          }

        )
      },
      fail(res) {
        console.log('获取数据出错')
      }
    })
  },

  //点击收藏事件
  onTabStar() {
    var that = this
    if (this.data.isStared) {
      that.setData({
        isStared: !this.data.isStared
      })
      wx.showToast({
        title: this.data.isStared ? '收藏成功' : "取消收藏成功",
        icon: 'success',
        duration: 2000
      })
    }
  },

  // //初始化页面时 判断收藏夹中是否包含该调数据
  // isStaredOrNot() {
  //   var that = this
  //   wx.getStorage({
  //       key: 'star',
  //       success(res) {
  //         if (JSON.stringify(res).indexOf(JSON.stringify(that.data.fullData) > -1) {
  //             that.setData({
  //               isStared: true
  //             })
  //           } else {
  //             that.setData({
  //               isStared: false
  //             })
  //           }
  //         }
  //       })

  // }
  //   }
})