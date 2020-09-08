import React, { Fragment, useState, useEffect } from "react";
import SavedPost from "../components/SavedPost";
import { Container, List, Typography } from "@material-ui/core";

export default function SavedPosts() {
    const [savedItems, setsavedItems] = useState<number[]>();

    function getSavedPosts() {
        var curArray = JSON.parse(localStorage.getItem("savedItems") || "[]");
        if (curArray == null) {
            localStorage.setItem("savedItems", JSON.stringify([]));
            curArray = JSON.parse(localStorage.getItem("savedItems") || "[]"); // re fetch since it was null before
        }
        console.log(curArray);
        return curArray;
    }

    function saveToLocalStorage(id: number) {
        var curArray = JSON.parse(localStorage.getItem("savedItems") || "[]");
        if (curArray == null) {
            localStorage.setItem("savedItems", JSON.stringify([]));
            curArray = JSON.parse(localStorage.getItem("savedItems") || "[]"); // re fetch since it was null before
        }
        curArray.push(id);
        localStorage.setItem("savedItems", JSON.stringify(curArray));
        console.log(id + " added to saved articles list.");
    }

    useEffect(() => {
        setsavedItems(getSavedPosts());
    }, []);

    return (
        <Fragment>
            {savedItems && savedItems.length != 0 ? (
                <List style={{ margin: "0 5px" }}>
                    {savedItems.map((id: number) => (
                        <Fragment key={id}>
                            <SavedPost id={id} />
                        </Fragment>
                    ))}
                </List>
            ) : (
                <Container>
                    <Typography variant="h5" align="center" style={{ marginTop: "3rem" }}>
                        No saved articles found.
                    </Typography>
                    <Typography variant="body1" align="center" style={{ marginTop: "1rem" }}>
                        You can add some by clicking the on the save button to the right of a story. All saved stories
                        are added to your local storage.
                    </Typography>
                </Container>
            )}
        </Fragment>
    );
}
