import React from "react";

import { useForm } from "react-hook-form";
import api from "../helpers/Gateway";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import Dayjs from "dayjs";
import schema from "../helpers/MyFormHelpers";
import FormFields from "./_FormFields";

const MyForm = ({ submit, defaultValues, isEdit, myID }) => {
  const [myData, setMyData] = useState();
  const [loading, setLoading] = useState(true);
  const [projectManager, setProjectManager] = useState([]);

  const options = [
    { id: "", name: "none" },
    { id: "open", name: "Open" },
    { id: "in progress", name: "In Progress" },
    { id: "closed", name: "Closed" },
  ];

  const getData = async () => {
    try {
      let projectManagerData = [];
      if (isEdit) {
        const [managerRes, projectRes] = await Promise.all([
          api.get(`project_manager/`),
          api.get(`project/${myID}`),
        ]);
        setMyData(projectRes.data);
        setValue("name", projectRes.data.name);
        setValue("project_manager", projectRes.data.project_manager);
        setValue("status", projectRes.data.status);
        setValue("start_date", Dayjs(projectRes.data.start_date));
        setValue("end_date", Dayjs(projectRes.data.end_date));
        setValue("comment", projectRes.data.comment);
        projectManagerData = managerRes.data;
      } else {
        const managerRes = await api.get(`project_manager/`);
        projectManagerData = managerRes.data;
      }
      setProjectManager(projectManagerData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [myID]);

  const { handleSubmit, setValue, control } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <FormFields
          handleSubmit={handleSubmit}
          submit={submit}
          projectManager={projectManager}
          control={control}
          isEdit={isEdit}
          options={options}
        />
      )}
    </div>
  );
};

export default MyForm;
