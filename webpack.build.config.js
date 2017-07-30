var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');//分离css
var ClearnPlugin = require('clean-webpack-plugin'); //每次打包前删除dist里面的文件
module.exports = {
	entry: {
		app: path.resolve(__dirname, './src/index.js'),//入口文件自己手写的  生成app.js
		vendor: ['jquery', 'mustache','bts','angular'] //提取第三方公共库 全局引入
		//jquery mustache angular都是npm install安装的  但是bootstrap 不行，全局引入失败
		//需要bootstrap-loader 才可以，具体看readme.md 说明；bts 是本地静态bootstrap
	},
	output: {
		path: __dirname + "/dist",
		// filename: 'builds/[name].[hash].js',
		filename: 'builds/[name].js',
		publicPath: ""
	},
	resolve: {
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore :  __dirname + '/src',//  路径简写  index.js页面27行
            bts: __dirname + "/src/static/bootstrap/js/bootstrap.min.js"//引入本地静态bootstrap
            
        }
    },
	plugins: [
		//new ExtractTextPlugin("styles.css"),  分离css 暂时不用
		new ClearnPlugin(['./dist']),
		new webpack.BannerPlugin('This file is created by kekexm'), //输出的头部文件添加注释信息
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'runtime']//修改会自动刷新
		}),
		new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', jquery: 'jquery','window.jQuery': 'jquery' }),//全局的jquery 
		//无需再 import 'jquery'
		//new webpack.optimize.CommonsChunkPlugin('vendor','vendor.js'),//将公共库重新设置为vendorbak.js
		new htmlWebpackPlugin({
			// filename: __dirname + "/dist/index.html", 
			// filename:'index-[hash].html',也可以使用
			template: __dirname + "/index.html", //处理当前路径的模板
			// inject:'head',//将js文件放在head里面，默认是放到body里面
			// title:'my Title',
			// date: new Date()
			minify: { //压缩代码
				collapseWhitespace: true, //删除空格
				removeComments: true //删除注释
			},
			cache: false,
			hash: true //给每个文件后面 添加?版本号
		}),
		new UglifyJSPlugin({ //压缩打包后的代码
			comments: false //压缩后没有注释
		})

	],
	// devServer: {
	// 	port: 8090,
	// 	// contentBase: "./dists",//本地服务器所加载的页面所在的目录
	// 	colors: true, //终端中输出结果为彩色
	// 	historyApiFallback: true, //不跳转
	// 	// inline: true//实时刷新
	// },
	module: {
		loaders: [{
				test: /\.js$/,
				loader: 'babel',
				// include: __dirname+'\\src',
				include: path.resolve(__dirname, 'src'), //全局的写法
				exclude: /node_modules/ //提升打包速度
					//include: path.resolve(__dirname,'src')// 说明 include 是包含的意思  需要用path.resolve函数处理  
					//返回的是目标文件的绝对路径 __dirname==D:/webpackfront/demo   再加上src   不能用__dirname+'/src' 或者用
					//__dirname+'\\src'   \\是转义字符，转为\   另外  exclude: /node_modules/ 表示除去的意思  单独用也可以
			}, {
				test: /\.scss$/,
				loader: 'style!css!postcss!sass' // 从右向左解析  sass 需要依赖node-sass  
					//当然也可以用loaders:['style','css','sass']数组方式表示
			}, {
				test: /\.html$/,
				loader: 'html'
			}, {
				test: /\.css$/,
				//loader: ExtractTextPlugin.extract("style-loader", "css-loader")//单独分离css 否则用下面的loader
				//本方法可以只能单独分离css文件，不能分离sassless，对于postcss 也不起作用，暂时不用				

				// loader: 'style-loader!css-loader!postcss-loader'//下面通过postcss 属性  添加浏览器版本
				loader: 'style-loader!css-loader?importLoaders=1!postcss-loader' //下面通过postcss 属性  
					//添加浏览器版本 参数importLoaders=1
					// 可以处理css文件 利用@import 进来的文件也进行postcss处理
			}, {
				test: /\.less$/,
				loader: 'style!css!postcss!less' // 从右向左解析  postcss 放在less和sass后面css前面
			}
			// ,{
			// 	test:/\.(jpg|png|gif|svg)$/i,
			// 	loader:'file-loader',
			// 	query:{
			// 		name:'imgs/[name]-[hash:5].[ext]'
			// 	}
			// }
			, {
				test: /\.(jpg|png|gif|svg|eot|ttf|woff|woff2)$/i, // 对图片格式压缩或者自定义字体的打包  
				loader: 'url-loader', // bade64 减少http 请求，但是代码冗余
				query: { // 对于超过limit大小限制的文件 不会整体打包到js中，会生成相应的文件
					limit: 20000, // 表示20kB的图片  url loader与file loader的工作方式相似，
					//但如果文件的体积比byte limit小，就能返回Data Url。
					// 如果文件比limit（以bytes为单位）大，那么webpack就会使用
					// file-loader去处理文件，并且所有的查询参数都会传递给file-loader。
					// 使用url-loader时不需要安装file-loader
					name: 'imgs/[name]-[hash:5].[ext]'
				}
			}
			// , 
			// {
			// 	test: /\.(jpg|png|gif|svg)$/i,
			// 	loaders: [
			// 		'url-loader?limit=20000&name=imgs/[name]-[hash:5].[ext]', //上面也可以按照这种写法
			// 		'image-webpack-loader'//先压缩，然后再弄成base
			// 	]
			// }
		]
	},
	postcss: [
		require('autoprefixer')({
			broswers: ['last 5 versions']// 属性前面加上浏览器版本
		})
	]
};



//webpack-dev-server --config webpack.config.js --progress --colors --hot --inline --content-base  
//后面加上 ./dists
//  和配置里面 contentBase: "./dists",一样
//https://www.npmjs.com/package/extract-text-webpack-plugin   css分离教程
//http://www.css88.com/doc/webpack2/plugins/extract-text-webpack-plugin/  中文版
//https://github.com/lcxfs1991/blog/issues/2  优化