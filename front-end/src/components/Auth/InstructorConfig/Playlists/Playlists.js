import React from "react";
import { useHistory } from 'react-router-dom';

const Playlists = () => {
	const history = useHistory();
	return (
		<div>
			<button onClick={() => history.push("/auth/add-playlist")}>Add New Playlist</button>
		</div>
	);
};

export default Playlists;
