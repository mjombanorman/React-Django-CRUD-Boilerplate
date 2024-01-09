import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";

export default function MySelectField(props) {

  const { label, name, control } = props;



  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              onChange={onChange}
              value={value}
              label={label}
              name={name}>
              <MenuItem value={"open"}>Open</MenuItem>
              <MenuItem value={"in-progress"}>In Progress</MenuItem>
              <MenuItem value={"closed"}>Closed</MenuItem>
            </Select>
          )}
        />
      </FormControl>
    </Box>
  );
}
