import React from "react";
import "./App.css";
import Header from "./components/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import { v4 as uuid } from "uuid";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [
				{
					id: uuid(),
					title: "Walk the dog",
					completed: false,
				},
				{
					id: uuid(),
					title: "Programming  practice",
					completed: false,
				},
				{
					id: uuid(),
					title: "Take out the trash",
					completed: false,
				},
				{
					id: uuid(),
					title: "Exercise",
					completed: true,
				},
			],
		};
	}

	toggleComplete = (id) => {
		this.setState({
			todos: this.state.todos.map((todo) => {
				if (todo.id === id) {
					todo.completed = !todo.completed;
				}
				return todo;
			}),
		});
	};

	delTodo = (id) => {
		this.setState({
			todos: [...this.state.todos.filter((todo) => todo.id !== id)],
		});
	};

	addTodo = (title) => {
		const newTodo = {
			id: uuid(),
			title: title,
			completed: false,
		};
		this.setState({
			todos: [...this.state.todos, newTodo],
		});
		console.log(this.state.todos);
	};

	render() {
		return (
			<div className="text-center row">
				<div className="col-md-12">
					<AddTodo addTodo={this.addTodo}></AddTodo>
				</div>
				<div className="col-md-6">
					<Header></Header>
					<Todos
						todos={this.state.todos.filter((todo) => !todo.completed)}
						toggleComplete={this.toggleComplete}
						delTodo={this.delTodo}
					></Todos>
				</div>
				<div className="col-md-6">
					<h1>Done</h1>
					<Todos
						todos={this.state.todos.filter((todo) => todo.completed)}
						toggleComplete={this.toggleComplete}
						delTodo={this.delTodo}
					></Todos>
				</div>
			</div>
		);
	}
}

export default App;
