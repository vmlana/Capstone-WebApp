import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import * as Icon from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "column wrap",
    maxHeight: "200px",
    margin: "0.5rem",
    cursor: "pointer",
  },
}));

const styles = {
  selector: {
    border: "1px light gray",
    "&hover": {
      backgroundColor: "gray",
    },
  },
  icon: {
    position: "absolute",
    top: 5,
    right: 10,
  },
  checkbox: {
    width: "20px",
    height: "20px",
    border: "1px solid gray",
  },
};

const days = [
  { day: "Sunday", selected: false },
  { day: "Monday", selected: false },
  { day: "Tuesday", selected: false },
  { day: "Wednesday", selected: false },
  { day: "Thursday", selected: false },
  { day: "Friday", selected: false },
  { day: "Saturday", selected: false },
];
// const daysArr2 = ["Thursday", "Friday", "Saturday"];

const DateList = () => {
  const classes = useStyles();

  const [selected, setSelected] = useState(false);
  const [daysArr, setDaysArr] = useState(days);

  const dateClicked = (day) => {
    let newDaysArr = daysArr;
    newDaysArr.forEach((item) =>
      item.day === day ? (item.selected = !item.selected) : item
    );

    setDaysArr(newDaysArr);
    setSelected(!selected);
  };

  useEffect(() => {}, [selected]);

  return (
    <List component="div" className={classes.root} aria-label="mailbox folders">
      {daysArr.map((item, index) =>
        item.day === "Sunday" ||
        item.day === "Monday" ||
        item.day === "Tuesday" ||
        item.day === "Wednesday" ? (
          index === 3 ? (
            <div>
              <ListItem
                key={index}
                onClick={() => dateClicked(item.day)}
                style={{ borderRight: "1px solid gray" }}
              >
                {item.selected ? (
                  <Icon.AiOutlineCheck size={30} style={styles.icon} />
                ) : null}
                <ListItemText primary={item.day} />
                <div style={styles.checkbox}></div>
              </ListItem>
            </div>
          ) : (
            <div>
              <ListItem
                divider
                key={index}
                onClick={() => dateClicked(item.day)}
                style={{ borderRight: "1px solid gray" }}
              >
                {item.selected ? (
                  <Icon.AiOutlineCheck size={30} style={styles.icon} />
                ) : null}
                <ListItemText primary={item.day} />
                <div style={styles.checkbox}></div>
              </ListItem>
            </div>
          )
        ) : (
          <div>
            <ListItem divider key={index} onClick={() => dateClicked(item.day)}>
              {item.selected ? (
                <Icon.AiOutlineCheck size={30} style={styles.icon} />
              ) : null}
              <ListItemText primary={item.day} />
              <div style={styles.checkbox}></div>
            </ListItem>
          </div>
        )
      )}
    </List>
  );
};

export default DateList;
