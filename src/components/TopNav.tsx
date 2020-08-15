import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { deepOrange } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: deepOrange[500]
		}
	}
});

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
		backgroundColor: deepOrange[500]
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

export default function TopNav() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h5" className={classes.title}>
						Modern Hacker News Reader
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}
