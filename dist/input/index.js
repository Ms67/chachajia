// input/input.js
import rules from '../behaviors/rules';

Component({
  /**
   * 组件的属性列表
   */
  behaviors: ['wx://form-field', rules],
  externalClasses: ['l-class'],
  properties: {
    // 表单标题（label）的文本
    label: {
      type: String,
      value: ''
    },
    // 是否必选
    required: {
      type: Boolean,
      value: false
    },
    // 占位文本
    placeholder: {
      type: String,
      value: ''
    },
    // 输入框类型
    type: {
      type: String,
      value: 'text'
    },
    // 输入框的值
    value: {
      type: String,
      value: ''
    },
    // 是否需要冒号
    colon: {
      type: Boolean,
      value: false
    },
    // 获取焦点
    focus: {
      type: Boolean,
      value: false
    },
    // 是否显示清除按钮
    clear: {
      type: Boolean,
      value: false
    },
    // 最大输入长度
    maxlength: {
      type: Number,
      value: 140
    },
    // 表单项标题部分的宽度，单位rpx
    labelWidth: {
      type: Number,
      value: 200
    },
    // label标题的显示位置 left top right
    labelLayout: {
      type: String,
      value: 'left'
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false
    },


  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached() {
    this.initRules();
  },
  /**
   * 组件的方法列表
   */
  methods: {

    handleInputChange(event) {
      const {
        detail = {}
      } = event;
      const {
        value = ''
      } = detail;

      this.setData({
        value
      });

      this.triggerEvent('linchange', event);
    },

    handleInputFocus(event) {
      this.triggerEvent('linfocus', event);
    },

    handleInputBlur(event) {
      this.validatorData({
        value: event.detail.value
      });
      this.triggerEvent('linblur', event);
    },
    handleInputConfirm(event) {
      const {
        detail = {}
      } = event;
      const {
        value = ''
      } = detail;

      this.setData({
        value
      });

      this.triggerEvent('linconfirm', event);
    },
    onClearTap(event) {
      this.setData({
        value: ''
      })
      this.triggerEvent('linclear', event);
    },
  }
})