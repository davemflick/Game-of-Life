import React from 'react';
import ReactDOM, { react } from 'react-dom';



class GridTable extends React.Component{



	render() {
		return(
			<tbody>
				{this.props.createRows}
			</tbody>
		)
	}
}




class App extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			gridArr: [],
		}
	}

	componentDidMount(){
		this.populateRandom();
	}


	createBlock (rowNum) {
		let width = 50;
		let block=[];
		for (var x=1; x<=width; x++){
			let current =( x + (rowNum * 50) - 50);
			block.push( <td key={'b' + x}>
				<div className="block dead"
					 id= {current}
					 ref={'b' + current} 
					 >
					 </div> </td>);
			this.state.gridArr.push([(x + (rowNum * 50) - 50), 0]);
		}
		return block.map((td)=> td );

	}

	createRows() {
		let height = 30;
		let row=[];
		for(var i=1; i<=height; i++){
			row.push(<tr id={'r' + i} key={'r' + i}>{this.createBlock(i)}</tr>);
		}
		return row.map((tr)=> tr)
	}

	randomNumber () {
		var num = Math.round(Math.random() * 35);
		if(num !== 1){num = 0;}
		return num;
	}

	populateRandom(){
		const grid = this.state.gridArr
		if(grid.length > 1500){
			grid.splice(1500)
		}
		for(var x=0; x<grid.length; x++){
			this.state.gridArr[x][1] = this.randomNumber();
		}
		this.setState(this.state);
			for(var i=0; i<grid.length; i++){
			if(grid[i][1] == 1){
			this.refs['b' + (i+1)].className = 'block alive'
			} else {
				this.refs['b' + (i+1)].className = 'block dead'
			}

		}

	}

	onPopulateRandom ()	{
		this.populateRandom();
	}

	handleClick(e) {
		let block = e.target;
		let id = parseInt(block.id);
		const grid = this.state.gridArr;
		let location = grid[id-1][0];
		if(grid[id-1][1] === 0) {
			grid[id-1][1] = 1;
			block.className = 'block alive';
		}	else {
			grid[id-1][1] = 0;
			block.className = 'block dead';
		}
	}

	onNextGen(){
		let currentGen = this.state.gridArr;
		let nextGen = currentGen;
	
	}

	checkNeighbors() {

	}

	render() {
		return(
			<div>
				<table  onClick={this.handleClick.bind(this)}>
					<GridTable createRows={this.createRows()} />
				</table>
				<button onClick={this.onPopulateRandom.bind(this)}> Random Population </button>
				<button onClick={this.onNextGen.bind(this)}> Next Gen </button>
			</div>
		)
	}//End of render

}//End of class App

ReactDOM.render(<App/>, document.getElementById('app'));




