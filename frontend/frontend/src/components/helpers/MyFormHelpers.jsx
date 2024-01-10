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


  const schema = yup
    .object({
      name: yup.string().required("Name is required"),
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