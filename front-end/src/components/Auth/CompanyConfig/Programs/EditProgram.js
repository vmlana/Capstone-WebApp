import React from "react";
import CreateContentList from "../../../ReusableComponents/CreateContentList";

const EditProgram = (props) => {
  console.log(props);
  // To access parameters paased: companyId and programId
  const companyId = props.match.params.companyId;
  const programId = props.match.params.programId;

  // Program Data passed with history.push
  const programData = props.location.state.DataContent;

  return (
    <div style={styles.container}>
      {/* Edit Program: {programData.programName}
      {console.log(programData)} */}
      <CreateContentList
        type={"edit"}
        contentsType={"program"}
        data={programData}
      />
    </div>
  );
};

const styles = {
  container: {
    width: "80%",
    margin: "0 auto",
  },
};

export default EditProgram;
