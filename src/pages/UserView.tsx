import React, { useState, useEffect, Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';

import { RouteComponentProps } from 'react-router-dom';

import moment from 'moment';

interface UserInterface {
	id: string;
	delay: number;
	created: number;
	karma: number;
	about: string;
	submitted: number[];
}

interface UserViewProps extends RouteComponentProps<any> {
	id: string;
}

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: theme.spacing(4)
	},
	paper: {
		padding: theme.spacing(3)
	},
	karmaAvatar: {
		backgroundColor: deepOrange[500],
		width: theme.spacing(8),
		height: theme.spacing(8)
	},
	textBody: {
		marginTop: theme.spacing(2)
	}
}));

const UserView = (props: UserViewProps) => {
	const classes = useStyles();
	let [user, setUser] = useState<UserInterface>();

	useEffect(() => {
		const URL =
			'https://hacker-news.firebaseio.com/v0/user/' +
			props.match.params.id +
			'.json';
		fetch(URL)
			.then(response => response.json())
			.then(response => {
				console.log(response);
				setUser(response);
			});
	}, []);

	return (
		<Container className={classes.root}>
			{user ? (
				<Paper variant="outlined" className={classes.paper}>
					<Grid container spacing={3}>
						<Grid item>
							<Avatar className={classes.karmaAvatar}>
								{user.karma}
							</Avatar>
						</Grid>
						<Grid item>
							<Typography variant="h4">{user.id}</Typography>
							<Typography
								variant="subtitle1"
								color="textSecondary"
							>
								Created on{' '}
								{moment
									.unix(user.created)
									.format('MMMM Do YYYY')}
								{' | '}
								{user.submitted.length} submissions
							</Typography>
						</Grid>
					</Grid>
					<Typography className={classes.textBody} variant="body1">
						<span
							dangerouslySetInnerHTML={{
								__html: user.about
							}}
						/>
					</Typography>
				</Paper>
			) : (
				<CircularProgress />
			)}
		</Container>
	);
};

export default UserView;
