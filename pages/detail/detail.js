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
    wx.showLoading({
      title: '数据加载中',
    });
    //根据id查询详细数据
    this.searchById(this.data.clid);
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
    db.collection('newvip2').where({
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

        );
        wx.hideLoading()
      },
      fail(res) {
        console.log('获取数据出错');
        wx.hideLoading()
      }
    })
  },

  //点击收藏事件
  onTabStar() {
    var that = this;
    if (!this.data.isStared) {//原来没有收藏,点击后收藏
      var tempData = [];
      try {
        const value = wx.getStorageSync('star')
        if (value) {
          tempData = value
          tempData.push(that.data.fullData)
        }
      } catch (e) {
        // Do something when catch error
      }
      // console.log('最后出来的的元组')
      // console.log(tempData);

      try {
        wx.setStorageSync('star', tempData)
      } catch (e) { };

      that.setData({
        isStared: !this.data.isStared
      });
      wx.showToast({
        title:  '收藏成功',
        icon: 'success',
        duration: 2000
      })
    }else{//已经收藏.点击取消收藏
      var tempData = [];

      try {
        const value = wx.getStorageSync('star')
        if (value) {
          tempData=value
          for (var i = 0; i < value.length; i++) {
            if (tempData[i]['_id'] == that.data.clid) {
              tempData.splice(i, 1)
            }
          };
         
        }
      } catch (e) {
        // Do something when catch error
      }
      try {
        wx.setStorageSync('star', tempData)
      } catch (e) { };

      that.setData({
        isStared: !this.data.isStared
      });
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        duration: 2000
      })      
    }
  },

  //初始化页面时 判断收藏夹中是否包含该调数据
  isStaredOrNot() {
    var that = this;
    that.setData({
      isStared: false
    })
    try {
      const value = wx.getStorageSync('star')
      // console.log(value)
      if (value) {
        for(var i=0;i<value.length;i++){
          
          if (value[i]['_id'] == that.data.clid){
            that.setData({
              isStared:true
            })
          }
        }
      }
    } catch (e) {
      // Do something when catch error
    }

  }
    
})