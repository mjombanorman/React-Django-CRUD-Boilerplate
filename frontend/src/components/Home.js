import { React, useMemo, useEffect, useState } from "react";
import api from "./helpers/Gateway";
import { MaterialReactTable } from "material-react-table";
import { set } from "react-hook-form";
import Dayjs from "dayjs";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
const Home = () => {
  const [myData, setMyData] = useState();
  const [loading, setLoading] = useState(true);

  const getData = () => {
    api.get(`project/`).then((res) => {
      setMyData(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
      },
      {
        accessorKey: "comments", //normal accessorKey
        header: "Comments",
        size: 200,
      },
      {
        accessorFn: (row) => Dayjs(row.start_date).format("DD, MMM YYYY"), //custom accessor function with dot notation for nested data)
        header: "Start Date",
        size: 150,
      },
      {
        accessorFn: (row) => Dayjs(row.end_date).format("DD, MMM YYYY"),
        header: "End Date",
        size: 150,
      },
    ],
    []
  );

  return (
    <div>
      {loading ? (
        <p>Loading....</p>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={myData}
          enableRowActions
          renderRowActions={({ row }) => (
            <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
              <IconButton color="secondary"component={Link} to={`edit/${row.original.id}`}>
                <EditIcon />
              </IconButton>

              <IconButton color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        />
      )}
    </div>
  );
};

export default Home;
