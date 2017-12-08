import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Add_ToDo extends React.Component{
	constructor(props){
		super(props);
		this.state={
			item:""
		}
	}
	_addTodo(){
		let data = {
			todo: this.state.item,
			status: 'active',
			'list_order': this.props.setOrder + 1
		}
		axios.post('/todos', data)
    .then(response => {
      console.log('Success Adding todo list item in db.', response.data);
      data.id = response.data[0];
      this.props.handleAddItemOnEnter(data);
      this.setState({
  			item: ''
  		})
    })
    .catch(error => {
      console.error('Error updating todo list item in db.', error);
    });
	}

	handleOnChange(e){
		this.setState({
			item: e.target.value}
			)
	}
	handleOnKeyPress(e){
		if (!e) e = window.event;
  	let keyCode = e.keyCode || e.which;
  	if(keyCode === 13){
  		this._addTodo();
  	}
		
	}
	render(){
		return (
				<input 
				type="text" 
				autoFocus
				placeholder="what needs to be done?" 
				className="todo-entry" 
				onKeyPress={this.handleOnKeyPress.bind(this)}
				onChange={this.handleOnChange.bind(this)}
				value={this.state.item}>
				</input>
		)
	}
}

export default Add_ToDo;