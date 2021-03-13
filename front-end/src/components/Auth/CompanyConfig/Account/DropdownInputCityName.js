import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
    margin: 0,
    marginBottom: "1rem",
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
  const [cityName, setCityName] = useState('');
  const [cityNameList, setCityNameList] = useState([]);

  const handleChange = (event) => {
    setCityName(event.target.value);
  };

  useEffect( async()=>{
    const cities = await fetch(`http://localhost:3000/api/v1/cities`).then(results => {
      return results.json();
    }).catch(error=> {
      console.log(error);
    })
    // console.log(cities);
    // console.log(props.currentCityName);
    const currentCity = cities.filter(city=>{
      return city.cityName === props.currentCityName;
    })
    // console.log(currentCity);
    if(currentCity.length > 0) {
      setCityName(currentCity[0].cityId);
    }
    setCityNameList(cities);
  },[props.currentCityName])

  useEffect(()=>{
    props.onChange(cityName);
  }, [cityName])

  return (
    <Label className="AccountDropdownInput">
      <LabelText>{props.labelText}</LabelText>
      <FormControl className={classes.formControl}>
        <Select
          value={cityName}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="" disabled>
            Choose city
          </MenuItem>
          {
            cityNameList.map(city=>{
              return (
              <MenuItem key={city.cityId} value={city.cityId}>{city.cityName}</MenuItem>)
            })
          }
        </Select>
      </FormControl>
    </Label>
  );
}

const Label = styled.label`
    margin: 0rem 0rem .25rem 0;
    /* width: 33%; */
`;

const LabelText = styled.p`
    font-size: 1rem;
    margin: .5rem 0;
    text-align: left;
`;
