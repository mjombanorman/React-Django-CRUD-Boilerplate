import React from "react";
import { Box, Button, Typography } from "@mui/material";
import MyDatePicker from "./forms/MyDatePicker";
import MySelectField from "./forms/MySelectField";
import MyTextField from "./forms/MyTextField";
import MyTextAreaField from "./forms/MyTextAreaField";
import { useForm } from "react-hook-form";
const Create = () => {
  const { handleSubmit, reset, setValue, control } = useForm();

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          backgroundColor: "lightblue",
          marginBottom: "10px",
        }}>
        <Typography sx={{ marginLeft: "20px", color: "#d01500" }}>
          Create Records
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          border: "2px solid gray",
          paddng: "20px",
          flexDirection: "column",
        }}>
        <Box
          sx={{
            padding: "20px",
          }}>
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <MyTextField
              label="Name"
              placeholder="Name"
              control={control}
              name="name"
            />
            <MyDatePicker
              label="Start Date"
              control={control}
              name="start_date"
            />
            <MyDatePicker label="End Date" control={control} name="end_date" />
            <MySelectField label="Status" control={control} name="status" />
            <MyTextAreaField label="Comment" control={control} name="comment" />
            <Button variant="outlined" type="submit" sx={{marginTop:"20px"}}
                    >
   
              Save
            </Button>
         
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default Create;
