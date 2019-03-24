// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listNum: 0,
    isend:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    this.setData(options);
    this.initSearchListData(this.data.keyword, this.data.city, this.data.year, this.data.mon, this.data.listNum)
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

  //搜索
  //更新数据函数
  initSearchListData(keyword,city, year, mon, num) {

    // console.log({
    //   city: city,
    //   year: year,
    //   mon: mon,
    //   num: num
    // });

    var that = this
    const db = wx.cloud.database();
    db.collection('newvip2').where({
        name: { $regex: keyword, $options: "$i" },
        city: city,
        year: parseInt(year),
        mon: mon
      }).skip(num)
      .get({
        success(res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log('success')
          console.log(res)
          if (that.data.listNum == 0) {
   
            that.setData({
              listData: res.data,
              listNum: res.data.length
            })
          } else {
            that.setData({
              listData: that.data.listData.concat(res.data),
              listNum: that.data.listNum + res.data.length
            });
            if (res.data.length == 0){
              that.setData({ isend:true})
            }
          }
        },
        fail(res) {
          console.log('获取数据出错')
        }
      });
  },
  onLower(){
    this.initSearchListData(this.data.keyword, this.data.city, this.data.year, this.data.mon, this.data.listNum)
  },
  
  //点击进入材价详情页面
  enterDetail(e) {
    // console.log(e);
    wx.navigateTo({
      url: '/pages/detail/detail?clid=' + e.target.dataset.id,
    })
  },
})