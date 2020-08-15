import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Skeleton from '@material-ui/lab/Skeleton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { deepOrange } from '@material-ui/core/colors';

import {
	List as VirtualizedList,
	WindowScroller,
	AutoSizer,
	ListRowProps,
	CellMeasurer,
	CellMeasurerCache,
	InfiniteLoader,
} from 'react-virtualized';

import { CellMeasurerCacheInterface } from 'react-virtualized/dist/es/CellMeasurer';

import Post from '../components/Post';
import StorySubmission from '../components/StorySubmission';

interface FirebaseItemViewInterface {
	id: number;
	deleted: boolean;
	type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
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
	allItems: FirebaseItemViewInterface[];
}

const useStyles = makeStyles((theme: Theme) => ({
	scoreAvatar: {
		marginRight: theme.spacing(2),
		width: theme.spacing(6),
		height: theme.spacing(6),
		backgroundColor: deepOrange[500],
	},
}));

export default class Posts extends React.Component<PostsPropsInterface, PostStateInterface> {
	cache: CellMeasurerCache;

	constructor(props: PostsPropsInterface) {
		super(props);
		this.state = {
			allIds: [],
			allItems: [],
		};

		this.cache = new CellMeasurerCache({
			fixedWidth: true,
			defaultHeight: 100,
		});

		// Yeah it's this shit we have to do with react components again...
		this.rowRenderer = this.rowRenderer.bind(this);
	}

	componentDidMount = () => {
		let fetchedItems: FirebaseItemViewInterface[] = [];
		let allIds: number[] = [];

		let URL: string = 'https://hacker-news.firebaseio.com/v0/' + this.props.category + '.json';

		fetch(URL)
			.then((response) => response.json())
			.then((allIds) => {
				let allItems: FirebaseItemViewInterface[] = [];
				this.setState({ allIds: allIds });

				allIds.forEach(async (id: number) => {
					let itemURL: string =
						'https://hacker-news.firebaseio.com/v0/item/' + allIds[id] + '.json';
					return fetch(itemURL)
						.then((response) => response.json())
						.then((response) => allItems.push(response));
				});
				return { allIds, allItems };
			});

		/*
		fetch(URL)
			.then((response) => response.json())
			.then((response) => this.setState({ allIds: response }));
		*/
	};

	rowRenderer({
		columnIndex,
		index, // Index of row
		isScrolling, // The List is currently being scrolled
		isVisible, // This row is visible within the List (eg it is not an overscanned row)
		key, // Unique key within array of rendered rows
		parent, // Reference to the parent List (instance)
		style, // Style object to be applied to row (to position it);
	}: // This must be passed through to the rendered row element.
	ListRowProps) {
		const id: number = this.state.allIds[index];

		// If row content is complex, consider rendering a light-weight placeholder while scrolling.

		/*
		const content = isScrolling ? (
			<Fragment>
				<Divider />
				<ListItem>
					<ListItemAvatar>
						<Skeleton animation={false} variant='circle' height={48} width={48} />
					</ListItemAvatar>
					<ListItemText
						primary={
							<Fragment>
								<Skeleton animation={false} width='190px' />
								<Skeleton animation={false} width='90px' />
							</Fragment>
						}
						secondary={<Skeleton animation={false} width='250px' />}
					/>
				</ListItem>
			</Fragment>
		) : (
			<Post key={'list-item-article-' + id} id={id} />
		);
		*/

		const content = (
			<Fragment>
				<Post key={'item-' + id} id={id} />
			</Fragment>
		);

		// Style is required since it specifies how the row is to be sized and positioned.
		// React Virtualized depends on this sizing/positioning for proper scrolling behavior.
		// By default, the List component provides following style properties:
		//    position
		//    left
		//    top
		//    height
		//    width
		// You can add additional class names or style properties as you would like.
		// Key is also required by React to more efficiently manage the array of rows.
		return (
			<CellMeasurer
				key={key}
				cache={this.cache}
				parent={parent}
				columnIndex={columnIndex}
				rowIndex={index}>
				{/* I don't know why but adding style breaks everything */}
				{/* <div style={style}>{content}</div> */}
				<div>{content}</div>
			</CellMeasurer>
		);
	}

	render() {
		return (
			<Fragment>
				{this.state.allIds && (
					<Fragment>
						{/* 
						<List>
							{this.state.allIds.slice(0, 30).map((id: number) => (
								<Post key={'item-' + id} id={id} />
							))}
						</List>
						*/}
						<List>
							<WindowScroller>
								{({
									height,
									isScrolling,
									registerChild,
									onChildScroll,
									scrollTop,
								}) => (
									<AutoSizer disableHeight>
										{({ width }) => (
											<div ref={registerChild}>
												<VirtualizedList
													autoHeight
													width={width}
													height={height}
													deferredMeasurementCache={this.cache}
													rowHeight={this.cache.rowHeight}
													rowRenderer={this.rowRenderer}
													rowCount={this.state.allIds.length}
													isScrolling={isScrolling}
													onScroll={onChildScroll}
													scrollTop={scrollTop}
													overscanRowCount={60}
												/>
											</div>
										)}
									</AutoSizer>
								)}
							</WindowScroller>
						</List>
					</Fragment>
				)}
			</Fragment>
		);
	}
}
