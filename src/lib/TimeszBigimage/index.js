/*
 * @Author: your name
 * @Date: 2020-12-02 15:53:39
 * @LastEditTime: 2020-12-17 09:54:05
 * @LastEditors: shiao
 * @Description: In User Settings Edit
 * @FilePath: \o2o-appd:\石奥\timesz-components\src\lib\TimeszBigimage\index.js
 */
//  TimeszBigimage 是对应组件的名字，要记得在 TimeszBigimage.vue 文件中还是 name 属性哦
import TimeszBigimage from './TimeszBigimage.vue';
TimeszBigimage.install = Vue => Vue.component(TimeszBigimage.name, TimeszBigimage);
export default TimeszBigimage;