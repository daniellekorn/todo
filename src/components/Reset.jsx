import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";

function Reset(props) {
  return (
    <Fragment>
      <Button variant="outlined" color="primary" onClick={props.refreshPage}>
        Reset
      </Button>
    </Fragment>
  );
}

export default Reset;
