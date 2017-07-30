// import $ from 'jquery';
import 'bootstrap';
import temp from './header.html';
import Mustache from 'mustache';
console.log('header',$)
// import './header.scss';
$('li').click(function(){
	alert($(this));
}).css("color","yellow");
export default class Header {
	render(node) {
		const text = $(node).text();
		console.log($('h1').html());
		console.log({text});
		$('h3 h1').click(function(){
			alert($(this));
		}).css("color","yellow");
		$(node).html(
			Mustache.render(temp, {
				text
			})
		)
	}
}