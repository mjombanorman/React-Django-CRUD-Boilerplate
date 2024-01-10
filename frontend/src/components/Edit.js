import React from "react";
import { Box, Button, Typography } from "@mui/material";
import MyDatePicker from "./forms/MyDatePicker";
import MySelectField from "./forms/MySelectField";
import MyTextField from "./forms/MyTextField";
import MyTextAreaField from "./forms/MyTextAreaField";
import { set, useForm } from "react-hook-form";
import api from "./helpers/Gateway";
import Dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Edit = () => {
  const [loading, setLoading] = useState(true);
  const [myData, setMyData] = useState();
  const myParam = useParams();
  const myID = myParam.id;

  const getData = () => {
    api.get(`project/${myID}`).then((res) => {
      setMyData(res.data);
      setValue("name", res.data.name);
      setValue("status", res.data.status);
      setValue("start_date", Dayjs(res.data.start_date));
      setValue("end_date", Dayjs(res.data.end_date));
      setValue("comment", res.data.comment);
      console.log(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    console.log(myID);
    getData();
  }, []);
  const navigate = useNavigate();

  const defaultValues = {
    name: "",
    comments: "",
    status: "",
  };

  const { handleSubmit, setValue, control } = useForm({
    defaultValues: defaultValues,
  });

  const submit = (data) => {
    api
      .put(`project/${myID}/`, {
        name: data.name,
        status: data.status,
        start_date: Dayjs(data.start_date["$d"]).format("YYYY-MM-DD"),
        end_date: Dayjs(data.end_date["$d"]).format("YYYY-MM-DD"),
        comment: data.comment,
      })
      .then((res) => navigate("/"));
  };

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
          Edit Records
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
          <form onSubmit={handleSubmit(submit)}>
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
            <Button variant="outlined" type="submit" sx={{ marginTop: "20px" }}>
              Save
            </Button>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default Edit;
