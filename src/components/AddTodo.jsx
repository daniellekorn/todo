import React from "react";

class AddTodo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
		};
	}

	onChange = (e) => {
		this.setState({ title: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.props.addTodo(this.state.title);
		this.setState({ title: "" });
	};

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<input
					type="text"
					name="title"
					placeholder="Add Todo ..."
					className="w-100"
					value={this.state.title}
					onChange={this.onChange}
				/>
				<input type="submit" value="Submit" className="btn btn-success" />
			</form>
		);
	}
}

export default AddTodo;
