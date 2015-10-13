# ng-lazy-module-seed（Angularjs 异步模块加载项目模板）

相信做过SPA项目的朋友都遇到过这个问题：页面初始化时需要加载文件太大或太多了，许多文件加载后很可能不会运行到，这是赤裸裸的资源浪费。从性能角度出发，理想的 SPA 应该是：**按需加载**。
实现资源按需加载的方式有很多，不过在**angular 1.x**环境下存在这样一个问题：angular默认的模块化机制(使用`angular.module`实现)需要在bootstrap前完成加载、注册，否则会报*找不到provider*。幸运的是，[ocLazyLoad][ocLazyLoad]通过重写`angular.module`函数，解决了上述问题，所以，我们可以大胆放心的使用[ocLazyLoad][ocLazyLoad]进行异步模块化开发了。
在此分享一个基于 `requirejs + angularjs + ocLazyload` 的 **Angularjs 异步模块加载项目模板**。
---
### 	技术栈
模板中主要用到如下技术：
* 	scss, compass
* 	require.js, angularjs, ocLazyLoad, r.js 
* 	gulp, bower

### 	运行项目
运行项目模板，查看demo，在已安装`bower, node`的前提下请运行如下命令：
```bash
bower install
npm install
```
现在，依赖已经安装完毕，接下来可执行打包：
```bash
gulp -a
```
或者直接进行开发：
```bash
gulp watch
```
就可以看到页面了

### 	项目文件夹结构
* 	.r :require 打包相关代码
* 	app :用于存放开发代码
* 	dist :用于存放生产环境代码

### 	gulp 命令
```bash 
// 开发环境
gulp watch
// 打包
gulp -a
// 部分打包
gulp 
```

# 详细说明，后续补充

[ocLazyLoad]: https://oclazyload.readme.io/docs "angular 下的资源异步加载框架"
