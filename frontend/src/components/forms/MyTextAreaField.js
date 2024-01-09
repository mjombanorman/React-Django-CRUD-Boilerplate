import * as React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export default function MyTextAreaField(props) {
  const { label, placeholder, name, control } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          onChange={onChange}
          value={value}
           
          label={label}
          placeholder={placeholder}
          multiline
          id="outlined-basic"
          variant="outlined"
          rows={4}
        />
      )}
    />
  );
}
