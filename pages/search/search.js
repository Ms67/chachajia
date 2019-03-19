// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData(options)
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

//搜索
  initListData(city, year, mon, num) {

    // console.log(
    //   {
    //     city: city,
    //     year:year,
    //     mon:mon,
    //     num:num
    //   }
    // );

    var that = this
    const db = wx.cloud.database();
    db.collection('vipdata').where({
      city: city,
      year: parseInt(year),
      mon: mon
    }).skip(num)
      .get({
        success(res) {
          // res.data 是包含以上定义的两条记录的数组
          //console.log('success')
          // console.log(res)
          if (that.data.listNum == 0) {
            that.setData({
              listData: res.data,
              listNum:20
            })
          } else {
            that.setData({
              listData: that.data.listData.concat(res.data),
              listNum: that.data.listNum+20
            })
          }

        },
        fail(res) {
          console.log('获取数据出错')
        }
      });

  },

})