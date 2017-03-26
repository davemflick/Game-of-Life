import React from 'react';
import ReactDOM, { react } from 'react-dom';

class App extends React.Component{
	render() {
		return(
			<p> Does this Work? </p>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('app'))