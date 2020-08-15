import React, { useState, useEffect, Fragment } from 'react';
import { List, Typography } from '@material-ui/core';
import Post from '../components/Post';
import Skeleton from '@material-ui/lab/Skeleton';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';

// @ts-ignore
import { InfiniteScroll } from 'react-simple-infinite-scroll';

import {
	List as VirtualizedList,
	WindowScroller,
	AutoSizer,
	ListRowProps,
	CellMeasurer,
	CellMeasurerCache,
} from 'react-virtualized';

const Posts = (props: { category: string }) => {
	const { category } = props;
	const [ids, setIds] = useState<number[]>([]);
	const [cursor, setCursor] = useState<number>(25);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const URL = 'https://hacker-news.firebaseio.com/v0/' + category + '.json';
		fetch(URL)
			.then((response) => response.json())
			.then((response) => {
				setIds(response);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log('Error: ' + error);
			});
	}, []);

	function loadMore() {
		console.log('LOADING MORE');
		setIsLoading(true);
		setCursor(cursor + 25);
		setIsLoading(false);
	}

	return (
		<InfiniteScroll
			throttle={100}
			threshold={300}
			isLoading={isLoading}
			hasMore={!(cursor === ids.length - 1)}
			onLoadMore={loadMore}>
			<Fragment>
				{ids && !isLoading ? (
					ids.slice(0, cursor).map((id: number) => (
						<Fragment>
							<Post key={'story-' + id} id={id} />
						</Fragment>
					))
				) : (
					<Fragment>
						<CircularProgress />
					</Fragment>
				)}
			</Fragment>
		</InfiniteScroll>
	);
};

export default Posts;
