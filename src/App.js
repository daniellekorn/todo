import React, { useState, Fragment } from "react";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";

const App = () => {
  const [user, setUser] = useState(false);

  const currentUser = (user) => {
    setUser(user);
  };

  return (
    <Fragment>
      {user ? (
        <Home></Home>
      ) : (
        <Login currentUser={(user) => currentUser(user)}></Login>
      )}
    </Fragment>
  );
};

export default App;
