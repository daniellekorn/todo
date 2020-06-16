import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    fontSize: 14,
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    //change width if mobile or web
    width: 220,
  },
  addBtn: {
    fontSize: 14,
    float: "right",
  },
}));

const AddTodo = (props) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const handleOnChange = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(title);
    this.props.postTodo(title);
    setTitle("");
    console.log(title);
  };

  const setAddForm = (event) => {
    setShowAdd(true);
  };

  const addNewTodo = (event) => {
    props.postTodo(title);
  };

  return (
    <div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Add todo..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={handleOnChange}
        />
        <Button
          color="secondary"
          className={classes.addBtn}
          onClick={addNewTodo}
        >
          Add
        </Button>
      </div>
    </div>

    // <form onSubmit={(event) => handleOnSubmit(event)} className="col-md-10">
    //   <input
    //     className="input-large add-todo"
    //     type="text"
    //     name="title"
    //     placeholder="Add Todo ..."
    //     value={title}
    //     onChange={(event) => handleOnChange(event)}
    //   />
    //   <input type="submit" value="Submit" className="btn btn-success" />
    // </form>
  );
};

export default AddTodo;
