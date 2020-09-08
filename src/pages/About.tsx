import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";

const aboutStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
}));

const About = () => {
    const classes = aboutStyles();

    return (
        <Container className={classes.root}>
            <Typography variant="h4">About</Typography>
            <Typography variant="body1" gutterBottom>
                Hacker News is a link aggregation and discussion website operated by startup accelerator{" "}
                <a href="https://www.ycombinator.com">Y Combinator</a>. Submissions are primary focused on computer
                science, technology, and startup culture. This web app is a "mirror" Hacker News and uses their API to
                display these submissions in more bloated but prettier interface. If you would like a faster experience,
                you can use the <a href="https://news.ycombinator.com">original Hacker News</a>.
            </Typography>
            <Typography variant="body1">
                This application was built with ❤️ and ☕ by <a href="https://alexyuan.me">Alex Yuan</a> and{" "}
                <a href="https://www.linkedin.com/in/gary-li-dev/">Gary Li</a>. We were both high school students at the
                time when this application was developed. Both of us are starting school at the University of Waterloo
                so we won't have as much time to work on this project. Alex will be studying Geomatics and Gary will be
                studying computer engineering.
            </Typography>
        </Container>
    );
};

export default About;
