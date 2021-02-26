import React from "react";

import CreateContentList from "../../../ReusableComponents/CreateContentList";

const AddProgram = () => {
  return (
    <div style={styles.container}>
      <CreateContentList type={"add"} contentType={"program"} />
    </div>
  );
};

const styles = {
  container: {
    width: "80%",
    margin: "0 auto",
  },
};

export default AddProgram;
