import $ from 'jquery';
import temp from './header.html';
import Mustache from 'mustache';
// import './header.scss';

export default class Header {
	render(node) {
		const text = $(node).text();
		console.log(text);
		console.log({text});
		$(node).html(
			Mustache.render(temp, {
				text
			})
		)
	}
}