/*
 * @Author: your name
 * @Date: 2020-12-02 15:53:39
 * @LastEditTime: 2020-12-17 17:45:28
 * @LastEditors: shiao
 * @Description: In User Settings Edit
 * @FilePath: \o2o-appd:\石奥\timesz-components\src\lib\TimeszUploadfile\index.js
 */
//  TimeszUploadfile 是对应组件的名字，要记得在 TimeszUploadfile.vue 文件中还是 name 属性哦
import TimeszUploadfile from './TimeszUploadfile.vue';
TimeszUploadfile.install = Vue => Vue.component(TimeszUploadfile.name, TimeszUploadfile);
export default TimeszUploadfile;