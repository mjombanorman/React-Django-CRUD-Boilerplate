import React from "react";
import { Box, Button, Typography } from "@mui/material";
import MyDatePicker from "./forms/MyDatePicker";
import MySelectField from "./forms/MySelectField";
import MyTextField from "./forms/MyTextField";
import MyTextAreaField from "./forms/MyTextAreaField";
import { useForm } from "react-hook-form";
import api from "./helpers/Gateway";
import Dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
const Create = () => {
  const [projectManager, setProjectManager] = useState();
  const [loading, setLoading] = useState(true);
  const options = [
    { id: "", name: "none" },
    { id: "open", name: "Open" },
    { id: "in progress", name: "In Progress" },
    { id: "closed", name: "Closed" },
  ];
  const getData = () => {
    api.get(`project_manager/`).then((res) => {
      setProjectManager(res.data);
      setLoading(false);
      console.log(res.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();
  const defaultValues = {
    name: "",
    comments: "",
    status: "",
  };
  const schema = yup
    .object({
      name: yup.string().required("Name is required"),
      project_manager: yup.string().required("Project Manager is required"),
      status: yup.string().required("Status is required"),
      comment: yup.string(),
      start_date: yup.date().required("Start Date is required"),
      end_date: yup
        .date()
        .required("End Date is required")
        .min(
          yup.ref("start_date"),
          "End date cannot be greater than start date"
        ),
    })
    .required();

  const { handleSubmit, control } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const submit = (data) => {
    api
      .post(`project/`, {
        name: data.name,
        project_manager: data.project_manager,
        status: data.status,
        start_date: Dayjs(data.start_date["$d"]).format("YYYY-MM-DD"),
        end_date: Dayjs(data.end_date["$d"]).format("YYYY-MM-DD"),
        comment: data.comment,
      })
      .then((res) => navigate("/"));
  };

  return (
    <div>
      {loading ? (
        <p>Loading....</p>
      ) : (
        <>
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
                <MyDatePicker
                  label="End Date"
                  control={control}
                  name="end_date"
                />
                <MySelectField
                  label="Status"
                  options={options}
                  control={control}
                  name="status"
                />
                <MySelectField
                  label="Project Manager"
                  options={projectManager}
                  control={control}
                  name="project_manager"
                />
                <MyTextAreaField
                  label="Comment"
                  control={control}
                  name="comment"
                />
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{ marginTop: "20px" }}>
                  Save
                </Button>
              </form>
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};

export default Create;
