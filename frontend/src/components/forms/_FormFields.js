import { Button, Grid } from "@mui/material";
import MyDatePicker from "./MyDatePicker";
import MySelectField from "./MySelectField";
import MyTextField from "./MyTextField";
import MyTextAreaField from "./MyTextAreaField";

const FormFields = ({handleSubmit,submit,projectManager,control,isEdit,options}) => {
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container width={"60%"} spacing={3}>
          <Grid item xs={12}>
            <MyTextField
              label="Name"
              placeholder="Name"
              control={control}
              name="name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyDatePicker
              label="Start Date"
              control={control}
              name="start_date"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyDatePicker label="End Date" control={control} name="end_date" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MySelectField
              label="Status"
              options={options}
              control={control}
              name="status"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MySelectField
              label="Project Manager"
              options={projectManager}
              control={control}
              name="project_manager"
            />
          </Grid>
          <Grid item xs={12}>
            <MyTextAreaField label="Comment" control={control} name="comment" />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="outlined"
              type="submit"
              sx={{
                marginTop: "20px",
                width: "30%",
                display: "flex",
                alignItems: "left",
              }}>
              {isEdit ? "Update" : "Save"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default FormFields;
