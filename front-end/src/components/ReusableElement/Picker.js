import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Picker = ({ label, option, onChange, exValue, purpose, type }) => {
  const classes = useStyles();
  const [catValue, setCatValue] = useState("");
  const [levValue, setLevValue] = useState("");
  const [value, setValue] = useState("");
  const [valueL, setValueL] = useState("");

  const handleChange = (event) => {
    if (type === "cat" && purpose === "set") {
      setCatValue(event.target.value);
    } else if (type === "level" && purpose === "set") {
      setLevValue(event.target.value);
    } else {
      setValue(event.target.value);
    }

    onChange(event.target.value);
  };

  useEffect(() => {
    if (exValue && type === "cat") {
      setCatValue(exValue);
    } else if (exValue && type === "level") {
      setLevValue(exValue);
    }
  }, []);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        {label}
      </InputLabel>

      {type === "level" && purpose === "set" ? (
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={levValue}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          {option
            ? option.map((item, key) => (
                <MenuItem key={key} value={item.level}>
                  {item.level}
                </MenuItem>
              ))
            : null}
        </Select>
      ) : type === "cat" && purpose === "set" ? (
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={catValue}
          onChange={handleChange}
          className={classes.selectEmpty}
        >
          {option
            ? option.map((item, key) => (
                <MenuItem key={key} value={item.categoryId}>
                  {item.name}
                </MenuItem>
              ))
            : null}
        </Select>
      ) : (
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={value}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          {option
            ? option.map((item, key) => (
                <MenuItem key={key} value={item.categoryId}>
                  {item.name}
                </MenuItem>
              ))
            : null}
        </Select>
      )}
    </FormControl>
  );
};

export default Picker;
