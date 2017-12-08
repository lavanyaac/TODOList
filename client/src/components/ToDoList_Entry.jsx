import React from 'react';
import ReactDOM from 'react-dom';
import ToDoList_EntryItem from './ToDoList_EntryItem.jsx';

class ToDoList_Entry extends React.Component{
	constructor(props){
		super(props);	
	}
	render(){
		return(
				<ul className="todolist" >
				{ this.props.data_todoList.map((item, index) => 
						<ToDoList_EntryItem 
						data={item} 
						key={item.id} 
						id={index} 
						handleToggleState={this.props.handleToggleState}
						handleDelete={this.props.handleDelete}
						handleKeyUp={this.props.handleKeyUp}
						handleKeyDown={this.props.handleKeyDown}/>
				)}
				</ul>
			)
	}
}

export default ToDoList_Entry;