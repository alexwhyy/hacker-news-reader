import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import ChatIcon from '@material-ui/icons/Chat';
import WorkIcon from '@material-ui/icons/Work';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import InfoIcon from '@material-ui/icons/Info';
import CodeIcon from '@material-ui/icons/Code';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link as RouterLink,
	NavLink,
	Redirect,
} from 'react-router-dom';

import Stories from './pages/Stories';
import SavedPosts from './pages/Saved';
import ItemView from './pages/ItemView';
import UserView from './pages/UserView';
import About from './pages/About';
import OpenSource from './pages/OpenSource';
import NotFound from './pages/NotFound';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
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
				<NavLink activeStyle={{ backgroundColor: '#ebebeb' }} to='/'>
					<ListItem button>
						<ListItemIcon>
							<TrendingUpIcon />
						</ListItemIcon>
						<ListItemText primary='Top Stories' />
					</ListItem>
				</NavLink>
				<NavLink activeStyle={{ backgroundColor: '#ebebeb' }} to='/newest'>
					<ListItem button>
						<ListItemIcon>
							<FiberNewIcon />
						</ListItemIcon>
						<ListItemText primary='Newest Stories' />
					</ListItem>
				</NavLink>
			</List>
			<Divider />
			<List
				subheader={
					<ListSubheader component='div' id='categories-subheader'>
						News Categories
					</ListSubheader>
				}>
				<NavLink activeStyle={{ backgroundColor: '#ebebeb' }} to='/ask'>
					<ListItem button>
						<ListItemIcon>
							<ChatIcon />
						</ListItemIcon>
						<ListItemText primary='Ask Stories' />
					</ListItem>
				</NavLink>
				<NavLink activeStyle={{ backgroundColor: '#ebebeb' }} to='/show'>
					<ListItem button>
						<ListItemIcon>
							<VisibilityIcon />
						</ListItemIcon>
						<ListItemText primary='Show Stories' />
					</ListItem>
				</NavLink>
				<NavLink activeStyle={{ backgroundColor: '#ebebeb' }} to='/jobs'>
					<ListItem button>
						<ListItemIcon>
							<WorkIcon />
						</ListItemIcon>
						<ListItemText primary='Jobs Stories' />
					</ListItem>
				</NavLink>
			</List>
			<Divider />
			<List>
				<NavLink activeStyle={{ backgroundColor: '#ebebeb' }} to='/saved'>
					<ListItem button>
						<ListItemIcon>
							<FavoriteIcon />
						</ListItemIcon>
						<ListItemText primary='Saved Stories' />
					</ListItem>
				</NavLink>
			</List>
			<Divider />
			<List>
				<NavLink activeStyle={{ backgroundColor: '#ebebeb' }} to='/about'>
					<ListItem button>
						<ListItemIcon>
							<InfoIcon />
						</ListItemIcon>
						<ListItemText primary='About' />
					</ListItem>
				</NavLink>
				<NavLink activeStyle={{ backgroundColor: '#ebebeb' }} to='/open-source'>
					<ListItem button>
						<ListItemIcon>
							<CodeIcon />
						</ListItemIcon>
						<ListItemText primary='Open Source' />
					</ListItem>
				</NavLink>
			</List>
			<Divider />
		</div>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<Router>
			<div className={classes.root}>
				<CssBaseline />
				<AppBar position='fixed' className={classes.appBar}>
					<Toolbar>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							edge='start'
							onClick={handleDrawerToggle}
							className={classes.menuButton}>
							<MenuIcon />
						</IconButton>
						<Typography variant='h6' noWrap>
							Material Hacker News
						</Typography>
					</Toolbar>
				</AppBar>
				<nav className={classes.drawer} aria-label='mailbox folders'>
					{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
					<Hidden smUp implementation='css'>
						<Drawer
							container={container}
							variant='temporary'
							anchor={theme.direction === 'rtl' ? 'right' : 'left'}
							open={mobileOpen}
							onClose={handleDrawerToggle}
							classes={{
								paper: classes.drawerPaper,
							}}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}>
							{drawer}
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation='css'>
						<Drawer
							classes={{
								paper: classes.drawerPaper,
							}}
							variant='permanent'
							open>
							{drawer}
						</Drawer>
					</Hidden>
				</nav>
				<main className={classes.content}>
					<div className={classes.toolbar} />

					{/* Optionally replace this with container */}
					<Fragment>
						<Switch>
							<Route exact path='/'>
								<Stories category='topstories' />
							</Route>
							<Route path='/newest'>
								<Stories category='newstories' />
							</Route>
							<Route path='/ask'>
								<Stories category='askstories' />
							</Route>
							<Route path='/show'>
								<Stories category='showstories' />
							</Route>
							<Route path='/jobs'>
								<Stories category='jobstories' />
							</Route>
							<Route path='/saved'>
								<SavedPosts />
							</Route>
							<Route path='/item/:id' component={ItemView} />
							<Container>
								<Route path='/user/:id' component={UserView} />
								<Route path='/open-source' component={OpenSource} />
								<Route path='/about' component={About} />
							</Container>
							<Route component={NotFound} />
							<Route path='/404' component={NotFound} />
							<Redirect to='/404' />
						</Switch>
					</Fragment>
				</main>
			</div>
		</Router>
	);
}

export default ResponsiveDrawer;
