import React, { useState, useEffect, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CommentIcon from '@material-ui/icons/Comment';

import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';

import { Link as RouterLink } from 'react-router-dom';

import moment from 'moment';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		margin: theme.spacing(1, 2),
	},
	scoreAvatar: {
		marginRight: theme.spacing(3),
		width: theme.spacing(6),
		height: theme.spacing(6),
		backgroundColor: '#f26522',
	},
}));

interface FirebaseItemViewInterface {
	id: number;
	deleted: boolean;
	type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
	by: string;
	time: number;
	text: string;
	dead: boolean;
	parent: number;
	poll: number;
	kids: number[];
	url: string;
	score: number;
	title: string;
	parts: number[];
	descendants: number;
}

const StorySubmission = (props: FirebaseItemViewInterface) => {
	const classes = useStyles();

	return (
		<Paper className={classes.root}>
			<ListItem button component='a' href={props.url} target='_blank'>
				<ListItemAvatar>
					<Avatar className={classes.scoreAvatar}>{props.score}</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={
						<Fragment>
							{props.title}
							<Fragment>
								{props.url && (
									<Typography variant='body1' color='textSecondary'>
										({new URL(props.url).hostname})
									</Typography>
								)}
							</Fragment>
						</Fragment>
					}
					secondary={
						<Typography variant='body1' color='textSecondary'>
							{'By '}
							<RouterLink to={'/user/' + props.by}>{props.by}</RouterLink>
							{' | '}
							{moment.unix(props.time).calendar()}
							{' | '}
							<RouterLink to={'/item/' + props.id}>
								<Fragment>
									{props.descendants ? (
										<Fragment>{props.descendants}</Fragment>
									) : (
										'0'
									)}
									{' Comments'}
								</Fragment>
							</RouterLink>
						</Typography>
					}
				/>
				<ListItemSecondaryAction>
					<IconButton edge='end' aria-label='comments'>
						<SaveIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		</Paper>
	);
};

export default StorySubmission;
