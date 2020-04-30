import React from "react";
import "./App.css";
import Todos from "./components/Todos";

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

	render() {
		return (
			<div className="text-center row">
				<div className="col-md-6">
					<h1>To-Do</h1>
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
