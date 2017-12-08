import React from 'react';
import ReactDOM from 'react-dom';
import Add_ToDo from './components/Add_ToDo.jsx';
import ToDoList_Entry from './components/ToDoList_Entry.jsx';
import ToDo_Footer from './components/ToDo_Footer.jsx';
import axios from 'axios'

// let todoList = [
// {todo: "do the chores", status: "active"},
// {todo: "do the painting", status: "completed"},
// {todo: "get a job", status: "completed"},
// {todo: "Get the redemption u want",status: "active" },
// {todo: "make ashwin proud of u", status: "active"},
// {todo: "Make everyone proud of u", status: "active"},
// ]

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			items: this.props.data,
			displayed_status: 'all'
		}
	}

	componentDidMount(){
		axios.get('/todos')
    .then(response => {
      console.log('Success getting todo list items from db.', response.data);
      this.setState ({
        items: response.data
      });
    })
    .catch(error => {
      console.error('Error getting todo list items from db.', error);
    });
	}

	handleAddItemOnEnter(item){
		let newList = this.state.items.slice();
		newList.unshift(item);
		this.setState({
			items: newList
		});
	}

	handleFilteringData(statusType){
		this.setState({
			displayed_status: statusType
		});
	}

	handleToggleState(item, key){
		let newList = this.state.items.slice();
		newList[key] = item;
		this.setState({
			items: newList
		});
	}
	handleClearAllCompleted(){
		let doesCompletedExists = this.state.items.some((item)=>{
			return item.status === "completed";
		})
		if(doesCompletedExists){
			axios.delete('/todos/tasks/completed')
	    .then(response => {
	      console.log('Success deleting all completedtodo list items in db.', response);
	      this._deleteCompletedItems(response.data);
	    })
	    .catch(error => {
	      console.error('Error deleting all completedtodo list items in db.', error);
	    });
	  }else{
	  	this.setState({
				displayed_status: 'all'
			})
	  }
	}

	_deleteCompletedItems(idArr){
		let newList = this.state.items.slice();
		newList = newList.filter(item =>{
			return !idArr.includes(item.id);
		});
		this.setState({
			items: newList,
			displayed_status: 'all'
		})
	}

	handleDelete(item){
		let newList = this.state.items.slice();
		let index = this._getItemIndex(newList, item)
		newList.splice(index, 1);
		this.setState({
			items: newList
		});
	}

	

	reArrangeListItems(item, oldPos, newPos){
		let list = this.state.items;
		list = this._generateNewOrder(item, oldPos, newPos);
		let orderIdList = this._generateOrderIdList(list);
		list.sort(function(a,b){
	      		return a.list_order<b.list_order;
	      })
		this._updateNewOrder(orderIdList, list);
	}

	handleKeyUp(item){
		let list = this.state.items;
		if(item.list_order < list.length){
			let index = this._getItemIndex(list, item);
			this.reArrangeListItems(item, index, index-1);
		}
	}

	handleKeyDown(item){
		let list = this.state.items;
		if(item.list_order > 0){
			let index = this._getItemIndex(list, item);
			this.reArrangeListItems(item, index, index+1);
		}
	}

	_getItemIndex(list, item){
		return list.findIndex((listitem) => {
			return item === listitem;
		});
	}

	_generateOrderIdList(list){
		return list.map(item => {
			let todo_order = {};
			todo_order.id = item.id;
			todo_order.list_order = item.list_order;
				return todo_order;
		})
	}

	_updateOrderPerIndex(list){
		return list.map((item, index) => {
			item.list_order = list.length - index;
		});
	}

	_generateNewOrder(item, oldPos, newPos){
		let newList = this.state.items.slice();
		newList.splice(oldPos, 1);
		newList.splice(newPos, 0, item);
		this._updateOrderPerIndex(newList);
		return newList;
	}
	_updateNewOrder(orderIdList, newList){
		axios.patch('/todos', orderIdList)
	    .then(response => {
	      console.log('Success re-order list item in db.', response);
	      this.setState({
	      	items: newList
	      })
	    })
	    .catch(error => {
	      console.error('Error re-order list item in db.', error);
	    });
	}

	_displayData(){
		let status = (this.state.displayed_status);
		if(status === "all"){
			return this.state.items;
		}else{
			return this._filterData(this.state.displayed_status)
		}
	}
	_calculateActiveItem(){
		let items = this.state.items;
		return !items ? 0 : items.reduce((count, item) =>{
			if(item.status === "active"){
				++count;
			}
			return count;
		}, 0)
	}

	_filterData(type){
		return this.state.items.filter((item) => {
			return (item.status === type);
		})
	}

	render(){
		let itemsToBeRendered =  this._displayData();
		let todo_num =  this._calculateActiveItem();
		return (!itemsToBeRendered ? null:
			<div className="list-container">
				<h1>todos</h1>
				<Add_ToDo 
				handleAddItemOnEnter = {this.handleAddItemOnEnter.bind(this)} 
				setOrder = {this.state.items.length}/>
				<ToDoList_Entry 
				data_todoList={itemsToBeRendered} 
				handleToggleState={this.handleToggleState.bind(this)}
				handleDelete={this.handleDelete.bind(this)}
				handleKeyUp={this.handleKeyUp.bind(this)}
				handleKeyDown={this.handleKeyDown.bind(this)}/>
				<ToDo_Footer 
				data_todoNum={todo_num} 
				data_displayedStatus={this.state.displayed_status}
				handleFilteringData={this.handleFilteringData.bind(this)}
				handleClearAllCompleted = {this.handleClearAllCompleted.bind(this)}/>
			</div>
			)
	}
}

ReactDOM.render(<App/>, document.getElementById("app"));

