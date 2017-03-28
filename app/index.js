import React from 'react';
import ReactDOM, { react } from 'react-dom';
import GridTable from './components/GridTable';
import Header from './components/Header';


class App extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			gridArr: [],
			nextGen: [],
			running: false,
			counter: 0,
		}

		this.checkNeighbors = this.checkNeighbors.bind(this)
	}

	componentDidMount(){
		this.populateRandom();
		this.onStartRun();
	}



	onStartRun () {
		if(!this.state.running){
		this.interval = setInterval(this.onNextGen.bind(this), 100)
		this.state.running = true;
		} else {
			this.onClearTime();
			this.state.running = false;
		}
		this.setState(this.state)
	}

	onClearTime () {
		clearInterval(this.interval);
	}

	onClearBoard () {
		if(this.state.running === true){
		this.onStartRun();
		} 
		this.emptyBoard();
		this.setState({
			gridArr: [],
			nextGen: [],
			running: false,
			counter: 0,
		})
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
		var num = Math.round(Math.random() * 7);
		if(num !== 1){num = 0;}
		return num;
	}

	emptyBoard(){
		const grid = this.state.gridArr
		if(grid.length > 1500){
			grid.splice(1500)
		}
		for(var x=0; x<grid.length; x++){
			this.state.gridArr[x][1] = 0;
		}
		this.setState(this.state);
			for(var i=0; i<grid.length; i++){
			if(grid[i][1] == 1){
			this.refs['b' + (i+1)].className = 'block alive';
			} else {
				this.refs['b' + (i+1)].className = 'block dead';
			}

		}

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
			this.refs['b' + (i+1)].className = 'block alive';
			} else {
				this.refs['b' + (i+1)].className = 'block dead';
			}

		}

	}

	onPopulateRandom ()	{
		this.populateRandom();
		this.setState({counter: 0})
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
		this.setState(this.state)
		let currentGen = this.state.gridArr;
		let nextGen = [];
		for(var i=0; i<currentGen.length; i++ ) {
			let cell = currentGen[i];
			let a1= currentGen[i-51];
			let a2= currentGen[i-50];
			let a3= currentGen[i-49];
			let b1= currentGen[i-1];
			let b3= currentGen[i+1];
			let c1= currentGen[i+49];
			let c2= currentGen[i+50];
			let c3= currentGen[i+51];
			//For First grid Cell
			if(i === 0) {
				let alive = 0;
				let dead = 0;
				let neighbors = [b3, c2, c3];
				let thisCell = [];
				neighbors.map((neighbor)=> { neighbor[1] === 1 ? alive += 1 : dead += 1 });

				if(currentGen[i][1] === 0 && alive === 3 ){thisCell = [i+1, 1]}
				else if(currentGen[i][1] === 0 && alive !== 3 ){thisCell = [i+1, 0]}
				else if(currentGen[i][1] === 1 && alive > 3) {thisCell = [i+1, 0]}
				else if(currentGen[i][1] === 1 && alive >1 && alive < 4) {thisCell = [i+1, 1]} 
				else if(currentGen[i][1] === 1 && alive < 2) {thisCell = [i+1, 0]};
				nextGen.push(thisCell);
			}
			//For Cells 2-49
			if(i > 0 && i < 49) {
				let alive = 0;
				let dead = 0;
				let neighbors = [b1, b3, c1, c2, c3];
				let thisCell = [];
				neighbors.map((neighbor)=> { neighbor[1] === 1 ? alive += 1 : dead += 1 });
				if(currentGen[i][1] === 0 && alive === 3 ){thisCell = [i+1, 1]}
					else if(currentGen[i][1] === 0 && alive !== 3 ){thisCell = [i+1, 0]}
				else if(currentGen[i][1] === 1 && alive > 3) {thisCell = [i+1, 0]}
				else if(currentGen[i][1] === 1 && alive >1 && alive < 4) {thisCell = [i+1, 1]} 
				else if(currentGen[i][1] === 1 && alive < 2) {thisCell = [i+1, 0]};
				nextGen.push(thisCell);
				 
			}
			//For Cell 50
			if(i === 49) {
				let alive = 0;
				let dead = 0;
				let neighbors = [b1, c1, c2];
				let thisCell = [];
				neighbors.map((neighbor)=> { neighbor[1] === 1 ? alive += 1 : dead += 1 });
				if(currentGen[i][1] === 0 && alive === 3 ){thisCell = [i+1, 1]}
					else if(currentGen[i][1] === 0 && alive !== 3 ){thisCell = [i+1, 0]}
				else if(currentGen[i][1] === 1 && alive > 3) {thisCell = [i+1, 0]}
				else if(currentGen[i][1] === 1 && alive >1 && alive < 4) {thisCell = [i+1, 1]} 
				else if(currentGen[i][1] === 1 && alive < 2) {thisCell = [i+1, 0]};
				nextGen.push(thisCell);
				 
			}
			//For Cells Along column 1
			if(i > 49 && i < 1401 && i%50 === 0) {
				let alive = 0;
				let dead = 0;
				let neighbors = [a2, a3,b3, c2, c3];
				let thisCell = [];
				neighbors.map((neighbor)=> { neighbor[1] === 1 ? alive += 1 : dead += 1 });
				if(currentGen[i][1] === 0 && alive === 3 ){thisCell = [i+1, 1]}
					else if(currentGen[i][1] === 0 && alive !== 3 ){thisCell = [i+1, 0]}
				else if(currentGen[i][1] === 1 && alive > 3) {thisCell = [i+1, 0]}
				else if(currentGen[i][1] === 1 && alive >1 && alive < 4) {thisCell = [i+1, 1]} 
				else if(currentGen[i][1] === 1 && alive < 2) {thisCell = [i+1, 0]};
				nextGen.push(thisCell);
				 
			}

			//For Cells Along column 50
			if(i > 98 && i < 1450 && i%50 === 49) {
				let alive = 0;
				let dead = 0;
				let neighbors = [a1, a2, b1, c1, c2];
				let thisCell = [];
				neighbors.map((neighbor)=> { neighbor[1] === 1 ? alive += 1 : dead += 1 });
				if(currentGen[i][1] === 0 && alive === 3 ){thisCell = [i+1, 1]}
					else if(currentGen[i][1] === 0 && alive !== 3 ){thisCell = [i+1, 0]}
				else if(currentGen[i][1] === 1 && alive > 3) {thisCell = [i+1, 0]}
				else if(currentGen[i][1] === 1 && alive >1 && alive < 4) {thisCell = [i+1, 1]} 
				else if(currentGen[i][1] === 1 && alive < 2) {thisCell = [i+1, 0]};
				nextGen.push(thisCell);
				 
			}

			//For First cell of last row
			if(i === 1450) {
				let alive = 0;
				let dead = 0;
				let neighbors = [a2, a3, b3];
				let thisCell = [];
				neighbors.map((neighbor)=> { neighbor[1] === 1 ? alive += 1 : dead += 1 });
				if(currentGen[i][1] === 0 && alive === 3 ){thisCell = [i+1, 1]}
					else if(currentGen[i][1] === 0 && alive !== 3 ){thisCell = [i+1, 0]}
				else if(currentGen[i][1] === 1 && alive > 3) {thisCell = [i+1, 0]}
				else if(currentGen[i][1] === 1 && alive >1 && alive < 4) {thisCell = [i+1, 1]} 
				else if(currentGen[i][1] === 1 && alive < 2) {thisCell = [i+1, 0]};
				nextGen.push(thisCell);
				 
			}

			//For very last cell
			if(i === 1499) {
				let alive = 0;
				let dead = 0;
				let neighbors = [a1, a2, b1];
				let thisCell = [];
				neighbors.map((neighbor)=> { neighbor[1] === 1 ? alive += 1 : dead += 1 });
				if(currentGen[i][1] === 0 && alive === 3 ){thisCell = [i+1, 1]}
					else if(currentGen[i][1] === 0 && alive !== 3 ){thisCell = [i+1, 0]}
				else if(currentGen[i][1] === 1 && alive > 3) {thisCell = [i+1, 0]}
				else if(currentGen[i][1] === 1 && alive >1 && alive < 4) {thisCell = [i+1, 1]} 
				else if(currentGen[i][1] === 1 && alive < 2) {thisCell = [i+1, 0]};
				nextGen.push(thisCell);
				 
			}

			//For Cells 1451-1499
			if(i > 1450 && i < 1499) {

				let alive = 0;
				let dead = 0;
				let neighbors = [a1, a2, a3, b1, b3];
				let thisCell = [];
				neighbors.map((neighbor)=> { neighbor[1] === 1 ? alive += 1 : dead += 1 });
				if(currentGen[i][1] === 0 && alive === 3 ){thisCell = [i+1, 1]}
				else if(currentGen[i][1] === 0 && alive !== 3 ){thisCell = [i+1, 0]}
				else if(currentGen[i][1] === 1 && alive > 3) {thisCell = [i+1, 0]}
				else if(currentGen[i][1] === 1 && alive >1 && alive < 4) {thisCell = [i+1, 1]} 
				else if(currentGen[i][1] === 1 && alive < 2) {thisCell = [i+1, 0]};
				nextGen.push(thisCell);
				 
			}

			//For All Inner Cells
			if(i>50 && i<1449 && i%50 !== 0 && i%50 !== 49) {
				let alive = 0;
				let dead = 0;
				let neighbors = [a1, a2, a3, b1, b3, c1, c2, c3];
				let thisCell = [];
				neighbors.map((neighbor)=> { neighbor[1] === 1 ? alive += 1 : dead += 1 });
				if(currentGen[i][1] === 0 && alive === 3 ){thisCell = [i+1, 1]}
				else if(currentGen[i][1] === 0 && alive !== 3 ){thisCell = [i+1, 0]}
				else if(currentGen[i][1] === 1 && alive > 3) {thisCell = [i+1, 0]}
				else if(currentGen[i][1] === 1 && alive >1 && alive < 4) {thisCell = [i+1, 1]} 
				else if(currentGen[i][1] === 1 && alive < 2) {thisCell = [i+1, 0]};
				nextGen.push(thisCell); 
			}
	

		}

		
		this.state.nextGen = nextGen;
		this.setState(this.state);
		this.checkNeighbors()
	

	}

	checkNeighbors() {
			this.state.gridArr = this.state.nextGen;
			this.setState(this.state)
			let grid = this.state.nextGen;
			for(var i=0; i<1500; i++){	
			if(grid[i][1] == 1){
			this.refs['b' + (i+1)].className = 'block alive'
			} else {
				this.refs['b' + (i+1)].className = 'block dead'
			}
		}
		this.state.nextGen = [];
		this.setState({
			nextGen: [],
			counter: this.state.counter += 1,
		})
	}


	render() {
		return(
			<div>
				<Header />
				<h3 className='counter'>{`Generations: ${this.state.counter}`}</h3>
				<table  onClick={this.handleClick.bind(this)}>
					<GridTable createRows={this.createRows()} />
				</table>
				<button onClick={this.onPopulateRandom.bind(this)}> Random Population </button>
				<button onClick={this.onNextGen.bind(this)}> Next Generation </button>
				<button onClick={this.onStartRun.bind(this)}> Start/Stop </button>
				<button onClick={this.onClearBoard.bind(this)}> Clear All </button>
			</div>
		)
	}//End of render

}//End of class App

ReactDOM.render(<App/>, document.getElementById('app'));




