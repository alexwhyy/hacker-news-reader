import React, { useState, useEffect, Fragment } from "react";

import { makeStyles, useTheme, Theme, createStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

import List from "@material-ui/core/List";

import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Helmet } from "react-helmet";

import { Link as RouterLink, RouteComponentProps, withRouter, useParams } from "react-router-dom";

import moment from "moment";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import Post from "../components/Post";

interface ItemViewProps extends RouteComponentProps<any> {
	id: number;
}

interface FirebaseItemViewInterface {
	id: number;
	deleted: boolean;
	type: "job" | "story" | "comment" | "poll" | "pollopt";
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

interface AlgoliaItemViewInterface {
	id: number;
	created_at: string;
	created_at_i: number;
	type: "job" | "story" | "comment" | "poll" | "pollopt";
	author: string;
	title?: string;
	url?: string;
	text?: null;
	points: number;
	parent_id?: number;
	children: any;
}

interface AlgoliaSearchHitInterface {
	title: string;
	url: string;
	author: string;
	points: number;
	story_text: string;
	comment_text: string;
	_tags: string[];
	num_comments: number;
	objectID: string;
	_highlightResult: any;
}

const commentStyles = makeStyles((theme: Theme) => ({
	root: {},
	comment: {
		backgroundColor: theme.palette.common.white,
		padding: theme.spacing(2),
		marginBottom: 5,
	},
	commentChild: {
		borderLeft: "0px solid #e0e0e0",
		paddingLeft: "3vw",
	},
	hideButton: {
		transform: "rotate(0deg)",
	},
	commentBody: {
		marginTop: theme.spacing(1),
		whiteSpace: "pre-wrap",
		overflow: "auto",
	},
}));

const Comment = (props: { id: number }) => {
	const classes = commentStyles();

	const [item, setItem] = useState<FirebaseItemViewInterface>();
	const [hide, setHide] = useState<boolean>(false);
	const [openDebugger, setOpenDebugger] = useState<boolean>(false);

	useEffect(() => {
		const URL: string = "https://hacker-news.firebaseio.com/v0/item/" + props.id + ".json";
		fetch(URL)
			.then((response) => response.json())
			.then((response) => {
				setItem(response);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<Fragment>
			{item ? (
				<Fragment>
					<div className={classes.comment}>
						{!item.deleted ? (
							<Fragment>
								{/* Represents the comment if it hasn't been deleted */}
								<Grid container spacing={2}>
									<Grid item>
										<Tooltip title="Toggle Comment" aria-label="toggle">
											<IconButton
												className={classes.hideButton}
												aria-label="hide"
												onClick={() => {
													// Toggles the hidden comment
													setHide(!hide);
												}}
											>
												<ArrowDropDownIcon />
											</IconButton>
										</Tooltip>
									</Grid>
									<Grid item>
										<Typography variant="body1">
											<RouterLink to={`/user/${item.by}`}>{item.by}</RouterLink>
										</Typography>
										<Typography variant="body1" color="textSecondary" gutterBottom>
											{moment.unix(item.time).calendar()}
											{item.kids && (
												<Fragment>
													{" | "}
													{item.kids.length} Direct Responses
												</Fragment>
											)}
										</Typography>
									</Grid>
								</Grid>
								{!hide ? (
									<Typography className={classes.commentBody} variant="body1">
										<span
											dangerouslySetInnerHTML={{
												__html: item.text,
											}}
										/>
									</Typography>
								) : null}
							</Fragment>
						) : (
							<Fragment>
								<Typography variant="h6">Comment Deleted</Typography>
								<Typography variant="body1" color="textSecondary">
									{moment.unix(item.time).calendar()}
								</Typography>
							</Fragment>
						)}
						{process.env.NODE_ENV !== "production" && (
							<Fragment>
								<Button
									variant="outlined"
									size="small"
									color="primary"
									onClick={() => {
										setOpenDebugger(true);
									}}
									style={{ marginTop: "10px" }}
								>
									Debug Comment
								</Button>
								<Dialog
									onClose={() => {
										setOpenDebugger(false);
									}}
									aria-labelledby={"comment-debugging-dialog-" + item.id}
									open={openDebugger}
									fullWidth
									maxWidth="md"
								>
									<DialogTitle id={"comment-debugging-dialog-" + item.id}>
										Debugging Dialog
									</DialogTitle>
									<DialogContent>
										<Typography variant="body1">Firebase HN API Response</Typography>
										<pre
											style={{
												fontFamily: "monospace",
												backgroundColor: "#212121",
												color: "#83eb34",
												overflow: "auto",
												padding: 20,
											}}
										>
											{JSON.stringify(item, null, "\t")}
										</pre>
									</DialogContent>
									<DialogActions>
										<Button
											autoFocus
											onClick={() => {
												setOpenDebugger(false);
											}}
											color="primary"
										>
											Close
										</Button>
									</DialogActions>
								</Dialog>
							</Fragment>
						)}
					</div>
					{/* Represents the replies to the item at the instance */}
					{item.kids &&
						item.kids.map((id: number) => (
							<div key={`comment-${id}`} className={classes.commentChild} hidden={hide}>
								<Comment id={id} />
							</div>
						))}
				</Fragment>
			) : (
				<div className={classes.comment}>
					<Grid container spacing={2}>
						<Grid item>
							<Skeleton animation="wave" variant="circle">
								<Avatar />
							</Skeleton>
						</Grid>
						<Grid item>
							<Skeleton animation="wave" variant="rect" width="150px" height={18} />
							<Skeleton
								animation="wave"
								variant="rect"
								width="280px"
								height={18}
								style={{ marginTop: "10px" }}
							/>
						</Grid>
					</Grid>
					<Skeleton
						className={classes.commentBody}
						animation="wave"
						variant="rect"
						width="100%"
						height={140}
					/>
				</div>
			)}
		</Fragment>
	);
};

const pollOptionStyles = makeStyles((theme) => ({
	scoreAvatar: {
		backgroundColor: "#f26522",
	},
}));

const PollOption = (props: { id: number }) => {
	const classes = pollOptionStyles();
	let [item, setItem] = useState<FirebaseItemViewInterface>();

	useEffect(() => {
		const URL = "https://hacker-news.firebaseio.com/v0/item/" + props.id + ".json";
		fetch(URL)
			.then((response) => response.json())
			.then((response) => setItem(response));
	});

	return (
		<Fragment>
			{item && (
				<ListItem>
					<ListItemAvatar>
						<Avatar className={classes.scoreAvatar}>{item.score}</Avatar>
					</ListItemAvatar>
					<ListItemText primary={item.text} secondary={moment.unix(item.time).calendar()} />
				</ListItem>
			)}
		</Fragment>
	);
};

const itemHeroOptionStyles = makeStyles((theme) => ({
	scoreAvatar: {
		backgroundColor: "#f26522",
		width: theme.spacing(8),
		height: theme.spacing(8),
	},
	textBody: {
		marginTop: theme.spacing(2),
	},
}));

const ItemHero = (props: { firebaseItem: FirebaseItemViewInterface }) => {
	const classes = itemHeroOptionStyles();
	let renderedItem;
	let { firebaseItem } = props;

	// Changes what is rendered depending on what type of item is presented through the use of the renderedItem varible
	switch (firebaseItem.type) {
		case "job":
		case "story":
			renderedItem = (
				<Fragment>
					{/* Only display the score if there is one */}
					<Grid container spacing={3}>
						{firebaseItem.score && (
							<Grid item>
								<Avatar className={classes.scoreAvatar}>{firebaseItem.score}</Avatar>
							</Grid>
						)}
						<Grid item>
							{firebaseItem.url ? (
								<Fragment>
									{" "}
									<Link href={firebaseItem.url} target="_blank">
										<Typography variant="h4">{firebaseItem.title}</Typography>
									</Link>
									<Typography variant="body1" color="textSecondary" gutterBottom>
										({new URL(firebaseItem.url).hostname})
									</Typography>
								</Fragment>
							) : (
								<Typography variant="h4">{firebaseItem.title}</Typography>
							)}
							<Typography variant="body1" color="textSecondary" gutterBottom>
								{"By "}
								<RouterLink to={"/user/" + firebaseItem.by}>{firebaseItem.by}</RouterLink>
								{" | "}
								{moment.unix(firebaseItem.time).calendar()}
								{" | " + (firebaseItem.descendants ? firebaseItem.descendants : "0") + " Comments"}
							</Typography>
						</Grid>
					</Grid>

					<Typography className={classes.textBody} variant="body1">
						<div
							dangerouslySetInnerHTML={{
								__html: firebaseItem.text,
							}}
						/>
					</Typography>
				</Fragment>
			);
			break;
		case "comment":
			renderedItem = (
				<Fragment>
					<Typography variant="h4">{firebaseItem.by}</Typography>
					<Typography variant="body1" color="textSecondary" gutterBottom>
						{moment.unix(firebaseItem.time).calendar()}
					</Typography>
					<Typography variant="body1">{firebaseItem.text}</Typography>
				</Fragment>
			);
			break;
		case "poll":
			renderedItem = (
				<Fragment>
					<Typography variant="h4">{firebaseItem.title}</Typography>
					<Typography variant="body1" color="textSecondary" gutterBottom>
						{"By "}
						<RouterLink to={"/user/" + firebaseItem.by}>{firebaseItem.by}</RouterLink>
						{" | "}
						{moment.unix(firebaseItem.time).calendar()}
						{" | " + (firebaseItem.descendants ? firebaseItem.descendants : "0") + " Comments"}
					</Typography>
					<List>
						{firebaseItem.parts.map((id: number) => (
							<PollOption key={"poll-option-" + id} id={id} />
						))}
					</List>
				</Fragment>
			);
			break;
		case "pollopt":
			renderedItem = (
				<Grid container spacing={3}>
					{firebaseItem.score && (
						<Grid item>
							<Avatar className={classes.scoreAvatar}>{firebaseItem.score}</Avatar>
						</Grid>
					)}
					<Grid item>
						<Typography variant="h4">{firebaseItem.text}</Typography>
						<Typography variant="body1" color="textSecondary" gutterBottom>
							{"By "}
							<RouterLink to={"/user/" + firebaseItem.by}>{firebaseItem.by}</RouterLink>
							{" | "}
							{moment.unix(firebaseItem.time).calendar()}
							{" | "}
							<RouterLink to={"/item/" + firebaseItem.poll}>View Poll</RouterLink>
						</Typography>
					</Grid>
				</Grid>
			);
			break;
		default:
			renderedItem = <Typography variant="h4">Unknown Item Type {firebaseItem.type}</Typography>;
	}
	return renderedItem;
};

const itemViewStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(1),
		maxWidth: "100vw",
	},
	paper: {
		padding: theme.spacing(1),
	},
	ycombinatorButton: {
		marginTop: theme.spacing(2),
	},
}));

const ItemView = (props: ItemViewProps) => {
	const theme = useTheme();

	const classes = itemViewStyles();
	let { id } = useParams();
	let [firebaseItem, setFirebaseItem] = useState<FirebaseItemViewInterface>();
	// let [algoliaItem, setAlgoliaItem] = useState<AlgoliaItemViewInterface>();
	const [relatedItems, setRelatedItems] = useState<number[]>();

	useEffect(() => {
		/*
		const ALGOLIA_URL =
			'https://hn.algolia.com/api/v1/items/' + id;
		fetch(ALGOLIA_URL)
			.then(response => response.json())
			.then(response => {
				console.log(response);
				setAlgoliaItem(response);
			});
		*/

		const FIREBASE_URL = "https://hacker-news.firebaseio.com/v0/item/" + id + ".json";
		fetch(FIREBASE_URL)
			.then((itemResponse) => itemResponse.json())
			.then((itemResponse: FirebaseItemViewInterface) => {
				setFirebaseItem(itemResponse);
				console.log(itemResponse);

				if (itemResponse.url) {
					const searchQuery: string = itemResponse.title
						.split(" ")
						.slice(0, itemResponse.title.split(" ").length / 2)
						.toString()
						.replace(/,/g, " ");
					console.log(searchQuery);
					const RELATED_ITEMS_SEARCH_URL: string =
						"https://hn.algolia.com/api/v1/search_by_date?query=" + searchQuery + "&tags=story";
					fetch(RELATED_ITEMS_SEARCH_URL)
						.then((searchResponse) => {
							if (searchResponse.status !== 200) {
								alert("Error: " + searchResponse);
							}
							return searchResponse;
						})
						.then((searchResponse) => searchResponse.json())
						.then((searchResponse) => {
							return searchResponse.hits.filter(
								(hit: AlgoliaSearchHitInterface) => parseInt(hit.objectID) !== itemResponse.id
							);
						})
						.then((searchResponse: any) => {
							setRelatedItems(
								searchResponse.map((hit: AlgoliaSearchHitInterface) => {
									if (parseInt(hit.objectID) !== itemResponse.id) {
										return parseInt(hit.objectID);
									}
								})
							);
						});
				}
			});
	}, [id]);

	return (
		<div className={classes.root}>
			{firebaseItem ? (
				<Fragment>
					<Helmet>
						<title>{firebaseItem.title}</title>
						<meta name="og:title" content={firebaseItem.title}></meta>
					</Helmet>
					<Grid container spacing={1} style={{ width: "100%" }}>
						<Grid item xs={12} md={9}>
							<div style={{ padding: theme.spacing(2), backgroundColor: "white", marginBottom: 4 }}>
								{firebaseItem && <ItemHero firebaseItem={firebaseItem} />}
							</div>
							{/* Since this is the root instance of the item, we need to use map to start off the recursion train */}
							{firebaseItem.kids && firebaseItem.kids.map((id: number) => <Comment key={id} id={id} />)}
						</Grid>
						<Grid item xs={false} md={3}>
							{firebaseItem.url && relatedItems && relatedItems.length >= 1 ? (
								<Fragment>
									<Typography variant="h5">Related Submissions</Typography>
									{relatedItems && (
										<List>
											{relatedItems.map((id: number) => (
												<Fragment key={id}>
													<Post id={id} />
												</Fragment>
											))}
										</List>
									)}
								</Fragment>
							) : (
								<Typography variant="h6">No related articles found.</Typography>
							)}
						</Grid>
					</Grid>
				</Fragment>
			) : (
				<CircularProgress />
			)}
		</div>
	);
};

export default ItemView;
