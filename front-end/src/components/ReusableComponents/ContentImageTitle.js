import { StylesProvider } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import * as Icon from "react-icons/ai";

const ContentImageTitle = ({ img, title, onClick, checked, index }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {}, [checked]);

  console.log(checked);
  return (
    <div style={styles.container} key={checked}>
      {checked ? <Icon.AiOutlineCheck size={20} style={styles.icon} /> : null}
      <div>
        <img
          style={styles.img}
          src={img}
          alt={title}
          id={index + 1}
          onClick={onClick}
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
