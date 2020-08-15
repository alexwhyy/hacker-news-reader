import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";

const NotFound = () => {
	return (
		<Fragment>
			<Typography
				variant="h3"
				component="h2"
				style={{ marginTop: "20px" }}
			>
				Not Found
			</Typography>
		</Fragment>
	);
};

export default NotFound;
