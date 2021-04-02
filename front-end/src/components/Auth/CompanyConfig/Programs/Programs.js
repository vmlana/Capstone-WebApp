import React, { useState, useEffect } from "react";
import { getProgramsByCompanyId } from "../../Api/api";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// Reusable Components
import ViewContainer from "../../../ReusableComponents/ViewContainer";

const Programs = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const { userType, authId, accessToken, accessExpiresIn } = userInfo;
  console.log("companyId", authId);

  let viewData = {
    userType: "Company",
    companyId: authId,
    pageName: "Program",
    header: "Programs",
    subHeader: "Click to see details or edit",
    redirectRoute: "add-program",
  };

  const [programs, setPrograms] = useState([]);
  useEffect(() => {
    getProgramsByCompanyId(authId).then((programList) => {
      if (programList !== undefined) {
        setPrograms(programList);
      } else {
        setPrograms([])
      }

    });
  }, []);

  return (
    <div>
      <ViewContainer viewData={viewData} data={programs} />
    </div>
  );
};

export default Programs;
