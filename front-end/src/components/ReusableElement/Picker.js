import React, { useState } from "react";
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

const Picker = ({ label, option }) => {
  const classes = useStyles();
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-placeholder-label-label"
        id="demo-simple-select-placeholder-label"
        value={value}
        onChange={handleChange}
        displayEmpty
        className={classes.selectEmpty}
      >
        {option
          ? option.map((item, key) =>
              label === "Level" ? (
                <MenuItem key={key} value={item.level}>
                  {item.level}
                </MenuItem>
              ) : label === "Category" ? (
                <MenuItem key={key} value={item.name}>
                  {item.name}
                </MenuItem>
              ) : null
            )
          : null}
      </Select>
    </FormControl>
  );
};

export default Picker;
