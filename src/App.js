import React, { useState, Fragment, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";

const App = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);

  const currentUser = (user) => {
    localStorage.setItem("user", user);
    setUser(true);
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
