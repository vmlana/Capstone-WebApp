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

const ContentListModal = ({ open, close, type }) => {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);
  const [newLessonArr, setNewLessonArr] = useState([]);

  const handleCheckedElement = (e) => {
    let checkedList = newLessonArr;
    checkedList.forEach((lesson) =>
      lesson.title === e.target.alt
        ? (lesson.isChecked = !lesson.isChecked)
        : lesson
    );

    console.log("inside handleCheckedElem", newLessonArr);
    setNewLessonArr(checkedList);
  };

  useEffect(() => {
    lessons.map((lesson) => (lesson.isChecked = false));
    setNewLessonArr(lessons);

    console.log("useEffect rendered");
  }, []);

  console.log(lessons);
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
                size={20}
              />
            </ReactIcon>

            {type === "playlist" ? <h1>VIDEOS</h1> : <h1>PLAYLISTS</h1>}

            <ContentList>
              {lessons
                ? lessons.map((video, index) => (
                    <ContentImageTitle
                      img={video.img}
                      title={video.title}
                      onClick={handleCheckedElement}
                      checked={video.isChecked}
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

  :focus {
    outline: none;
  }
`;

const ContentList = styled.div`
  display: flex;
  justify-content: "space-between";
  flex-wrap: wrap;
  margin: 1rem 7rem;
`;

const ReactIcon = styled.div`
  text-align: right;
`;

export default ContentListModal;
