import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";

export default function BottomNav() {
	const [value, setValue] = window.location.href.includes("saved")
		? React.useState(1)
		: React.useState(0); // 0 is front page

	return (
		<BottomNavigation
			value={value}
			onChange={(event, newValue) => {
				console.log("Clicked on " + newValue);

				switch (newValue) {
					case 0:
						// home page
						window.location.replace("/");
						break;

					case 1:
						// saved page
						window.location.replace("/saved");
						break;
				}
			}}
			showLabels
		>
			<BottomNavigationAction label="Front Page" icon={<RestoreIcon />} />
			<BottomNavigationAction
				label="Saved Posts"
				icon={<FavoriteIcon />}
			/>
		</BottomNavigation>
	);
}
