<template>
  <div>
    <div class="common-pup-view" v-show="pupShow" :style="TimszPupBgStyle">
      <div class="common-pup-mask">
        <div class="common-pup-content" :style="TimszPupStyle">
          <div class="common-pup-title" v-show="pupTitle">{{ pupTitle }}</div>
          <div class="common-pup-item" v-show="pupContent">{{ pupContent }}</div>
          <div class="common-pup-btn" v-show="cancelshow || certainshow">
            <div class="cancel-btn" @click="cancel" v-show="cancelshow" :style="{'color':cancelColor}">{{canceltext}}</div>
            <div class="certain-btn" @click="certain" v-show="certainshow" :style="{'color':certainColor}">{{certaintext}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TimeszPup",
  props: {
    pupTitle: {
      //标题
      type: String,
      default: "",
    },
    pupContent: {
      //内容
      type: String,
      default: "",
    },
    pupShow: {
      //通知窗是否显示
      type: Boolean,
      default: false,
    },
    btndisabled: {
      //是否在点击按钮是自动关闭弹窗
      type: Boolean,
      default: true,
    },
    certaintext: {
      //确定按钮文本
      type: String,
      default: '确定',
    },
    canceltext: {
      //取消按钮文本
      type: String,
      default: '取消',
    },
    certainshow: {
      //确定按钮是否显示
      type: Boolean,
      default: true,
    },
    cancelshow: {
      //取消按钮是否显示
      type: Boolean,
      default: true,
    },
    cancelColor: {
      //取消文本颜色
      type: String,
      default: '#333333',
    },
    certainColor: {
      //确认文本颜色
      type: String,
      default: '#3a73f3',
    },
    TimszPupBgStyle: {
      //弹窗背景样式
      type: Object,
      default() {
        return {
          "background-color": "rgba(000, 000, 000, 0.6)",
        };
      },
    },
    TimszPupStyle: {
      //弹窗样式
      type: Object,
      default() {
        return {
          "background-color": "#ffffff",
        };
      },
    },
  },
  mounted(){
     document.getElementsByTagName("body")[0].className="timesz-pup-fixed";
  },
  methods: {
    certain() {
      document.getElementsByTagName("body")[0].className="";
      if (this.btndisabled) {
        this.$emit("update:pupShow", false);
      }
      this.$emit("certain");
    },
    cancel() {
      document.getElementsByTagName("body")[0].className="";
      if (this.btndisabled) {
        this.$emit("update:pupShow", false);
      }
      this.$emit("cancel");
    },
  },
};
</script>
<style >
.timesz-pup-fixed{
  overflow: hidden;
}
</style>
<style scoped lang='scss'>
.common-pup-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  overflow: auto;
  .common-pup-mask {
    background-color: rgba(000, 000, 000, 0.6);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .common-pup-content {
    background-color: #ffffff;
    width: 550px;
    border-radius: 6px;
    overflow: hidden;
    .common-pup-title {
      width: 100%;
      height: 90px;
      font-size: 36px;
      font-weight: 500;
      color: #333333;
      line-height: 50px;
      padding: 20px 24px;
      text-align: center;
    }
    .common-pup-item {
      padding: 20px 26px;
    }
    .common-pup-btn {
      border-top: 1px solid #e5e5e5;
      display: flex;
      height: 49px;
      cursor: pointer;
      .cancel-btn,
      .certain-btn {
        font-size: 17px;
        width: 230px;
        height: 49px;
        line-height: 28px;
        text-align: center;
      }
      .cancel-btn {
        width: 265px;
        font-weight: 400;
        padding: 13px 51px 12px;
        border-right: 1px solid #e5e5e5;
      }
      .certain-btn {
        flex: 1;
        text-align: center;
        font-weight: 500;
        padding: 13px 13px 10px 12px;
      }
    }
  }
}
</style>
