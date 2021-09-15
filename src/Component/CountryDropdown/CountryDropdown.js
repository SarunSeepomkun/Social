import React, { useState, useEffect } from "react";
import ContryList from "./CountryList.json";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

const CountryDropdown = ({ country, setCountry, selfProfile }) => {
  const [contry_name, setCountry_name] = useState("");

  useEffect(() => {
    if (country !== "") {
      let result = ContryList.find((el) => el.code === country);
      setCountry_name(result?.name);
    }
  }, [country]);

  return (
    <div>
      {selfProfile === true ? (
        <FormControl>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {ContryList.map(({ name, code }) => (
              <MenuItem value={code}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <label className="form-label">{ contry_name }</label>
      )}
    </div>
  );
};

export default CountryDropdown;
