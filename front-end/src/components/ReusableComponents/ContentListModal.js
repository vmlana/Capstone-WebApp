import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Modal, Backdrop, Slide, makeStyles } from "@material-ui/core";
import InputWithLabel from "../ReusableElement/InputWithLabel";
import * as FAIcons from "react-icons/fa";

import { lessons } from "../../demoData";

import ContentImageTitle from "./ContentImageTitle";
import Button from "../ReusableElement/Button";
import { check } from "express-validator";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ContentListModal = ({
  open,
  close,
  type,
  renewData,
  results,
  exData,
}) => {
  const classes = useStyles();

  const [newLessonArr, setNewLessonArr] = useState([]);
  const [newPlaylistArr, setNewPlaylistArr] = useState([]);
  const [deletedItem, setDeletedItem] = useState("");

  const handleCheckedElement = (e, checked) => {
    // if (type === "playlist") {
    let checkedList = newLessonArr;

    // console.log(checked, e.target.alt);

    type === "playlist"
      ? checkedList.map((lesson) =>
        lesson.lessonId == e.target.alt
          ? (lesson.isChecked = checked)
          : lesson
      )
      : checkedList.map((playlist) =>
        playlist.playlistId == e.target.alt
          ? (playlist.isChecked = checked)
          : playlist
      );

    if (checked === false) {
      renewData(checkedList, e.target.alt);
    } else {
      renewData(checkedList, null);
    }

    setNewLessonArr(checkedList);
  };

  useEffect(() => {
    if (type === "playlist") {
      let sortedLessonArr = results.map((result) => {
        let check = exData.some(
          (lesson) => result.lessonId === lesson.lessonId
        );

        if (check) {
          return { ...result, isChecked: true };
        } else {
          return { ...result, isChecked: false };
        }
      });

      setNewLessonArr(sortedLessonArr);
    } else {
      // console.log("exData", exData);
      let sortedPlaylistArr = results.map((result) => {
        let check = exData.some(
          (playlist) => result.playlistId === playlist.playlistId
        );

        if (check) {
          return { ...result, isChecked: true };
        } else {
          return { ...result, isChecked: false };
        }
      });

      // console.log("sortedPalylist", sortedPlaylistArr);
      //   setNewPlaylistArr(sortedPlaylistArr);
      setNewLessonArr(sortedPlaylistArr);
    }
  }, [results, exData]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide in={open}>
          <ModalContent>
            <ReactIcon>
              <FAIcons.FaTimesCircle
                onClick={close}
                style={{ cursor: "pointer" }}
                size={40}
              />
            </ReactIcon>

            {type === "playlist" ? <h1>VIDEOS</h1> : <h1>PLAYLISTS</h1>}

            <ContentList>
              {newLessonArr
                ? type === "playlist"
                  ? newLessonArr.map((video, index) => (
                    <ContentImageTitle
                      img={video.imageFile}
                      title={video.lessonName}
                      id={video.lessonId}
                      onClick={handleCheckedElement}
                      checked={video.isChecked}
                      key={index}
                      index={index}
                    />
                  ))
                  : newLessonArr.map((playlist, index) => (
                    <ContentImageTitle
                      img={playlist.imageFile}
                      title={playlist.playlistName}
                      id={playlist.playlistId}
                      onClick={handleCheckedElement}
                      checked={playlist.isChecked}
                      key={index}
                      index={index}
                    />
                  ))
                : null}
            </ContentList>
          </ModalContent>
        </Slide>
      </Modal>
    </div>
  );
};

const ModalContent = styled.div`
  background-color: #fff;
  border: 1px solid #555;
  border-radius: 1rem;
  padding: 3rem;
  box-shadow: none;
  width: 80%;
  height: 60%;
  overflow: scroll;

  :focus {
    outline: none;
  }
`;

const ContentList = styled.div`
  /* display: flex;
  justify-content: "space-between";
  flex-wrap: wrap; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* margin: 1rem 7rem; */
`;

const ReactIcon = styled.div`
  text-align: right;
`;

export default ContentListModal;
