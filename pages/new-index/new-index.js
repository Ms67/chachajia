var app = getApp();

var cityData = require('../../utils/citydata.js');

const citys = {
  '2019年': ['1月份', '2月份', '3月份', '4月份', '5月份', '6月份', '7月份', '8月份', '9月份', '10月份', '11月份', '12月份'],
  '2018年': ['1月份', '2月份', '3月份', '4月份', '5月份', '6月份', '7月份', '8月份', '9月份', '10月份', '11月份', '12月份']
};

import Toast from '../../utils/dist/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    invalue: '',
    imgUrls: [
      '/images/banner1.jpg',
      '/images/banner1.jpg',
      '/images/banner1.jpg',
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    listData: [{
        "code": "荷花玉兰方法",
        "text": "米径5cm 自然高250-300cm 枝下高100-150cm 冠幅100-150cm 土球直径50cm",
        "date": "74130",
        "unit": "元/㎡"
      },
      {
        "code": "彩叶朱槿",
        "text": "球形自然高度80cm 冠幅60cm 容器苗",
        "date": "50",
        "unit": "元/袋"
      },

      {
        "code": "荷花玉兰方法丰富",
        "text": "米径5cm 自然高250-300cm 枝下高100-150cm 冠幅100-150cm 土球直径50cm",
        "date": "4130",
        "unit": "元/㎡"
      },
      {
        "code": "荷花玉兰方法丰富",
        "text": "米径5cm 自然高250-300cm 枝下高100-150cm 冠幅100-150cm 土球直径50cm",
        "date": "4130",
        "unit": "元/㎡"
      },
      {
        "code": "荷花玉兰方法",
        "text": "米径5cm 自然高250-300cm 枝下高100-150cm 冠幅100-150cm 土球直径50cm",
        "date": "74130",
        "unit": "元/㎡"
      },
      {
        "code": "彩叶朱槿",
        "text": "球形自然高度80cm 冠幅60cm 容器苗",
        "date": "50",
        "unit": "元/袋"
      },

      {
        "code": "荷花玉兰方法丰富",
        "text": "米径5cm 自然高250-300cm 枝下高100-150cm 冠幅100-150cm 土球直径50cm",
        "date": "4130",
        "unit": "元/㎡"
      },
      {
        "code": "荷花玉兰方法丰富",
        "text": "米径5cm 自然高250-300cm 枝下高100-150cm 冠幅100-150cm 土球直径50cm",
        "date": "4130",
        "unit": "元/㎡"
      },
      {
        "code": "荷花玉兰方法",
        "text": "米径5cm 自然高250-300cm 枝下高100-150cm 冠幅100-150cm 土球直径50cm",
        "date": "74130",
        "unit": "元/㎡"
      },
      {
        "code": "彩叶朱槿",
        "text": "球形自然高度80cm 冠幅60cm 容器苗",
        "date": "50",
        "unit": "元/袋"
      },

      {
        "code": "荷花玉兰方法丰富",
        "text": "米径5cm 自然高250-300cm 枝下高100-150cm 冠幅100-150cm 土球直径50cm",
        "date": "4130",
        "unit": "元/㎡"
      },
      {
        "code": "荷花玉兰方法丰富",
        "text": "米径5cm 自然高250-300cm 枝下高100-150cm 冠幅100-150cm 土球直径50cm",
        "date": "4130",
        "unit": "元/㎡"
      },
      {
        "code": "荷花玉兰方法",
        "text": "米径5cm 自然高250-300cm 枝下高100-150cm 冠幅100-150cm 土球直径50cm",
        "date": "74130",
        "unit": "元/㎡"
      },
      {
        "code": "彩叶朱槿",
        "text": "球形自然高度80cm 冠幅60cm 容器苗",
        "date": "50",
        "unit": "元/袋"
      },

      {
        "code": "荷花玉兰方法丰富",
        "text": "米径5cm 自然高250-300cm 枝下高100-150cm 冠幅100-150cm 土球直径50cm",
        "date": "4130",
        "unit": "元/㎡"
      },
      {
        "code": "荷花玉兰方法丰富",
        "text": "米径5cm 自然高250-300cm 枝下高100-150cm 冠幅100-150cm 土球直径50cm",
        "date": "4130",
        "unit": "元/㎡"
      },
      {
        "code": "荷花玉兰方法",
        "text": "米径5cm 自然高250-300cm 枝下高100-150cm 冠幅100-150cm 土球直径50cm",
        "date": "74130",
        "unit": "元/㎡"
      },
      {
        "code": "彩叶朱槿",
        "text": "球形自然高度80cm 冠幅60cm 容器苗",
        "date": "50",
        "unit": "元/袋"
      },

      {
        "code": "荷花玉兰方法丰富",
        "text": "米径5cm 自然高250-300cm 枝下高100-150cm 冠幅100-150cm 土球直径50cm",
        "date": "4130",
        "unit": "元/㎡"
      },
      {
        "code": "荷花玉兰方法丰富",
        "text": "米径5cm 自然高250-300cm 枝下高100-150cm 冠幅100-150cm 土球直径50cm",
        "date": "4130",
        "unit": "元/㎡"
      },
    ],

    citysData: cityData.citysData,
    provinces: [],
    citys: [],
    areas: [],
    value: [0, 0, 0],
    name: '',
    initCity:'深圳市',
    initLocation:'广东省-深圳市',

    show: false,

    //时间选择器数据
    columns: [
      {
        values: Object.keys(citys),
        className: 'column1'
      },
      {
        values: citys['2019年'],
        className: 'column2',
        defaultIndex: 2
      }
    ],
    initYear:'2018年',
    initMonth:'12月份',
    timeShow:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initData();
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
  onlocalTap: function() {
    this.setData({ show: true });
  },

  initData: function () {
    var provinces = [];
    var citys = [];
    var areas = [];

    this.data.citysData.forEach(function (province, i) {
      provinces.push(province.name);
      if (i === 0) {
        citys.push(province.citys[i].name);
        areas = province.citys[i].areas;
      }
    });

    this.setData({
      provinces: provinces,
      citys: citys,
      areas: areas
    });
  },

  bindChange: function (e) {
    var citysData = this.data.citysData;
    var value = this.data.value;
    var current_value = e.detail.value;
    var citys = [];

    var provinceObj = {};
    var cityObj = {};

    provinceObj = citysData[current_value[0]];

    if (value[0] !== current_value[0]) {
      // 滑动省份
      provinceObj.citys.forEach(function (v) {
        citys.push(v.name);
      });
      this.setData({
        citys: citys
      });

      cityObj = provinceObj.citys[0];
      this.setData({
        areas: cityObj.areas,
        value: [current_value[0], 0, 0]
      });

    } else if (value[0] === current_value[0] && value[1] !== current_value[1]) {
      // 滑动城市
      if (current_value[1] >= provinceObj.citys.length) {
        // 数据不存在 跳过
        return;
      }
      cityObj = provinceObj.citys[current_value[1]];
      this.setData({
        areas: cityObj.areas,
        value: [current_value[0], current_value[1], 0]
      });
    } else {
      // 滑动区县
      cityObj = provinceObj.citys[current_value[1]];
      this.setData({
        value: current_value
      });
    }

    this.setData({
      name: provinceObj.name + '-' + cityObj.name + '-' + cityObj.areas[this.data.value[2]],
      initCity: cityObj.name,
      initLocation: provinceObj.name + '-' + cityObj.name
    });
  },

//地区选择关闭层事件
  onClose() {
    this.setData({ show: false });
  },
 //时间选择器滑动事件
  onTimeChange(event) {
    const { picker, value, index } = event.detail;
    picker.setColumnValues(1, citys[value[0]]);
    //console.log(value)
    this.setData({ initYear: value[0],initMonth:value[1] });
  },
  //时间选择弹出事件
  onTabTime: function () {
    this.setData({ timeShow: true });
  },
  //时间选择关闭层事件
  onTimeClose() {
    this.setData({ timeShow: false });
  },
  //点击进入材价详情页面
  enterDetail(e){
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },

  //搜索事件
  onSearch(e){
    console.log(e.detail);
    wx.navigateTo({
      url: '/pages/search/search',
    })
  }
})