import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class ToDoList_EntryItem extends React.Component{
	constructor(props){
		super(props);	
		this.state = {
			item: this.props.data,
			index: this.props.id
		}
	}

	_handleToggleStatus(){
		let data = Object.assign({}, this.state.item);
		data.status = data.status === "active" ? "completed" : "active";
	
		axios.put('/todos/' + data.id, data)
    .then(response => {
      console.log('Success updating todo list item in db.', response);
      this.setState ({
        item: data
      });
      this.props.handleToggleState(data, this.state.index);
    })
    .catch(error => {
      console.error('Error updating todo list item in db.', error);
    });
	}

	handleDelete(){
		axios.delete('/todos/' + this.state.item.id)
    .then(response => {
      console.log('Success deleting todo list item in db.', response);
      this.props.handleDelete(this.state.item);
    })
    .catch(error => {
      console.error('Error deleting todo list item in db.', error);
    });
	}


	render(){
		return(
				<li className="todo-container" >
						<input type="checkbox" className="check" onClick={this._handleToggleStatus.bind(this)}></input>
					<label 
					className={(this.props.data.status === "completed")? "todo_item completed" : "todo_item"}>
					{this.props.data["todo"]}
					</label>
					<button className='btn delete' onClick={this.handleDelete.bind(this)}></button>
					<button className='btn keyup' onClick={() => this.props.handleKeyUp(this.state.item)}></button>
					<button className='btn keydown' onClick={() => this.props.handleKeyDown(this.state.item)}></button>
				</li>
		)
	}
}

export default ToDoList_EntryItem;