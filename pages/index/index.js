/*
 ** 省市区 - 收货地址 js
 ** www.meizhuangdaka.com
 ** 省市区数据有误的话，自己改：/utils/citydata.js，开源源码
 */

//获取应用实例
var app = getApp();

var cityData = require('../../utils/citydata.js');
const times = {
  '2018': ['11月', '10月', '9月', '8月', '7月'],
  '2017': ['11月', '10月', '9月', '8月', '7月']
};
Page({
  data: {
    citysData: cityData.citysData,
    provinces: [],
    citys: [],
    areas: [],
    value: [0, 0, 0],
    name: '广东省-广州市-花都区',
    selectTime:'2018-11',
    showDis: false,
    showTime :false,
    columns: [
      {
        values: Object.keys(times),
        className: 'column1'
      },
      {
        times: times['2018'],
        className: 'column2',
        defaultIndex: 2
      }
    ]
  },

  initData: function() {
    var provinces = [];
    var citys = [];
    var areas = [];

    this.data.citysData.forEach(function(province, i) {
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
  //地区选择器联动函数
  bindChange: function(e) {
    var citysData = this.data.citysData;
    var value = this.data.value;
    var current_value = e.detail.value;
    var citys = [];

    var provinceObj = {};
    var cityObj = {};

    provinceObj = citysData[current_value[0]];

    if (value[0] !== current_value[0]) {
      // 滑动省份
      provinceObj.citys.forEach(function(v) {
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
      name: provinceObj.name + '-' + cityObj.name + '-' + cityObj.areas[this.data.value[2]]
    });
  },

  // 页面初始化事件
  onLoad: function() {
    this.initData();
  },
  //弹出地区选择器
  disClick: function() {
    this.setData({
      showDis: true
    })
  },
  //弹出时间选择器
  timeClick: function () {
    this.setData({
      showTime: true
    })
  },
  //关闭地区选择器
  onCloseDis: function() {
    this.setData({
      showDis: false
    })
  },
  //关闭时间选择器
  onCloseTime: function () {
    this.setData({
      showTime: false
    })
  },
  //时间二级联动
  onChange(event) {
    const { picker, value, index } = event.detail;
    picker.setColumnValues(1, times[values[0]]);
  }
});