import { Grid, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import Tables from '../components/Tables';
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const navigate = useNavigate()
  const TaskData = useSelector((state) => state.TaskData);
  const { allFormsData } = TaskData;

  console.log(allFormsData);
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sm={12}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Typography variant="h3" color="red">
          All Users
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} sx={{ display: "flex", justifyContent: "end", fontWeight: "bold" }}>
        <Typography sx={{ cursor: "pointer", color: "#03A9F4", fontSize: "2rem", "&:hover": { textDecoration: "underline" } }} onClick={() => navigate("/")}>Add User</Typography>
      </Grid>
      <Grid item xs={12} sm={12} sx={{ borderRadius: "10px", padding: 2, border: "1px solid #8080809e" }}>
        <Tables data={allFormsData} />
      </Grid>
    </Grid>
  )
}

export default AllUsers