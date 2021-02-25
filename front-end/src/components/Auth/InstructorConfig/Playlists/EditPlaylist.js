import React from 'react'

const EditPlaylist = (props) => {
    // To access parameters paased: instructorId and playlistId
    const instructorId = props.match.params.instructorId
    const playlistId = props.match.params.playlistId

    // Playlist Data passed with history.push
    const playlistData = props.location.state.DataContent

    return (
        <div>
            Edit Playlist: {playlistData.playlistName}
        </div>
    )
}

export default EditPlaylist
