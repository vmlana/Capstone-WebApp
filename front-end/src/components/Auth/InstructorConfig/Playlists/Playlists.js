import React, { useState, useEffect } from "react";
import { getPlaylistsByInstructorId } from "../../Api/api";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// Reusable Components
import ViewContainer from "../../../ReusableComponents/ViewContainer";

const Playlists = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const { userType, authId, accessToken, accessExpiresIn } = userInfo;
  console.log("instructorId", authId);

  let viewData = {
    userType: "Instructor",
    instructorId: authId,
    pageName: "Playlist",
    header: "Playlists",
    subHeader: "Click to see details or edit",
    redirectRoute: "add-playlist",
  };

  //   I am passind insructor ID2 just to test data transaction bw front and back end. Pass authId as an argument to the fetch func when deploying.
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    getPlaylistsByInstructorId(authId).then((playlistArr) => {
      setPlaylists(playlistArr);
    });
  }, []);

  return (
    <div>
      <ViewContainer viewData={viewData} data={playlists} />
    </div>
  );
};

export default Playlists;
