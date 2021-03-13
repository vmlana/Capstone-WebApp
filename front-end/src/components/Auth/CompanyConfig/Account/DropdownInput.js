import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styled from "styled-components";

import { apiUrl } from '../../../../services/apiUrl';

import './DropdownInput.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
    margin: 0,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    border: "solid 1px #ccc",
    "border-radius": "5px",
    "padding-left": ".5rem",
    "padding-top": ".075rem",
    "padding-bottom": ".075rem",
    "margin-top": 0,
    height: 46,
        "&:before" : {
        content: "none", // Delete border when hoverover
    },
    "&:after": {
        border: "none" // Delete border when select the input
    }    
  },
}));

export default function DropdownInput(props) {
  const classes = useStyles();
  const [departmentName, setDepartmentName] = React.useState('');
  const [departmentNameList, setDepartmentNameList] = useState([]);

  const handleChange = (event) => {
    setDepartmentName(event.target.value);
  };

  useEffect( async()=>{
    const departments = await fetch(`${apiUrl}/departments`).then(results => {
      return results.json();
    }).catch(error=> {
      console.log(error);
    })
    // console.log(departments);
    setDepartmentNameList(departments);
  },[])

  useEffect(()=>{
    props.onChange(departmentName);
  }, [departmentName])

  return (
    <Label className="AccountDropdownInput">
      <LabelText>{props.labelText}</LabelText>
      <FormControl className={classes.formControl}>
        <Select
          value={departmentName}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="" disabled>
            Choose Departments
          </MenuItem>
          {
            departmentNameList.map(department=>{
              return (
              <MenuItem key={department.workDepartmentId} value={department.name}>{department.name}</MenuItem>)
            })
          }
        </Select>
      </FormControl>
    </Label>
  );
}

const Label = styled.label`
    margin: 0rem 0rem .25rem 0;
    width: 33%;
`;

const LabelText = styled.p`
    font-size: 1rem;
    margin: .5rem 0;
    text-align: left;
`;
