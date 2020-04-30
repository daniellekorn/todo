import React from "react";
import "./App.css";
import Header from "./components/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import Reset from "./components/Reset";
import { v4 as uuid } from "uuid";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
		};
	}

	async componentDidMount() {
		const response = await fetch(`http://localhost:5000`);
		const data = await response.json();
		this.setState({ todos: data });
		return data;
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

	postTodo = (title) => {
		fetch("http://localhost:5000/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: title,
			}),
		});
	};

	refreshPage = () => {
		this.setState({ todos: [] });
	};

	render() {
		return (
			<div className="text-center row">
				<div className="col-md-12 justify-items-center">
					<AddTodo postTodo={this.postTodo}></AddTodo>
					<Reset refreshPage={this.refreshPage}></Reset>
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
