import React, { useState } from "react";

import ContentListModal from "./ContentListModal";
import ContentImageTitle from "./ContentImageTitle";
import InputWithLabel from "../ReusableElement/InputWithLabel";
import Picker from "../ReusableElement/Picker";
import Button from "../ReusableElement/Button";

import { levels, categories } from "../../demoData";

const CreateContentList = ({ type }) => {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const renewDataArray = (dataArr) => {
    let newArr = dataArr.filter((data) => data.isChecked === true);
    setSelectedData(newArr);
  };

  const listNameChange = (e) => {
    setListName(e.target.value);
  };

  const listDescChange = (e) => {
    setListDescription(e.target.value);
  };

  return (
    <div>
      {type === "playlist" ? (
        <div>
          <h1>EDIT PLAYLIST </h1>
          <p>
            Get started adding videos to your list. We will post after reviewing
            the content.
          </p>
        </div>
      ) : (
        <h1>PROGRAMS</h1>
      )}
      <div style={styles.biggerContainer}>
        <div>
          {type === "playlist" ? (
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
          <div style={styles.picker}>
            <Picker label={"Category"} option={categories} />
            <Picker label={"Level"} option={levels} />
            <Button
              text={"See available Lessons"}
              type={"modal"}
              onClick={handleOpen}
            />
          </div>
          <ContentListModal
            open={open}
            close={handleClose}
            type={"playlist"}
            renewData={renewDataArray}
          />
          <div>
            <p>Playlists</p>
            <div style={styles.contentList}>
              {selectedData.map((data) => (
                <div style={styles.addedContentList}>
                  <div>
                    <img src={data.img} alt={data.title} />
                  </div>
                  <span>{data.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={styles.descContainer}>
          <p>Insert Your Description for the playlist</p>
          <textarea
            value={listDescription}
            onChange={listDescChange}
            rows={20}
            cols={60}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  biggerContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "3rem",
  },
  contentList: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
    border: "1px solid black",
    minHeight: "300px",
    padding: "1rem",
  },
  addedContentList: {
    // margin: "1rem",
  },
  picker: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  descContainer: {
    justifySelf: "center",
  },
};

export default CreateContentList;
