import React, { useState, useEffect, Fragment, ChangeEvent } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Skeleton from "@material-ui/lab/Skeleton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import TablePagination from "@material-ui/core/TablePagination";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router";

import { deepOrange } from "@material-ui/core/colors";

import {
	List as VirtualizedList,
	WindowScroller,
	AutoSizer,
	ListRowProps,
	CellMeasurer,
	CellMeasurerCache,
	InfiniteLoader,
} from "react-virtualized";

import { CellMeasurerCacheInterface } from "react-virtualized/dist/es/CellMeasurer";

import Post from "../components/Post";

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

interface PostsPropsInterface {
	category: string;
}

interface PostStateInterface {
	allIds: number[];
	renderedIds: number[];
	page: number;
	itemsPerPage: number;
}

class Posts extends React.Component<PostsPropsInterface, PostStateInterface> {
	constructor(props: PostsPropsInterface) {
		super(props);
		this.state = {
			allIds: [],
			renderedIds: [],
			page: 0,
			itemsPerPage: 25,
		};
	}

	handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		window.scrollTo(0, 0);
		console.log("page #" + newPage);
		console.log(this.state.itemsPerPage * newPage, (newPage + 1) * this.state.itemsPerPage);
		this.setState({
			page: newPage,
			renderedIds: this.state.allIds.slice(
				this.state.itemsPerPage * newPage,
				(newPage + 1) * this.state.itemsPerPage
			),
		});
	};

	handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		this.setState({
			page: 0,
			itemsPerPage: parseInt(event.target.value),
			renderedIds: this.state.allIds.slice(0, parseInt(event.target.value)),
		});
	};

	componentDidMount = () => {
		let URL: string = "https://hacker-news.firebaseio.com/v0/" + this.props.category + ".json";
		fetch(URL)
			.then((response) => response.json())
			.then((response) =>
				this.setState({
					allIds: response,
					renderedIds: response.slice(0, this.state.itemsPerPage),
				})
			);
	};

	render() {
		return (
			<Fragment>
				{this.state.allIds && (
					<Fragment>
						<List style={{ margin: "0 5px" }}>
							{this.state.renderedIds.map((id: number) => (
								<Fragment key={id}>
									<Post id={id} />
								</Fragment>
							))}
						</List>
					</Fragment>
				)}
				<Grid container justify="center" style={{ margin: "20px 0" }}>
					<TablePagination
						component="div"
						count={Math.ceil(this.state.allIds.length)}
						page={this.state.page}
						onChangePage={this.handlePageChange}
						rowsPerPage={this.state.itemsPerPage}
						onChangeRowsPerPage={this.handleChangeRowsPerPage}
					/>
				</Grid>
			</Fragment>
		);
	}
}
// @ts-ignore
export default withRouter(Posts);
