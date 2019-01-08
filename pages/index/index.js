//获取应用实例
var app = getApp();

var cityData = require('../../utils/citydata.js');
const times = {
  '2018年': ['12月', '11月', '10月', '9月', '8月', '7月', '6月', '5月', '4月', '3月', '2月', '1月'],
  '2017年': ['12月', '11月', '10月', '9月', '8月', '7月', '6月', '5月', '4月', '3月', '2月', '1月']
};
Page({
  data: {
  
    showDis: false,
    showTime :false,
    columnsTime: [
      {
        values: Object.keys(times),
        className: 'column1'
      },
      {
        values: times['2018年'],
        className: 'column2',
        defaultIndex: 2
      }
    ],
    array:[1,2,3,4,5,6,7,8,9,10],
    xinxinTime : '2019年1月',
    selectTime:''
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
      selectTime: this.data.xinxinTime
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
  //时间选择器滑动
  onChange(event) {
    const { picker, value, index } = event.detail;
    picker.setColumnValues(1, times[value[0]]);

    this.setData({
      selectTime: value[0] + value[1]
    })
    
  },
  //时间选择器点击取消
  onTimeCancel:function(){
    this.setData({
      showTime: false
    })
  },
  onTimeConfirm:function(){

    this.setData({
      showTime: false,
      xinxinTime:this.data.selectTime
    })
    console.log('信息价更新为'+this.data.xinxinTime)
  }
});