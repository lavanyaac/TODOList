import React from 'react';
import ReactDOM from 'react-dom';

class Add_ToDo extends React.Component{
	constructor(props){
		super(props);
	}
	handleButtonClick(e){
		let text = e.target.name;
		this.props.handleFilteringData(text);
	}
	render(){
		let status = this.props.data_displayedStatus;
		return(
				<div className="footer-container">
					<div className="num-of-items">{this.props.data_todoNum} Items Left</div>
					<div className="buttons-container">
						<button onClick={this.handleButtonClick.bind(this)} name="all" className={(status === "all")? "active" : ""}>All</button>
						<button onClick={this.handleButtonClick.bind(this)} name="active" className={(status === "active")? "active" : ""}>Active</button>
						<button onClick={this.handleButtonClick.bind(this)} name="completed" className={(status === "completed")? "active" : ""}>Completed</button>
						<button onClick={this.props.handleClearAllCompleted}>Clear All Completed</button>
					</div>
				</div>
		)
	}
}

export default Add_ToDo;