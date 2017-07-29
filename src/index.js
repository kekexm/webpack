console.log(122223)
	// if(document.querySelectorAll('a').length){
	// 	require.ensure([],()=>{ //按需加载，打包的时候不会引人app.js一个文件里面，会单独打包出来。
	// 		const _Button = require('./Components/button');
	// 		const Button = require('./Components/button.js').default;

// 		console.log(_Button,12311)
// 		console.log(_Button)
// 		const button = new Button('NBA.CN');

// 		button.render('a');
// 	},'button')
// };
// if(document.querySelectorAll('h3').length){
// 	require.ensure([],()=>{
// 		const Header = require('./Components/header.js').default;
// 		new Header().render('h3');
// 	},'header')
// }
// 
// 
import './commoncss/style.css';//引入总的样式
// console.log(AppStore);

const _Button = require('./Components/button/button');
const Button = require('./Components/button/button.js').default;
const __Button = require('AppStore/Components/button/button.js').default;
//AppStore  代表了__dirname+'/src'
console.log(_Button, 111211)
console.log(Button)
console.log('AppStore',__Button)
const button = new Button('NBA.CN');
button.render('a');
console.log('GLOBLE',jQuery);
console.log('GLOBLE',$('body').html());
const Header = require('./Components/header/header.js').default;
new Header().render('h3');