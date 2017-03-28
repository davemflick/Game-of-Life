import React from 'react';
import ReactDOM, { react } from 'react-dom';

export default class GridTable extends React.Component{

	render() {
		return(
			<tbody>
				{this.props.createRows}
			</tbody>
		)
	}
}
