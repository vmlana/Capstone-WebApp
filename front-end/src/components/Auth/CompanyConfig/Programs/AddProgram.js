import React from "react";

import CreateContentList from "../../../ReusableComponents/CreateContentList";

const AddProgram = () => {
  return (
    <div style={styles.container}>
      <CreateContentList type={"add"} contentsType={"program"} />
    </div>
  );
};

const styles = {
  container: {
    margin: "0 4rem",
  },
};

export default AddProgram;
