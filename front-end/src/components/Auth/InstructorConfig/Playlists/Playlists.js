import React, { useState, useEffect } from 'react';
import { getPlaylistsByInstructorId } from '../../Api/api'

// Reusable Components
import ViewContainer from '../../../ReusableComponents/ViewContainer';

const Playlists = () => {
	let viewData = {
		userType: 'Instructor',
		instructorId: '2',
		pageName: 'Playlist',
		header: 'Playlists',
		subHeader: 'Click to see details or edit',
		redirectRoute: 'add-playlist',
	}

	const [playlists, setPlaylists] = useState([]);
	useEffect(() => {
		getPlaylistsByInstructorId(2).then(
			playlistArr => {
				setPlaylists(playlistArr)
			}
		)
	}, [])

	return (
		<div>
			<ViewContainer viewData={viewData} data={playlists} />
		</div>
	);
};

export default Playlists;
