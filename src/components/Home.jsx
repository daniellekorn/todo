import React, { useState, useEffect, Fragment } from "react";
import Header from "./Header";
import Todos from "./Todos";
import AddTodo from "./AddTodo";
import Reset from "./Reset";
import axios from "axios";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(`http://localhost:5000`, {
      withCredentials: true,
    });
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
    // this.setState({
    //   todos: todos.map((todo) => {
    //     if (todo.id === id) {
    //       todo.completed = !todo.completed;
    //     }
    //     return todo;
    //   }),
    // });
    return true;
  };

  const refreshPage = () => {
    setTodos([]);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="text-center row">
      <button onClick={(event) => handleLogout(event)}>Logout</button>
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
