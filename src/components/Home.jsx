import React, { useState, useEffect, Fragment } from "react";
import Header from "./Header";
import Todos from "./Todos";
import AddTodo from "./AddTodo";
import Reset from "./Reset";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(`http://localhost:5000`);
    const data = await response.json();
    setTodos(data);
    return data;
  };

  const delTodo = (id) => {
    setTodos([...this.state.todos.filter((todo) => todo.id !== id)]);
  };

  const postTodo = (title) => {
    fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    });
    this.getData();
  };

  //NEED TO MAKE THIS UPDATE THE INFO IN DB
  const toggleComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  const refreshPage = () => {
    setTodos([]);
  };

  return (
    <div className="text-center row">
      <div className="col-md-12 justify-items-center">
        <AddTodo postTodo={postTodo} />
        <Reset refreshPage={refreshPage} />
      </div>
      <Fragment>
        {todos && (
          <Fragment>
            <div className="col-md-6">
              <Header />
              <Todos
                todos={todos.filter((todo) => !todo.completed)}
                toggleComplete={toggleComplete}
                delTodo={delTodo}
              />
            </div>
            <div className="col-md-6">
              <h1>Done</h1>
              <Todos
                todos={todos.filter((todo) => todo.completed)}
                toggleComplete={toggleComplete}
                delTodo={delTodo}
              />
            </div>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

export default Home;