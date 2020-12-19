/*
 * @Author: your name
 * @Date: 2020-12-02 15:53:39
 * @LastEditTime: 2020-12-02 17:10:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \h5d:\石奥\timesz-components\src\lib\test\index.js
 */
//  TimeszPagination 是对应组件的名字，要记得在 TimeszPagination.vue 文件中还是 name 属性哦
import TimeszPagination from './TimeszPagination.vue';
TimeszPagination.install = Vue => Vue.component(TimeszPagination.name, TimeszPagination);
export default TimeszPagination;