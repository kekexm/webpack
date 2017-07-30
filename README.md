####################webpack small demo#########################

//https://www.npmjs.com/package/extract-text-webpack-plugin   css分离教程

//http://www.css88.com/doc/webpack2/plugins/extract-text-webpack-plugin/  中文版

//https://github.com/lcxfs1991/blog/issues/2  优化


###############################操作说明######################################

npm install

本地开发：npm run dev   修改文件自动刷新

线上发布：npm run build  生成dist打包好的文件


**************************第一部分：入口文件以及第三方公共库********************************

entry: {

		app: path.resolve(__dirname, './src/index.js'),//入口文件自己手写的  生成app.js

		vendor: ['jquery', 'mustache','bootstrap-loader','angular'] //提取第三方公共库 全局引入

		//jquery mustache angular都是npm install安装的  但是bootstrap 不行，全局引入失败
		
	},


全局引入jquery的方法https://github.com/Wscats/webpack/issues/6  

http://blog.csdn.net/tanhao_282700/article/details/68955607

再加一行这个代码

new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', jquery: 'jquery','window.jQuery': 'jquery' }),


**************************对于bootstrap的引入####################

 不能像jquery那样  应该 用bootstrap-loader  

安装步骤如下：（由于安装node-sass失败，所以采用静态资源的方式。）

# 第1步安装bootstrap-loader

npm install bootstrap-loader --save

# 第2步 如果你使用的是Bootstrap3

npm install bootstrap-sass --save

#如果你使用的是Bootstrap4

npm install bootstrap@v4.0.0-alpha.2 --save

# 我发现npm下载不了bootstrap4,所以我是从网上下载下来的，然后放到

# node_modules下的,下载地址http://v4.bootcss.com/getting-started/download/

# 第四步 安装其他样式处理loader

npm install css-loader node-sass resolve-url-loader sass-loader style-loader url-loader --save

# 如果你使用的是Bootstrap 4,可能会需要

npm install postcss-loader --save

# 我的提示没有 flie-loader，所以我安装了  flie-loader

npm install  flie-loader --save


##当然也可以引入本地静态bootstrap： bts: __dirname + "/src/static/bootstrap/js/bootstrap.min.js"//

引入本地静态bootstrap   vendor: ['jquery', 'mustache','bts','angular'] 

在入口index.js  引入css import './static/bootstrap/css/bootstrap.min.css';这种方式也能实现

*******************同样的方式也可以静态引入jquery或者jquery插件********************

import './plugin/jqplugin/css/grumble.min.css';//jquery插件 静态

import './plugin/jqplugin/js/jquery.grumble.min.js';

*******************************css样式问题**********************************

用postcss-loader 处理 加上浏览器版本

importLoaders=1 处理css页面里面的@import进来的文件也进行postcss处理

loader: 'style-loader!css-loader?importLoaders=1!postcss-loader'

loader: 'style!css!postcss!sass'

###############################其他详细内容请看webapck.config.js############################################