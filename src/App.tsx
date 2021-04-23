import React, { Fragment } from "react";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import ChatIcon from "@material-ui/icons/Chat";
import WorkIcon from "@material-ui/icons/Work";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteIcon from "@material-ui/icons/Favorite";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import InfoIcon from "@material-ui/icons/Info";
import CodeIcon from "@material-ui/icons/Code";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme, Theme, createStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { BrowserRouter as Router, Switch, Route, Link as RouterLink, NavLink, Redirect } from "react-router-dom";

import Stories from "./pages/Stories";
import SavedPosts from "./pages/Saved";
import ItemView from "./pages/ItemView";
import UserView from "./pages/UserView";
import About from "./pages/About";
import OpenSource from "./pages/OpenSource";
import NotFound from "./pages/NotFound";

const drawerWidth = 240;

const yCombinatorTheme = createMuiTheme({
	palette: {
		background: {
			default: "#f7f7f7",
		},
		primary: {
			main: "#f26522",
		},
	},
});

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: "flex",
	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
	},
}));

function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

interface DrawerProps {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window?: () => Window;
}

function ResponsiveDrawer(props: DrawerProps) {
	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div className={classes.toolbar}>
			<Divider />
			<List>
				<NavLink style={{ color: "black", textDecoration: "none" }} to="/">
					<ListItem button>
						<ListItemIcon>
							<TrendingUpIcon />
						</ListItemIcon>
						<ListItemText primary="Top Stories" />
					</ListItem>
				</NavLink>
				<NavLink style={{ color: "black", textDecoration: "none" }} to="/newest">
					<ListItem button>
						<ListItemIcon>
							<FiberNewIcon />
						</ListItemIcon>
						<ListItemText primary="Newest Stories" />
					</ListItem>
				</NavLink>
			</List>
			<Divider />
			<List
				subheader={
					<ListSubheader component="div" id="categories-subheader">
						News Categories
					</ListSubheader>
				}
			>
				<NavLink style={{ color: "black", textDecoration: "none" }} to="/ask">
					<ListItem button>
						<ListItemIcon>
							<ChatIcon />
						</ListItemIcon>
						<ListItemText primary="Ask Stories" />
					</ListItem>
				</NavLink>
				<NavLink style={{ color: "black", textDecoration: "none" }} to="/show">
					<ListItem button>
						<ListItemIcon>
							<VisibilityIcon />
						</ListItemIcon>
						<ListItemText primary="Show Stories" />
					</ListItem>
				</NavLink>
				<NavLink style={{ color: "black", textDecoration: "none" }} to="/jobs">
					<ListItem button>
						<ListItemIcon>
							<WorkIcon />
						</ListItemIcon>
						<ListItemText primary="Jobs Stories" />
					</ListItem>
				</NavLink>
			</List>
			<Divider />
			<List>
				<NavLink style={{ color: "black", textDecoration: "none" }} to="/saved">
					<ListItem button>
						<ListItemIcon>
							<FavoriteIcon />
						</ListItemIcon>
						<ListItemText primary="Saved Stories" />
					</ListItem>
				</NavLink>
			</List>
			<Divider />
			<List>
				<NavLink style={{ color: "black", textDecoration: "none" }} to="/about">
					<ListItem button>
						<ListItemIcon>
							<InfoIcon />
						</ListItemIcon>
						<ListItemText primary="About" />
					</ListItem>
				</NavLink>
				<NavLink style={{ color: "black", textDecoration: "none" }} to="/open-source">
					<ListItem button>
						<ListItemIcon>
							<CodeIcon />
						</ListItemIcon>
						<ListItemText primary="Open Source" />
					</ListItem>
				</NavLink>
			</List>
			<Divider />
		</div>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<MuiThemeProvider theme={yCombinatorTheme}>
			<Router>
				<div className={classes.root}>
					<CssBaseline />
					<AppBar position="fixed" className={classes.appBar}>
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								edge="start"
								onClick={handleDrawerToggle}
								className={classes.menuButton}
							>
								<MenuIcon />
							</IconButton>
							<img src="/static/images/ycombinator-logo.png" style={{ height: 50 }}></img>
							<Typography variant="body1" noWrap>
								Prettier Hacker News
							</Typography>
						</Toolbar>
					</AppBar>
					<nav className={classes.drawer} aria-label="mailbox folders">
						{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
						<Hidden smUp implementation="css">
							<Drawer
								container={container}
								variant="temporary"
								anchor={theme.direction === "rtl" ? "right" : "left"}
								open={mobileOpen}
								onClose={handleDrawerToggle}
								classes={{
									paper: classes.drawerPaper,
								}}
								ModalProps={{
									keepMounted: true, // Better open performance on mobile.
								}}
							>
								{drawer}
							</Drawer>
						</Hidden>
						<Hidden xsDown implementation="css">
							<Drawer
								classes={{
									paper: classes.drawerPaper,
								}}
								variant="permanent"
								open
							>
								{drawer}
							</Drawer>
						</Hidden>
					</nav>
					<main className={classes.content}>
						<div className={classes.toolbar} />

						{/* Optionally replace this with container */}
						<Fragment>
							<Switch>
								{/* Why are we generating random keys? Because we are using the same component for each of the links and react-router thinks nothing is being changed. Thereforce, we have to manually refresh the key every single time they load the new component. See more: https://stackoverflow.com/questions/38839510/forcing-a-react-router-link-to-load-a-page-even-if-were-already-on-that-page */}
								<Route
									exact
									path="/"
									render={() => <Stories category="topstories" />}
									key={uuidv4()}
								></Route>
								<Route
									path="/newest"
									render={() => <Stories category="newstories" />}
									key={uuidv4()}
								></Route>
								<Route
									path="/ask"
									render={() => <Stories category="askstories" />}
									key={uuidv4()}
								></Route>
								<Route
									path="/show"
									render={() => <Stories category="showstories" />}
									key={uuidv4()}
								></Route>
								<Route
									path="/jobs"
									render={() => <Stories category="jobstories" />}
									key={uuidv4()}
								></Route>
								<Route path="/saved">
									<SavedPosts />
								</Route>
								<Route path="/item/:id" component={ItemView} />
								<Route path="/user/:id" component={UserView} />
								<Route path="/open-source" component={OpenSource} />
								<Route path="/about" component={About} />
								<Route path="/404" component={NotFound} />
								<Redirect to="/404" />
							</Switch>
						</Fragment>
					</main>
				</div>
			</Router>
		</MuiThemeProvider>
	);
}

export default ResponsiveDrawer;
