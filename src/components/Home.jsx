import React, { useState, useEffect, Fragment } from "react";
import Header from "./Header";
import Todos from "./Todos";
import AddTodo from "./AddTodo";
import Reset from "./Reset";
import axios from "axios";
import Button from "@material-ui/core/Button";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await axios.get(`http://localhost:5000`, {
        withCredentials: true,
      });
      setTodos([data]);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const delTodo = (id) => {
    setTodos([...this.state.todos.filter((todo) => todo.id !== id)]);
  };

  const postTodo = (title) => {
    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    });
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
    //remove token here?
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="full-page">
      <div className="stripe">
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
        <Reset refreshPage={refreshPage} />
        <div className="stripe">
          <AddTodo postTodo={postTodo} className="float-right" />
        </div>
      </div>
      <div className="flexible stripe">
        {todos && (
          <Fragment>
            <div className="half-col">
              <Header />
              <Todos
                todos={todos.filter((todo) => !todo.completed)}
                toggleComplete={toggleComplete}
                delTodo={delTodo}
              />
            </div>
            <div className="half-col">
              <h1>Done</h1>
              <Todos
                todos={todos.filter((todo) => todo.completed)}
                toggleComplete={toggleComplete}
                delTodo={delTodo}
              />
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Home;
