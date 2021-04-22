import React, { useState, useEffect, Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";

import Helmet from "react-helmet";

interface DetailInterface {
	title: string;
	imageUrl: string;
	link: string;
	description: string;
}

const openSourceDetails: DetailInterface[] = [
	{
		title: "Typescript",
		imageUrl: "https://www.typescriptlang.org/favicon.ico",
		link: "https://www.typescriptlang.org/",
		description: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.",
	},
	{
		title: "React",
		imageUrl: "https://reactjs.org/favicon.ico",
		link: "https://reactjs.org",
		description: "A JavaScript library for building user interfaces.",
	},
	{
		title: "React Router",
		imageUrl: "https://reacttraining.com/favicon.ico",
		link: "https://reacttraining.com/react-router/",
		description:
			"React Router is a collection of navigational components that compose declaratively with your application.",
	},
	{
		title: "Material-UI",
		imageUrl: "https://material-ui.com/favicon.ico",
		link: "https://material-ui.com/",
		description:
			"React components for faster and easier web development. Build your own design system, or start with Material Design.",
	},
	{
		title: "Moment.js",
		imageUrl: "https://momentjs.com/favicon.ico",
		link: "https://momentjs.com/",
		description: "Parse, validate, manipulate, and display dates and times in JavaScript.",
	},
	{
		title: "Hacker News Firebase API",
		imageUrl: "https://www.ycombinator.com/favicon.ico",
		link: "https://github.com/HackerNews/API",
		description:
			"Public Hacker News data available in near real time. Firebase enables easy access from Android, iOS and the web. Servers aren't left out.",
	},
	{
		title: "Hacker News Algolia API",
		imageUrl: "https://www.algolia.com/favicon.ico",
		link: "https://hn.algolia.com/api",
		description:
			"This API is built on top of Algolia Search's API. It enables developers to access HN data programmatically using a REST API.",
	},
];

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(2),
	},
	sourceList: {
		margin: theme.spacing(3, 0),
	},
	sourceListAvatar: {
		height: 48,
		width: 48,
		marginRight: theme.spacing(2),
	},
}));

const OpenSource = () => {
	const classes = useStyles();

	return (
		<Fragment>
			<Helmet>
				<title>Open Source</title>
			</Helmet>
			<Container className={classes.root}>
				<Typography variant="h4">Open Source</Typography>
				<Typography variant="body1" gutterBottom>
					Thank you to the developers and companies behind of these open source packages which make this app
					happen.
				</Typography>
				<div className={classes.sourceList}>
					<List>
						{openSourceDetails.map((detail) => (
							<Fragment>
								<ListItem
									button
									component="a"
									href={detail.link}
									target="_blank"
									alignItems="flex-start"
								>
									<ListItemAvatar>
										<Avatar
											className={classes.sourceListAvatar}
											alt={detail.title}
											src={detail.imageUrl}
										/>
									</ListItemAvatar>
									<ListItemText primary={detail.title} secondary={detail.description} />
								</ListItem>
							</Fragment>
						))}
					</List>
				</div>
			</Container>
		</Fragment>
	);
};

export default OpenSource;
