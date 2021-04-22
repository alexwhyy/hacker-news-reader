import React, { useState, useEffect, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import { ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import ScheduleIcon from "@material-ui/icons/Schedule";
import CommentIcon from "@material-ui/icons/Comment";

import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Skeleton from "@material-ui/lab/Skeleton";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import { Link as RouterLink } from "react-router-dom";

import moment from "moment";

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		margin: theme.spacing(1, 0),
	},
	scoreAvatar: {
		marginRight: theme.spacing(3),
		width: theme.spacing(6),
		height: theme.spacing(6),
		backgroundColor: "#f26522",
	},
}));

const Post = ({ id }: { id: number }) => {
	const classes = useStyles();
	const [post, setPost] = useState<any>();
	const [savedPosts, setSavedPosts] = useState<number[]>();
	const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

	useEffect(() => {
		let URL = "https://hacker-news.firebaseio.com/v0/item/" + id + ".json";
		fetch(URL)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				setPost(result);
				setSavedPosts(getSavedPosts());
			});
	}, [id]);

	function getSavedPosts() {
		var curArray = JSON.parse(localStorage.getItem("savedItems") || "[]");
		if (curArray == null) {
			localStorage.setItem("savedItems", JSON.stringify([]));
			curArray = JSON.parse(localStorage.getItem("savedItems") || "[]"); // re fetch since it was null before
		}
		console.log(curArray);
		return curArray;
	}

	function saveToLocalStorage() {
		var curArray = JSON.parse(localStorage.getItem("savedItems") || "[]");
		if (curArray == null) {
			localStorage.setItem("savedItems", JSON.stringify([]));
			curArray = JSON.parse(localStorage.getItem("savedItems") || "[]"); // re fetch since it was null before
		}
		curArray.push(post.id);
		localStorage.setItem("savedItems", JSON.stringify(curArray));
		console.log(post.id + " added to saved articles list.");
		setSavedPosts(curArray);
	}

	// <NUMBER: points> points by <STRING: username> <NUMBER: hours> hour ago | hide | past | web | favorite | <NUMBER: comments> comments
	return (
		<Fragment>
			<Paper variant="outlined" className={classes.root} style={{ margin: "5px 0px" }}>
				{post && savedPosts ? (
					<ListItem button component="a" href={post.url ? post.url : `/item/${post.id}`} target="_blank">
						<ListItemAvatar>
							<Avatar className={classes.scoreAvatar}>{post.score}</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={
								<Fragment>
									{post.title}
									<Fragment>
										{post.url && (
											<Typography variant="body1" color="textSecondary">
												({new URL(post.url).hostname})
											</Typography>
										)}
									</Fragment>
								</Fragment>
							}
							secondary={
								<Typography variant="body1" color="textSecondary">
									{"By "}
									<RouterLink to={"/user/" + post.by}>{post.by}</RouterLink>
									{" | "}
									{moment.unix(post.time).calendar()}
									{" | "}
									<RouterLink to={"/item/" + post.id} target="_blank">
										<Fragment>
											{post.descendants ? <Fragment>{post.descendants}</Fragment> : "0"}
											{" Comments"}
										</Fragment>
									</RouterLink>
								</Typography>
							}
						/>
						{!savedPosts?.includes(post.id) && (
							<ListItemSecondaryAction>
								<IconButton edge="end" aria-label="comments">
									<SaveIcon
										onClick={() => {
											saveToLocalStorage();
											setSnackbarOpen(true);
										}}
									/>
								</IconButton>
							</ListItemSecondaryAction>
						)}
					</ListItem>
				) : (
					<ListItem>
						<ListItemAvatar>
							<Skeleton className={classes.scoreAvatar} variant="circle" height={48} width={48} />
						</ListItemAvatar>
						<ListItemText
							primary={
								<Fragment>
									<Skeleton width="180px" />
									<Skeleton width="90px" />
								</Fragment>
							}
							secondary={<Skeleton width="250px" />}
						/>
					</ListItem>
				)}
			</Paper>
			<Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
				<Alert onClose={() => setSnackbarOpen(false)} severity="success">
					Post saved to local storage.
				</Alert>
			</Snackbar>
		</Fragment>
	);
};

export default Post;
