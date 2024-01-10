import React from "react";
import { Typography } from "@mui/material";
import api from "./helpers/Gateway";
import Dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import MyForm from "./forms/_MyForm";

const Create = () => {
  const navigate = useNavigate();

  const defaultValues = {
    name: "",
    comment: "",
    status: "",
    start_date: "",
    end_date: "",
  };

  const submit = async (data) => {
    try {
      console.log(data);
      await api.post(`project/`, {
        // ... your post request data
        name: data.name,
        project_manager: data.project_manager,
        status: data.status,
        start_date: Dayjs(data.start_date["$d"]).format("YYYY-MM-DD"),
        end_date: Dayjs(data.end_date["$d"]).format("YYYY-MM-DD"),
        comment: data.comment,
      });
      navigate("/"); // Redirect after successful submission
    } catch (error) {
      console.error(error);
      // Handle error scenarios
    }
  };

  return (
    <div>
      <Typography
        variant="h5"
        sx={{ paddingBottom: "1%", textAlign: "left" }}
        gutterBottom>
        Create New Record
      </Typography>
      {/* Pass necessary props including 'submit' function and 'defaultValues' */}
      <MyForm submit={submit} defaultValues={defaultValues} />
    </div>
  );
};

export default Create;
