import { StylesProvider } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import * as Icon from "react-icons/ai";

import SingleContentModal from "./SingleContentModal";

const ContentImageTitle = ({ img, title, onClick, checked, index, id }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [miniOpen, setMiniOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");

  const miniModalOpen = () => {
    setMiniOpen(true);
    setTimeout(() => {
      setMiniOpen(false);
    }, 1000);
  };

  const switcher = (e) => {
    setIsChecked(!isChecked);
    onClick(e, !isChecked);
    miniModalOpen();
  };

  useEffect(() => {
    setIsChecked(checked);
    setSelectedTitle(title);
  }, []);

  return (
    <div style={styles.container}>
      {isChecked ? <Icon.AiOutlineCheck size={40} style={styles.icon} /> : null}
      <div>
        <img
          style={styles.img}
          src={img}
          alt={id}
          id={index + 1}
          onClick={switcher}
        />
      </div>
      <span style={styles.title}>{title}</span>
      <SingleContentModal
        open={miniOpen}
        name={selectedTitle}
        added={isChecked}
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "1rem",
    position: "relative",
  },
  img: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  title: {
    display: "block",
  },
  icon: {
    position: "absolute",
    top: 1,
    right: 1,
  },
};

export default ContentImageTitle;
