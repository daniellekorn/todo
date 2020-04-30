import React, { Fragment } from "react";

function Reset(props) {
	return (
		<Fragment>
			<input
				className="btn btn-primary col-md-1"
				type="reset"
				value="Reset"
				onClick={props.refreshPage}
			></input>
		</Fragment>
	);
}

export default Reset;
