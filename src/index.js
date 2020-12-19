/*
 * @Author: shiao
 * @Date: 2020-12-02 15:54:35
 * @LastEditTime: 2020-12-18 15:53:52
 * @LastEditors: shiao
 * @Description: 主导入文件配置
 * @FilePath: \o2o-appd:\石奥\timesz-components\src\index.js
 */
import TimeszPagination from './lib/TimeszPagination/index.js';
import TimeszBigimage from './lib/TimeszBigimage/index.js';
import TimeszPup from './lib/TimeszPup/index.js'
import TimeszUploadfile from './lib/TimeszUploadfile/index.js'
// ...如果还有的话继续添加
 
const components = [
  TimeszPagination,
  TimeszBigimage,
  TimeszPup,
  TimeszUploadfile
  // ...如果还有的话继续添加
]
 
const install = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  })
}
 
/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default{
  install,
  TimeszPagination,
  TimeszBigimage,
  TimeszPup,
  TimeszUploadfile
  // ...如果还有的话继续添加
}

export {
  install,
  TimeszPagination,
  TimeszBigimage,
  TimeszPup,
  TimeszUploadfile
  // ...如果还有的话继续添加
}