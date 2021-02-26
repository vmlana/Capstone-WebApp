import React, { useState, useEffect } from "react";

import ContentListModal from "./ContentListModal";
import ContentImageTitle from "./ContentImageTitle";
import InputWithLabel from "../ReusableElement/InputWithLabel";
import Picker from "../ReusableElement/Picker";
import DatePicker from "../ReusableElement/DatePicker";
import DateList from "../ReusableElement/DateList";
import Button from "../ReusableElement/Button";

import TextField from "@material-ui/core/TextField";

import { levels, categories, depts } from "../../demoData";

const CreateContentList = ({ contentType, type }) => {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [freq, setFreq] = useState("");
  const [deptArr, setDeptArr] = useState([]);
  const [deptSwitch, setDeptSwitch] = useState(false);

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

  const addDeptData = (deptName) => {
    setDeptArr((olArr) => [...olArr, deptName]);
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

  console.log("dept arr", deptArr);
  useEffect(() => {}, [deptSwitch]);

  const filteredDeptArr =
    deptArr.length > 0
      ? deptArr.filter((item, index) => deptArr.indexOf(item) === index)
      : null;

  return (
    <div>
      {contentType === "playlist" ? (
        type === "add" ? (
          <div>
            <h1>ADD PLAYLIST</h1>
            <p>
              Get started adding videos to your list. We will post after
              reviewing the content.
            </p>
          </div>
        ) : (
          <div>
            <h1>EDIT PLAYLIST </h1>
            <p>Click to see details or edit.</p>
          </div>
        )
      ) : type === "add" ? (
        <div>
          <h1>ADD PROGRAM</h1>
          <p>
            Get started adding videos to your list. We will post after reviewing
            the content.
          </p>
        </div>
      ) : (
        <div>
          <h1>EDIT PROGRAM </h1>
          <p>Click to see details or edit.</p>
        </div>
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
        {contentType === "playlist" ? (
          <div style={styles.descContainer}>
            <p>Insert Your Description for the playlist</p>
            <textarea
              value={listDescription}
              onChange={listDescChange}
              rows={20}
              cols={60}
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
              <div>
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
            <div>
              {filteredDeptArr !== null
                ? filteredDeptArr.map((dept) => <p>{dept}</p>)
                : null}
            </div>
          </div>
        )}
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
  datePickerContainer: {
    border: "1px solid gray",
    borderRadius: "6px",
  },
  picker: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  descContainer: {
    justifySelf: "center",
  },
  dateNumberPickerContainer: {
    // display: "flex",
    // justifyContent: "flex-start",
    // alignItems: "center",
    // flexWrap: "wrap",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    alignItems: "center",
    gridGap: "1rem",
  },
};

export default CreateContentList;
