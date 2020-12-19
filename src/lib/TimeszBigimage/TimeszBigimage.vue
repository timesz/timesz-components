<!--
 * @Author: shiao
 * @Date: 2020-12-08 16:37:53
 * @LastEditTime: 2020-12-17 10:01:01
 * @Description: 图片放大查看
 * @LastEditors: shiao
 * @FilePath: \o2o-appd:\石奥\timesz-components\src\lib\TimeszBigimage\index.vue
-->
<template>
  <div class="img-view" @click="closeBigImg" v-show="BigimgShow">
    <div class="img-layer">
      <div class="img">
        <img :src="BigShowImgSrc" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"TimeszBigimage",
  props: {
    BigimgSrc: {
      //父级准备显示图片地址
      type: String,
      default: "",
       required: true,
    },
    BigimgList: {
      //待放大预览图片列表
      type: Array,
      default: [],
      required: true,
    },
  },
  watch: {
    BigimgSrc(newval) {
      this.BigShowImgSrc = newval;
      if (this.BigimgList.length > 0 && this.BigShowImgSrc) {
        this.BigimgShow = true;
      }
    },
  },
  data() {
    return {
      BigimgShow: false, //放大图片是否显示
      BigShowImgSrc: "", //当前显示图片src
    };
  },
  methods: {
    //关闭图片预览
    closeBigImg() {
      this.$emit("clickit");
      this.$emit("update:BigimgSrc", "");
      this.BigShowImgSrc = "";
      this.BigimgShow = false;
    },
  },
};
</script>
<style scoped>
.img-view {
  position: fixed;
  width: 100%;
  height: 100%;
}
.img {
  width: calc(100%-100px);
  height: 100%;
  margin: auto;
}
/*遮罩层样式*/
.img-view .img-layer {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background: rgba(250, 250, 250, 1);
  width: 100%;
  height: 100%;
  overflow: hidden;
}
/*不限制图片大小，实现居中*/
.img-view .img img {
  padding: 80px 0 0;
  max-width: calc(100% - 100px);
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1000;
}
</style>
