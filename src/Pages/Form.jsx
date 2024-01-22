import {
  Grid,
  Typography,
  InputLabel,
  TextField,
  Autocomplete,
  Stack,
  Button,
  Card,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { addData, countryData, setAllFormsData } from "../redux/reducers/formData";
import { useNavigate } from "react-router-dom";

function Form() {

  const navigate = useNavigate();
  // user schema for form
  const userSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must contain minimum 3 characters "),
    age: yup
      .string()
      .required("DOB/Age is required")
      .test(
        "valid-age",
        "Must be a valid date of birth (DD/MM/YYYY) or a positive integer",
        function (value) {
          if (!value) return true; // Allow empty values (e.g., if not required)
          const isDOB = /^\d{2}\/\d{2}\/\d{4}$/.test(value);
          const isPositiveInteger = /^[1-9]\d*$/.test(value);
          return isDOB || isPositiveInteger;
        }
      ),
    sex: yup.string("Must be of string type").required("Sex is required"),
    mobile: yup
      .number()
      .nullable()
      .typeError("Must be a number")
      .max(9999999999, "Phone not more than 10 digits")
      .min(1000000000, "Phone must be of 10 digits"),
    idType: yup.string().oneOf(["Aadhar", "PAN"]),
    issuedId: yup.string().when("idType", (idType, schema) => {
      if (idType == "PAN") {
        return schema
          .required()
          .min(10, "Must be of 10 characters")
          .max(10, "Must be of 10 characters");
      } else if (idType == "Aadhar") {
        return schema
          .nullable()
          .required("Adhar Number is required")
          .typeError("Must be a number")
          .matches(
            /^[2-9][0-9]{11}$/,
            "Aadhar must be 12 digits and not start with 0 or 1"
          );
      }
    }),
  });
  const dispatch = useDispatch();
  const [next, setNext] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    reset: reset2,
  } = useForm();
  const [data, setData] = useState({});
  const onSubmit = (data) => {
    setData(data);
    setNext(true);
    reset();
  };
  const onSubmit2 = (data1) => {
    dispatch(setAllFormsData({ ...data, ...data1, invoiceDate: new Date() }))
    alert("Users data saved successfully!")
    navigate("/all-users")
    //   for storing data in json server
    //   dispatch(addData({ ...data, ...data1 }));
    reset2();
    setNext(false);
    setOption([]);
  };

  const [option, setOption] = useState([]);
  const options = (value) => {
    if (value === "") {
      setOption([]);
    } else {
      dispatch(countryData(value))
        .then((response) =>
          setOption(response?.map((elem) => elem?.name?.common) ?? [])
        )
        .catch((error) => console.log(error));
    }
    return;
  };

  return (
    <Grid container spacing={2} p={4}>
      <Grid
        item
        xs={12}
        sm={12}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Typography variant="h3" color="red">
          Two-Step User Registration Form
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} sx={{ display: "flex", justifyContent: "end", fontWeight: "bold" }}>
        <Typography sx={{ cursor: "pointer", color: "#03A9F4", fontSize: "2rem", "&:hover": { textDecoration: "underline" } }} onClick={() => navigate("/all-users")}>All Users</Typography>
      </Grid>
      {next == false ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            item
            container
            xs={12}
            sx={{
              border: "1px solid #ddd",
              p: 2,
              m: 2,
              alignItems: "center",
            }}
            spacing={2}
          >
            <Grid item xs={12} sm={12}>
              <Typography sx={{ fontWeight: 700 }}>Personal Details</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>
                Name<span style={{ color: "red" }}>*</span>
              </InputLabel>
              <TextField
                name="name"
                fullWidth
                placeholder="Enter Name"
                {...register("name")}
                helperText={errors?.name?.message}
                error={Boolean(errors?.name?.message)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>
                Date of Birth or Age<span style={{ color: "red" }}>*</span>
              </InputLabel>
              <TextField
                name="age"
                fullWidth
                placeholder="DD/MM/YYY or Age in Years"
                {...register("age")}
                helperText={errors?.age?.message}
                error={Boolean(errors?.age?.message)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>
                Sex<span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Autocomplete
                disablePortal
                options={gender}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Sex"
                    {...register("sex")}
                    helperText={errors?.sex?.message}
                    error={Boolean(errors?.sex?.message)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Mobile</InputLabel>
              <TextField
                name="mobile"
                fullWidth
                placeholder="Enter Mobile"
                {...register("mobile")}
                helperText={errors?.mobile?.message}
                error={Boolean(errors?.mobile?.message)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Govt Issued ID</InputLabel>
              <Stack direction="row" spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    disablePortal
                    options={idType}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="ID Type"
                        {...register("idType")}
                        helperText={errors?.idType?.message}
                        error={Boolean(errors?.idType?.message)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    name="issuedId"
                    fullWidth
                    placeholder="Enter Govt ID"
                    {...register("issuedId")}
                    helperText={errors?.issuedId?.message}
                    error={Boolean(errors?.issuedId?.message)}
                  />
                </Grid>
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "end" }}
            >
              <Button variant="contained" type="submit">
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <form onSubmit={handleSubmit2(onSubmit2)}>
          <Grid
            item
            container
            xs={12}
            sx={{
              border: "1px solid #ddd",
              p: 2,
              m: 2,
              alignItems: "center",
            }}
            spacing={2}
          >
            <Grid item xs={12} sm={12}>
              <Typography sx={{ fontWeight: 700 }}>Address Detail</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Address</InputLabel>
              <TextField
                // name="address"
                fullWidth
                placeholder="Enter Address"
                {...register2("address")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>State</InputLabel>
              <TextField
                // name="state"
                fullWidth
                placeholder="Enter State"
                {...register2("state")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>City</InputLabel>
              <TextField
                name="city"
                fullWidth
                placeholder="Enter City"
                {...register2("city")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Country</InputLabel>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={option}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Enter country"
                    {...register2("country", {
                      onChange: (e) => {
                        options(e.target.value);
                      },
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Pincode</InputLabel>
              <TextField
                name="pincode"
                type="number"
                fullWidth
                placeholder="Enter pincode"
                {...register2("pincode")}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "end" }}
            >
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Grid>
  );
}

export default Form;
const gender = ["Male", "Female"];
const idType = ["Aadhar", "PAN"];