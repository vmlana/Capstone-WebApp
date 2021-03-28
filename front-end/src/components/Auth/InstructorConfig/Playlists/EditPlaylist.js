import React from "react";
import CreateContentList from "../../../ReusableComponents/CreateContentList";

const EditPlaylist = (props) => {
  // To access parameters paased: instructorId and playlistId
  const instructorId = props.match.params.instructorId;
  const playlistId = props.match.params.playlistId;

  // Playlist Data passed with history.push
  const playlistData = props.location.state.DataContent;

  return (
    <div style={styles.container}>
      {/* Edit Playlist: {playlistData.playlistName} */}
      <CreateContentList
        type={"edit"}
        contentsType={"playlist"}
        data={playlistData}
      />
    </div>
  );
};

const styles = {
  container: {
    // width: "100%",
    margin: "0 4rem",
  },
};

export default EditPlaylist;
