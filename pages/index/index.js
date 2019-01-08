//获取应用实例
var app = getApp();

var cityData = require('../../utils/citydata.js');

Page({
  data: {
  
    showDis: false,
    showTime :false,

    array:[1,2,3,4,5,6,7,8,9,10],

    xinxiTime : '2019年1月',
    xinxiArea:'广东-广州市',
    
    citysData: cityData.citysData,
    provinces: [],
    citys: [],
    areas: [],
    value: [0, 0, 0],
    name: '',
   
    minDate: new Date(2016,1,1).getTime(),
    maxDate: new Date(2019, 10, 1).getTime(),
    currentDate: new Date().getTime()
    
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
      showTime: true,
      
    })
  },
  //点击蒙层关闭地区选择器
  onCloseDis: function() {
    this.setData({
      showDis: false
    })
  },
  //点击蒙层关闭时间选择器
  onCloseTime: function () {
    this.setData({
      showTime: false
    })
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
      xinxiArea: provinceObj.name + '-' + cityObj.name
    });
    console.log('信息价地区修改为:'+this.data.xinxiArea)
  },

  // 页面初始化事件
  onLoad: function () {
    this.initData();
  } ,
  
  
  time_input(value) {
    var time_str = new Date(value.detail).getFullYear() + '年' + (new Date(value.detail).getMonth() + 1) + '月'
    this.setData({ xinxiTime: time_str})
    
  },

  
  
  
});