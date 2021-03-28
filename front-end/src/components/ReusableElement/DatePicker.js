import "date-fns";
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker as DatePickerOriginal,
} from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";

const DatePicker = ({ id, label }) => {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          {label}
        </InputLabel>
        <DatePickerOriginal
          //   disableToolbar
          inputVariant="outlined"
          //   variant="inline"
          format="MM/dd/yyyy"
          //   margin="normal"
          id={id}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          //   style={{ pdding: 0 }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DatePicker;
