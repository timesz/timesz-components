# timesz-components

# 安装
## npm 安装
```
npm install  timesz-components
```
# 特殊说明
> 因项目依赖sass编写样式，项目中需引入sass

> 针对服务端渲染的框架，这里以nuxt为例,需在客户端加载组件
```
if (process.client) {
    Vue.use(TimeszPagination)
    Vue.use(TimeszPup)
}
```
# 引入
### 在main.js或者项目的主入口文件中
整体引入
```
import timeszComponents from 'timesz-components';
Vue.use(timeszComponents)
```

按需引入对应的组件
```
import {TimeszPagination} from 'timesz-components';
Vue.use(TimeszPagination)
```

完整组件有
```
TimeszPagination,
TimeszBigimage,
TimeszPup,
TimeszUploadfile
```
> 如果在使用过程中遇到问题，麻烦反馈到timesz_it@163.com