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
		margin: theme.spacing(1, 0),
	},
	scoreAvatar: {
		marginRight: theme.spacing(3),
		width: theme.spacing(6),
		height: theme.spacing(6),
		backgroundColor: deepOrange[500],
	},
}));

const Post = ({ id }: { id: number }) => {
	const classes = useStyles();
	var [post, setPost] = useState<any>();

	useEffect(() => {
		console.log(id);
		let URL = 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json';
		fetch(URL)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				setPost(result);
			});
	}, [id]);

	function saveToLocalStorage() {
		var curArray = JSON.parse(localStorage.getItem('savedArticles') || '{}');
		if (curArray == null) {
			localStorage.setItem('savedArticles', JSON.stringify([]));
			curArray = JSON.parse(localStorage.getItem('savedArticles') || '{}'); // re fetch since it was null before
		}
		curArray.push(post.id);
		localStorage.setItem('savedArticles', JSON.stringify(curArray));
		console.log(post.id + ' added to saved articles list.');
	}

	// <NUMBER: points> points by <STRING: username> <NUMBER: hours> hour ago | hide | past | web | favorite | <NUMBER: comments> comments
	return (
		<Paper variant='outlined' className={classes.root}>
			{post ? (
				<ListItem button component='a' href={post.url} target='_blank'>
					<ListItemAvatar>
						<Avatar className={classes.scoreAvatar}>{post.score}</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={
							<Fragment>
								{post.title}
								<Fragment>
									{post.url && (
										<Typography variant='body1' color='textSecondary'>
											({new URL(post.url).hostname})
										</Typography>
									)}
								</Fragment>
							</Fragment>
						}
						secondary={
							<Typography variant='body1' color='textSecondary'>
								{'By '}
								<RouterLink to={'/user/' + post.by}>{post.by}</RouterLink>
								{' | '}
								{moment.unix(post.time).calendar()}
								{' | '}
								<RouterLink to={'/item/' + post.id} target="_blank">
									<Fragment>
										{post.descendants ? (
											<Fragment>{post.descendants}</Fragment>
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
							<SaveIcon onClick={saveToLocalStorage} />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			) : (
				<ListItem>
					<ListItemAvatar>
						<Skeleton
							className={classes.scoreAvatar}
							variant='circle'
							height={48}
							width={48}
						/>
					</ListItemAvatar>
					<ListItemText
						primary={
							<Fragment>
								<Skeleton width='180px' />
								<Skeleton width='90px' />
							</Fragment>
						}
						secondary={<Skeleton width='250px' />}
					/>
				</ListItem>
			)}
		</Paper>
	);
}

export default Post