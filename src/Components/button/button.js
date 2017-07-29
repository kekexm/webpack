// import $ from 'jquery';    有了全局jquery 无需单独引入了
import temp from './button.html';
import Mustache from 'mustache';
import './buttonless.less';
import './button.css';
console.log($,123)
export default class Button {
	constructor(link) {
		this.link = link;
	}

	onClick(eve) {
		eve.preventDefault();
		alert(this.link);
	}

	render(node) {
		const text = $(node).text();

		console.log(text);
		console.log({text},6666);

		$(node).html(
			Mustache.render(temp, {
				text
			})
		)

		$(".button").click(this.onClick.bind(this));
	}
}