import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const formData = createSlice({
  name: "TaskData",
  initialState: {
    allFormsData: [],
    countryName: [],
  },
  reducers: {
    setAllFormsData: (state, action) => {
      state.allFormsData = [...state.allFormsData, action.payload];
    },
    setCountry: (state, action) => {
      state.countryName = action.payload;
    },
  },
});

export function addData(data) {
  return async () => {
    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res;
  };
}

export function countryData(name) {
  return async () => {
    // const dispatch = useDispatch();
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    // dispatch(formData.actions.setCountry(response));
    return response.json();
  };
}

export const { setAllFormsData } = formData.actions;
export default formData.reducer;
