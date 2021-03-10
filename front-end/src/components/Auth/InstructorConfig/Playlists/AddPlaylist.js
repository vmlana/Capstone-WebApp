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
    width: "80%",
    margin: "0 auto",
  },
};

export default AddPlaylist;
