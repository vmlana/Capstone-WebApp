import React, { useState, useEffect } from "react";

import ContentListModal from "./ContentListModal";
import InputWithLabel from "../ReusableElement/InputWithLabel";
import Picker from "../ReusableElement/Picker";
import DatePicker from "../ReusableElement/DatePicker";
import DateList from "../ReusableElement/DateList";
import Button from "../ReusableElement/Button";

import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { levels, categories, depts, surveys } from "../../demoData";
import {
  getCategories,
  getPlaylistsByCategoryId,
  getLessonsByCategoryId,
  getLessonsByCategoryIdandInstructorId,
  createPlaylist,
} from "../Auth/Api/api";

import { device } from "../StyleComponent/responsiveDevice";

const CreateContentList = ({ contentsType, type, data }) => {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [freq, setFreq] = useState("");
  const [deptArr, setDeptArr] = useState([]);
  const [deptSwitch, setDeptSwitch] = useState(false);
  const [cat, setCat] = useState("");
  const [catLists, setCatLists] = useState([]);
  const [level, setLevel] = useState("");
  const [catSet, setCatSet] = useState("");
  const [levelSet, setLevelSet] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [contentType, setContentType] = useState("");
  const [survey, setSurvey] = useState("Program 1 Survey - Program Evaluation");

  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const { authId } = userInfo;
  //   console.log("instructorId", authId);

  // console.log(deptArr);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const renewDataArray = (dataArr, deletedId) => {
    let newArr = dataArr.filter((data) => data.isChecked === true);
    let concatArr = selectedData.concat(newArr);
    const uniqueLessons =
      contentType === "playlist"
        ? [
            ...concatArr
              .reduce((map, obj) => map.set(obj.lessonId, obj), new Map())
              .values(),
          ]
        : [
            ...concatArr
              .reduce((map, obj) => map.set(obj.playlistId, obj), new Map())
              .values(),
          ];

    const finalFilteredData =
      contentType === "playlist"
        ? uniqueLessons.filter((item) => item.lessonId != deletedId)
        : uniqueLessons.filter((item) => item.playlistId != deletedId);

    setSelectedData(finalFilteredData);
  };

  const addDeptData = (deptName) => {
    setDeptArr((olArr) => [...olArr, deptName]);
    setDeptSwitch(!deptSwitch);
  };
  const deleteDeptData = (deptName) => {
    const filteredArr = deptArr.filter((dept) => dept !== deptName);
    setDeptArr(filteredArr);
    setDeptSwitch(!deptSwitch);
  };

  const listNameChange = (e) => {
    setListName(e.target.value);
  };

  const listDescChange = (e) => {
    setListDescription(e.target.value);
  };
  const freqChange = (e) => {
    setFreq(e.target.value);
  };

  const onCatClick = (val) => {
    setCat(val);
  };
  const onLevelClick = (val) => {
    setLevel(val);
  };

  const onCatSetClick = (id) => {
    setCatSet(id);
  };
  const onLevelSetClick = (val) => {
    setLevelSet(val);
  };

  const onSurveyChange = (val) => {
    setSurvey(val);
  };

  const sendDataToServer = () => {
    const dataToSend = {
      ...data,
      action: "upd",
      lessons: selectedData,
      playlistDescription: listDescription,
      playlistName: listName,
      playlistLevel: levelSet,
      categoryId: catSet,
      active: 1,
    };

    createPlaylist(dataToSend);
  };

  //   const dataToSend = {
  //     ...data,
  //     action: "upd",
  //     lessons: selectedData,
  //     playlistDescription: listDescription,
  //     playlistName: listName,
  //     playlistLevel: levelSet,
  //     categoryId: catSet,
  //     active: 1,
  //   };
  //   console.log("datatisend", dataToSend);

  useEffect(() => {
    if (contentsType === "playlist") {
      if (type === "edit") {
        setSelectedData(data.lessons);
        setContentType("playlist");
        setListName(data.playlistName);
        setListDescription(data.playlistDescription);
        setCatSet(data.categoryId);
        setLevelSet(data.playlistLevel);
      } else {
        setSelectedData([]);
        setContentType("playlist");
      }
    } else {
      if (type === "edit") {
        setSelectedData(data.playlists);
        setContentType("program");
        setCatSet(data.categoryId);
        setLevelSet(data.playlistLevel);
      } else {
        setSelectedData([]);
        setContentType("program");
      }
    }

    // console.log(data);

    getCategories().then((result) => setCatLists(result));
  }, []);

  useEffect(() => {
    // console.log("cat", cat);
    contentsType === "playlist"
      ? getLessonsByCategoryIdandInstructorId(cat, authId).then((result) =>
          setSearchResults(result)
        )
      : getPlaylistsByCategoryId(cat).then((result) =>
          setSearchResults(result)
        );
  }, [cat]);

  const filteredDeptArr =
    deptArr.length > 0
      ? deptArr.filter((item, index) => deptArr.indexOf(item) === index)
      : null;

  console.log(selectedData);

  return (
    <ContentListContainer>
      {contentType === "playlist" ? (
        type === "add" ? (
          <div>
            <div className="titleContainer">
              <h1 className="pageHeader">Add Playlist</h1>
            </div>
            <h3 className="pageSubHeader">
              Get started adding videos to your list. We will post after
              reviewing the content.
            </h3>
          </div>
        ) : (
          <div>
            <div className="titleContainer">
              <h1 className="pageHeader">Edit Playlist</h1>
            </div>
            <h3 className="pageSubHeader">Click to see details or edit.</h3>
          </div>
        )
      ) : type === "add" ? (
        <div>
          <div className="titleContainer">
            <h1 className="pageHeader">Add Program</h1>
          </div>
          <h3 className="pageSubHeader">
            Get started adding videos to your list. We will post after reviewing
            the content.
          </h3>
        </div>
      ) : (
        <div>
          <div className="titleContainer">
            <h1 className="pageHeader">Edit Program</h1>
          </div>
          <h3 className="pageSubHeader">Click to see details or edit.</h3>
        </div>
      )}
      <div style={styles.biggerContainer}>
        <div>
          {contentType === "playlist" ? (
            <InputWithLabel
              label={"Playlist Name"}
              onChange={listNameChange}
              value={listName}
            />
          ) : (
            <InputWithLabel
              label={"Program Name"}
              onChange={listNameChange}
              value={listName}
            />
          )}
          <div>
            <p>Filter</p>
            <FilterContainer>
              {catLists.length > 0 ? (
                <Picker
                  label={"Category"}
                  option={catLists}
                  onChange={onCatClick}
                  purpose={"search"}
                  type={"cat"}
                />
              ) : null}
              <Picker
                label={"Level"}
                option={levels}
                onChange={onLevelClick}
                purpose={"search"}
                type={"level"}
              />
              {contentType === "playlist" ? (
                <Button
                  text={"See available Lessons"}
                  type={"modal"}
                  onClick={handleOpen}
                />
              ) : (
                <Button
                  text={"See available Playlists"}
                  type={"modal"}
                  onClick={handleOpen}
                />
              )}
            </FilterContainer>
          </div>

          {searchResults !== undefined ? (
            <ContentListModal
              open={open}
              close={handleClose}
              type={contentType}
              renewData={renewDataArray}
              results={searchResults}
              exData={selectedData}
            />
          ) : (
            <p>No match </p>
          )}

          <div>
            <p>Playlists</p>
            <div style={styles.contentList}>
              {selectedData.length === 0
                ? null
                : contentType === "playlist"
                ? selectedData.map((data) => (
                    <div style={styles.addedContentList}>
                      <ImageWrapper>
                        <img
                          src={data.imageFile}
                          alt={data.lessonName}
                          style={{
                            borderRadius: "3px",
                          }}
                        />
                      </ImageWrapper>
                      <span>{data.lessonName}</span>
                    </div>
                  ))
                : selectedData.map((data) => (
                    <div style={styles.addedContentList}>
                      {/* {console.log('Latest: ', data)} */}
                      <ImageWrapper>
                        <img
                          src={data.imageFile}
                          alt={data.playlistName}
                          style={{
                            borderRadius: "3px",
                          }}
                        />
                      </ImageWrapper>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: 12,
                            color: "black",
                          }}
                        >
                          {data.playlistName}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                          }}
                        >
                          {data.lessons.length}
                        </span>
                      </div>
                      <span
                        style={{
                          display: "block",
                          fontSize: 12,
                          fontStyle: "italic",
                          margin: "3px 0 3px",
                        }}
                      >
                        {data.instructorName}
                      </span>
                      <span
                        style={{
                          display: "block",
                          fontSize: 12,
                        }}
                      >
                        {data.playlistLevel}
                      </span>
                    </div>
                  ))}
            </div>
          </div>
          <div style={styles.actionBtns}>
            <Button
              text={"Save"}
              size={"med"}
              type={"edit"}
              onClick={sendDataToServer}
            />
            <Button
              text={"Delete"}
              size={"med"}
              type={"edit"}
              purpose={"delete"}
            />
          </div>
        </div>

        {contentType === "playlist" ? (
          <div style={styles.descContainer}>
            <Picker
              label={"Set Category"}
              option={catLists}
              exValue={catSet}
              onChange={onCatSetClick}
              purpose={"set"}
              type={"cat"}
            />
            {/* {console.log("levelset", levelSet)} */}
            <Picker
              label={"Set Level"}
              option={levels}
              exValue={levelSet}
              onChange={onLevelSetClick}
              purpose={"set"}
              type={"level"}
            />
            <p>Insert Your Description for the playlist</p>
            <textarea
              value={listDescription}
              onChange={listDescChange}
              rows={20}
              cols={40}
              style={{
                padding: "20px",
                color: "gray",
                boxSizing: "border-box",

                width: "100%",
              }}
            />
          </div>
        ) : (
          <div>
            <p>Program Plan </p>
            <div style={styles.dateNumberPickerContainer}>
              <DatePicker
                id={"avialable-from"}
                label={"Period Availble from"}
              />
              <DatePicker id={"avialable-to"} label={"to"} />
              <div style={{ alignSelf: "end" }}>
                <TextField
                  style={styles.freq}
                  label="Frequency"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={freqChange}
                  value={freq}
                />
              </div>
            </div>
            <p>Days Of Week</p>
            <div style={styles.datePickerContainer}>
              <DateList />
            </div>
            <p>Target Departments</p>
            <Picker label={""} option={depts} onChange={addDeptData} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              {filteredDeptArr !== null
                ? filteredDeptArr.map((dept, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "rgba(118, 98, 165, .8)",
                        borderRadius: 30,
                        padding: "5px 10px",
                        width: "auto",
                        marginBottom: "10px",
                        color: "white",
                      }}
                    >
                      <span style={{ marginRight: "1rem" }}>{dept}</span>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteDeptData(dept)}
                      >
                        x
                      </span>
                    </div>
                  ))
                : null}
            </div>
            <p style={{ marginTop: "2rem" }}>Survey</p>
            <Picker
              label={"Survey Name - Survey Type"}
              option={surveys}
              type={"survey"}
              onChange={onSurveyChange}
            />
          </div>
        )}
      </div>
    </ContentListContainer>
  );
};

const styles = {
  biggerContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: "10rem",
  },
  contentList: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridColumnGap: "3rem",
    gridRowGap: "3rem",
    border: ".5px solid gray",
    minHeight: "300px",
    padding: "1.5rem",
    overFlow: "hidden",
  },
  addedContentList: {
    // margin: "1rem",
  },
  datePickerContainer: {
    border: "1px solid gray",
    borderRadius: "6px",
  },
  picker: {
    // display: "flex",
    // justifyContent: "flex-start",
    // alignItems: "center",
    display: "grid",
    gridTemplateColumns: "1fr .7fr 1fr",
  },
  descContainer: {
    justifySelf: "center",
  },
  dateNumberPickerContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    alignItems: "center",
    gridGap: "1rem",

    // display: "flex",
    // justifyContent: "space-between",
    // aligneItems: "center",
  },
  actionBtns: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "3rem",
  },
};

const ContentListContainer = styled.div`
  /* max-width: 1500px;
    margin: 0 auto; */
  padding: 2rem;
  padding-top: 4.5rem;
  color: #707070;
  font-family: "GothamRoundedNormal", sans-serif;

  .titleContainer {
    position: relative;
    border-bottom: solid 2px #707070;
    margin-bottom: 1rem;

    @media ${device.mobileP} {
      max-width: 400px;
    }
  }

  .pageHeader {
    font-size: 30px;
    line-height: 36px;
    position: absolute;
    top: -2.5rem;
    background-color: #fff;
    padding-right: 2rem;
    text-transform: uppercase;
    font-family: GothamRoundedBold, sans-serif;
    font-weight: 900;
    color: #707070;
  }

  .pageSubHeader {
    font-size: 18px;
    line-height: 30px;
    font-family: "Gotham", sans-serif;
    font-weight: 300;
    margin: 0;
    padding: 0;
    padding-top: 16px;
  }
`;

const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.7fr 1fr;
`;

const ImageWrapper = styled.div`
  border-radius: 3px;
`;

export default CreateContentList;
