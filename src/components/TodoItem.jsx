import React from "react";

class TodoItem extends React.Component {
  render() {
    const { id, title } = this.props.todo;
    return (
      <div className="row">
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
