import React from 'react';
import ReactDOM, { react } from 'react-dom';

export default class Header extends React.Component{

	render() {
		return (
			<div className="headerContainer">
				<div className='coverContainer'>
					<h2 className='header'> {"Conway's" + " " }
					<a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">
					Game of Life </a>
					</h2>
					<p id='myCredit'> {"Built by "} 
					<a href='https://github.com/davemflick' target="_blank">
					David Flick </a></p>
				</div>
			</div>
		)
	}

}