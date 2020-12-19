<template>
<!--
 * @Author: shiao
 * @Date: 020.08.27 23：47：59
 * @LastEditTime: 2020-12-16 14:02:43
 * @LastEditors: shiao
 * @Description: TimeszPagination 分页组件
-->
  <!-- 注释 -->

  <!-- 说明
      TimeszPagination 分页组件
      分页器代码在很久前就写完了，文档和注释是近3个后完善的，部分功能限制（例如：快速跳转超过16页码默认3个）后续会完善。
      文档日期：2020.08.27 23：47：59
   -->

  <!-- 设计初衷：
      提供一个可以完全自定义的分页器
   -->

  <!-- 提供的功能:
      自定义左右的滚动按钮文字；
      自定义左右的滚动按钮是否显示；
      自定义左右快捷挑战的按钮数量，当页码大于16默认跳转3个，也就是...，点击后会向左向右挑战默认的按钮，需要页码大于等于10才会触发；
      自定义分页里的每一个样式，完全可以修改，并不会影响功能；
      自定义编辑器的背景颜色，便于不同背景的环境下使用，快捷样式传参 style；
   -->

  <!-- 目前遗留的问题：
   -->
  <!-- 未标识字段补充：
   pagenum ： 循环出来的页面数字
    -->
  <div :style="paginationstyle" class="Timesz_Pagination_body">
    <div v-show="paginationnum > 0" class="Pagination_div">
      <span v-show="leftbtnshow && paginationnum > 1" class="leftbtn" @click="leftbtntmove">{{ leftbtntext }}</span>
      <div v-for="(pagenum,i) in paginationnum" :key="i" class="page_div">
        <span v-show="pagestart < pagenum && pagenum <= pageendnum && pagenum != pagerigtnum || pagenum == 1 || pagenum == paginationnum" :style="Paginatiopage == pagenum ? {'background-color':btn_bgcolor_activate} : ''" :class="Paginatiopage == pagenum ? 'pageactivate pagenum' : 'pagenum'" @click="changepage(pagenum)">{{ pagenum }}</span>
        <span v-show="pagenum == paginationnum - 1 && pagerigtnum == paginationnum - 1" class="pagenum" :style="Paginatiopage == pagenum ? {'background-color':btn_bgcolor_activate} : ''" @click="changepage(pagenum)">{{ pagenum }}</span>
        <span v-show="pagenum == 2 && leftdointshow" class="pagedoint" @click="leftdointmove">···</span>
        <span
          v-show="pagenum == pagerigtnum && pagerigtnum != paginationnum && pagerigtnum != (paginationnum - 1)"
          class="pagedoint"
          @click="rightdointmove"
        >···</span>
      </div>
      <span v-show="rightbtnshow && paginationnum > 1" class="pagedoint" @click="rightbtntmove">{{ rightbtntext }}</span>
    </div>
    <!-- <div style="margin-top:5px">
      <span>每页 <input class="timesz-page-input" type="text"> 条</span><span class="timeszPagination-bottom-tip">当前 {{ page }} /共 {{ paginationnum }} 页</span>
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'TimeszPagination',
  props: {
    pagestart: { // 页码除了第一页左边开始显示的起点,左边...起点
      type: Number,
      default: 1
    },
    pageendnum: { // 页码显示的结尾（在右边...前面的结点）
      type: Number,
      default: 9
    },
    paginationnum: { // 总页码数
      type: Number,
      required: true
    },
    Paginatiopage: { // 当前的页码和页码选中的指针
      type: Number,
      required:true
    },
    movenum: { // ...省略多少个页码，左右快捷跳转的数量
      type: Number,
      default: 4
    },
    leftbtnshow: { // 左边按钮是否显示
      type: Boolean,
      default: false
    },
    rightbtnshow: {// 右边边按钮是否显示
      type: Boolean,
      default: false
    },
    leftbtntext: {// 左边边按钮显示文本
      type: String,
      default: '<'
    },
    rightbtntext: {// 右边边按钮显示文本
      type: String,
      default: '>'
    },
    paginationstyle: { // 编辑器的外层样式
      type: Object,
      default() {
        return {
          'background-color': 'transparent'
        }
      }
    },
    btn_bgcolor_activate:{// 按钮高亮的颜色
      type: String,
      default: '#1c8cdc'
    },
  },
  data() {
    return {
      leftdointshow: false,
      rightdointshow: false,
      moveleft: true,
      moveright: true,
      pagerigtnum: 10,// 默认初始化是10，只是向右移动后真实位置（右边...的所在位置）
    }
  },
  methods: {
    leftbtntmove() {
      let  leftPaginatiopage = this.Paginatiopage
      if (leftPaginatiopage >= 2) {
        if (leftPaginatiopage == this.pagestart + 1 && leftPaginatiopage != 2) {
          this.leftdointmove()
        }
        leftPaginatiopage -= 1
        this.$emit('getpage', leftPaginatiopage)
      }
    },
    rightbtntmove() {
      let rightPaginatiopage = this.Paginatiopage
      if (rightPaginatiopage < this.paginationnum) {
        if (rightPaginatiopage == this.pageendnum && rightPaginatiopage + 1 != this.paginationnum - 1) {
          this.rightdointmove()
        }
        rightPaginatiopage += 1
        this.$emit('getpage', rightPaginatiopage)
      }
    },
    rightdointmove() {
      this.pagerigtnum += 3
      if (this.pagerigtnum >= 16) {
        this.movenum = 3
      }
      if (this.pagerigtnum - this.paginationnum > 0) {
        this.movenum = this.pagerigtnum - this.paginationnum
      }
      this.pagestart += this.movenum
      this.leftdointshow = true
      this.pageendnum = this.pagerigtnum - 1
      if (this.pageendnum == this.paginationnum - 1) {
        this.pageendnum == this.paginationnum
      }
    },
    leftdointmove() {
      if (this.moveleft) {
        this.moveleft = false
        if (this.pagerigtnum < this.paginationnum) {
          this.movenum = 3
        }
        this.pagerigtnum -= 3
        if (this.pagerigtnum > 10) {
          this.leftdointshow = true
        } else {
          this.leftdointshow = false
        }
        if (this.pagestart == 5) {
          this.movenum = 4
        }
        this.pagestart -= this.movenum
        this.pageendnum = this.pagerigtnum - 1
        this.moveleft = true
      }
    },
    changepage(num) {
      if (this.Paginatiopage != num) {
        this.$emit('getpage', num)
      }
    }
  }
}
</script>
<style scoped lang="scss">

$btn_color: #fff;
$btn_bgcolor: #ccc;
// $btn_bgcolor_activate : #1c8cdc;
.Pagination_div {
  min-width: 712px;
  min-height: 36px;
  margin: 0 auto;
  text-align: center;
  -webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
  user-select: none;
  .page_div {
    display: inline-block;
  }
  .pagenum,.pagedoint,.leftbtn {
    background-color: $btn_bgcolor;
    color: $btn_color;
    width: 36px;
    height: 36px;
    padding: 8px;
    border-radius: 17px;
    display: inline-block;
    margin: 0 9px;
    line-height: 17px;
    cursor: pointer;
  }
  .pageactivate {
    // background-color: $btn_bgcolor_activate;
  }
}
.timeszPagination-bottom-tip{
    width: 129px;
    display: inline-block;
    color: #717171;
}
.timesz-page-input{
  width: 40px;
}

</style>
