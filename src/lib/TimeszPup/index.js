/*
 * @Author: your name
 * @Date: 2020-12-02 15:53:39
 * @LastEditTime: 2020-12-17 15:28:19
 * @LastEditors: shiao
 * @Description: In User Settings Edit
 * @FilePath: \o2o-appd:\石奥\timesz-components\src\lib\TimeszPup\index.js
 */
//  TimeszPup 是对应组件的名字，要记得在 TimeszPup.vue 文件中还是 name 属性哦
import TimeszPup from './TimeszPup.vue';
TimeszPup.install = Vue => Vue.component(TimeszPup.name, TimeszPup);
export default TimeszPup;