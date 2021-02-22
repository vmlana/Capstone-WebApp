import { StylesProvider } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import * as Icon from "react-icons/ai";

const ContentImageTitle = ({ img, title, onClick, checked, index }) => {
  const [isChecked, setIsChecked] = useState(false);

  const switcher = (e) => {
    setIsChecked(!isChecked);
    onClick(e, !isChecked);
  };

  useEffect(() => {
    setIsChecked(checked);
    console.log("smaller useEffect rendered");
  }, []);

  return (
    <div style={styles.container}>
      {isChecked ? <Icon.AiOutlineCheck size={20} style={styles.icon} /> : null}
      <div>
        <img
          style={styles.img}
          src={img}
          alt={title}
          id={index + 1}
          onClick={switcher}
        />
      </div>
      <span style={styles.title}>{title}</span>
    </div>
  );
};

const styles = {
  container: {
    width: "30%",
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
