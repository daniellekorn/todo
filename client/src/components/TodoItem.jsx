import React from "react";
import PropTypes from "prop-types";

class TodoItem extends React.Component {
	render() {
		const { id, title } = this.props.todo;
		return (
			<div class="row">
				<p>
					<input
						type="checkbox"
						onChange={this.props.toggleComplete.bind(this, id)}
					/>
					{title}
					<button
						type="button"
						className="btn btn-danger"
						onClick={this.props.delTodo.bind(this, id)}
					>
						x
					</button>
				</p>
			</div>
		);
	}
}

export default TodoItem;
