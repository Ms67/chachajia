var app = getApp();

var cityData = require('../../utils/citydata.js');

const citys = {
  '2019年': ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
  '2018年': ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月']
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
          '/images/banner2.jpg',
          '/images/banner3.jpg',
        ],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        listData: [],

        citysData: cityData.citysData,
        provinces: [],
        citys: [],
        areas: [],
        value: [0, 0, 0],
        name: '',
        initCity: '深圳市',
        initLocation: '广东省-深圳市',

        show: false,

        //时间选择器数据
        columns: [{
            values: Object.keys(citys),
            className: 'column1'
          },
          {
            values: citys['2019年'],
            className: 'column2',
            defaultIndex: 2
          }
        ],
        initYear: '2018年',
        initMonth: '02月',
        timeShow: false,
        listNum: 0,
        isend:false 

      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
        //地区滑动菜单的函数
        this.initData();
        //更新价格内容数据
        this.initListData(this.data.initCity, this.data.initYear, this.data.initMonth, this.data.listNum);

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
        this.setData({
          show: true
        });
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
          name: provinceObj.name + '-' + cityObj.name + '-' + cityObj.areas[this.data.value[2]],
          initCity: cityObj.name,
          initLocation: provinceObj.name + '-' + cityObj.name
        });


      },

      //地区选择关闭层事件
      onClose() {
        this.setData({
          show: false,
          listNum: 0
        });
        wx.showLoading({
          title: '更新数据中',
        });

        //更新数据
        this.initListData(this.data.initCity, this.data.initYear, this.data.initMonth, this.data.listNum);
        wx.hideLoading()
      },
      //时间选择器滑动事件
      onTimeChange(event) {
        const {
          picker,
          value,
          index
        } = event.detail;
        picker.setColumnValues(1, citys[value[0]]);
        //console.log(value)
        this.setData({
          initYear: value[0],
          initMonth: value[1]
        });

      },
      //时间选择弹出事件
      onTabTime: function() {
        this.setData({
          timeShow: true
        });
      },
      //时间选择关闭层事件
      onTimeClose() {
        this.setData({
          timeShow: false,
          listNum: 0
        });
        wx.showLoading({
          title: '更新数据中',
        });
        //更新数据
        this.initListData(this.data.initCity, this.data.initYear, this.data.initMonth, this.data.listNum);
        wx.hideLoading()
      },
      //点击进入材价详情页面
      enterDetail(e) {
        // console.log(e);
        wx.navigateTo({
          url: '/pages/detail/detail?clid='+e.target.dataset.id,
        })
      },

      //搜索事件
      onSearch(e) {
        //console.log(e.detail);
        wx.navigateTo({
          url: '/pages/search/search?keyword=' + e.detail + '&city=' + this.data.initCity + '&year=' + this.data.initYear + '&mon=' + this.data.initMonth,
        })
      },

      //更新数据函数
      initListData(city, year, mon, num) {

        // console.log({
        //   city: city,
        //   year: year,
        //   mon: mon,
        //   num: num
        // });

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
                  // console.log('20')
                  that.setData({
                    listData: res.data,
                    listNum: res.data.length
                  })
                } else {
                  // console.log('+')
                  // console.log(that.data.listData)
                  that.setData({
                    listData: that.data.listData.concat(res.data),
                    listNum: that.data.listNum + res.data.length
                  });
                  if (res.data.length == 0) {
                    that.setData({ isend: true })
                  }

                }},
                fail(res) {
                  console.log('获取数据出错')
                }
              });

          },
          //滑动到底刷新数据
          onLower() {
            // console.log('low')
            //更新数据
            this.initListData(this.data.initCity, this.data.initYear, this.data.initMonth, this.data.listNum);
          }

      })