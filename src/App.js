import React from "react";
import "./App.css";
import Header from "./components/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [
				{
					id: 1,
					title: "Walk the dog",
					completed: false,
				},
				{
					id: 2,
					title: "Programming  practice",
					completed: false,
				},
				{
					id: 3,
					title: "Take out the trash",
					completed: false,
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
			id: 4,
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
					<Header></Header>
					<AddTodo addTodo={this.addTodo}></AddTodo>
				</div>
				<div className="col-md-6">
					<Todos
						todos={this.state.todos}
						toggleComplete={this.toggleComplete}
						delTodo={this.delTodo}
					></Todos>
				</div>
			</div>
		);
	}
}

export default App;
