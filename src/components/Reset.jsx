import React, { Fragment } from "react";

function Reset(props) {
	return (
		<Fragment>
			<input
				class="btn btn-primary"
				type="reset"
				value="Reset"
				onClick={props.refreshPage}
			></input>
		</Fragment>
	);
}

export default Reset;
