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

  console.log(levels);

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
      <div>
        {type === "playlist" ? (
          <InputWithLabel label={"Playlist Name"} />
        ) : (
          <InputWithLabel label={"Program Name"} />
        )}
        <Picker label={"Category"} option={categories} />
        <Picker label={"Level"} option={levels} />
        <Button
          text={"See available Lessons"}
          type={"modal"}
          onClick={handleOpen}
        />
        <ContentListModal
          open={open}
          close={handleClose}
          type={"playlist"}
          renewData={renewDataArray}
        />
        <div>
          <p>Playlists</p>
          <div>
            {selectedData.map((data) => (
              <div style={styles.contentList}>
                <div>
                  <img src={data.img} alt={data.title} />
                </div>
                <span>{data.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  contentList: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
  },
};

export default CreateContentList;
