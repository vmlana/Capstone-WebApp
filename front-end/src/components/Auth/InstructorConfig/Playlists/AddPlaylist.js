import React from "react";
import CreateContentList from "../../../ReusableComponents/CreateContentList";

const AddPlaylist = () => {
  return (
    <div style={styles.container}>
      <CreateContentList contentsType={"playlist"} type={"add"} />
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    margin: "0 4rem",
  },
};

export default AddPlaylist;
