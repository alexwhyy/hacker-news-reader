import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';

const NotFound = () => {
    return (
        <Container>
            <img src="/static/images/undraw_page_not_found.svg" style={{ width: "100%", marginTop: "50px" }}></img>
            <Typography variant='h3' align='center'>Uh oh</Typography>
        </Container>
    );
};

export default NotFound;
