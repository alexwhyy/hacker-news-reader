import React, { Component } from "react";
import Post from "../components/Post";
import { List } from "@material-ui/core";

export default class SavedPosts extends Component {
	componentDidUpdate() {
		console.log(localStorage.getItem("savedArticles"));
	}

	render() {
		if (localStorage.getItem("savedArticles") == null) {
			localStorage.setItem("savedArticles", JSON.stringify([]));
		}

		return (
			<div>
				<List>
					{JSON.parse(localStorage.getItem("savedArticles") || '{}').map(
						(id: number) => (
							<Post key={id} id={id} />
						)
					)}
				</List>
			</div>
		);
	}
}
