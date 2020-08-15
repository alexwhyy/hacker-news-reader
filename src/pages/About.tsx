import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const aboutStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(2),
	},
}));

const About = () => {
	const classes = aboutStyles();

	return (
		<div className={classes.root}>
			<Typography variant='h2'>About</Typography>
			<Typography variant='h5' gutterBottom>
				Hacker News is a link aggregation and discussion website operated by startup
				accelerator <Link href='https://www.ycombinator.com'>Y Combinator</Link>.
				Submissions are primary focused on computer science, technology, and startup
				culture. This web app is a "mirror" Hacker News and uses their API to display these
				submissions in more bloated but prettier interface. If you would like a faster
				experience, you can use the{' '}
				<Link href='https://news.ycombinator.com'>original Hacker News</Link>.
			</Typography>
		</div>
	);
};

export default About;
