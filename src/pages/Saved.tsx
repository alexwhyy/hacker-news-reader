import React, { Fragment, useState, useEffect } from "react";
import Post from "../components/Post";
import { List } from "@material-ui/core";

export default function SavedPosts() {
	const [savedArticles, setSavedArticles] = useState<number[]>();

	function getSavedPosts() {
        var curArray = JSON.parse(localStorage.getItem("savedArticles") || "[]");
        if (curArray == null) {
            localStorage.setItem("savedArticles", JSON.stringify([]));
            curArray = JSON.parse(localStorage.getItem("savedArticles") || "[]"); // re fetch since it was null before
		}
		console.log(curArray);
        return curArray;
    }

    function saveToLocalStorage(id: number) {
        var curArray = JSON.parse(localStorage.getItem("savedArticles") || "[]");
        if (curArray == null) {
            localStorage.setItem("savedArticles", JSON.stringify([]));
            curArray = JSON.parse(localStorage.getItem("savedArticles") || "[]"); // re fetch since it was null before
        }
        curArray.push(id);
        localStorage.setItem("savedArticles", JSON.stringify(curArray));
        console.log(id + " added to saved articles list.");
    }
	
	useEffect(() => {
		setSavedArticles(getSavedPosts());
	}, []);

    return (
        <Fragment>
            {savedArticles && (
                <List style={{ margin: "0 5px" }}>
                    {savedArticles.map((id: number) => (
                        <Fragment key={id}>
                            <Post id={id} />
                        </Fragment>
                    ))}
                </List>
            )}
        </Fragment>
    );
}
