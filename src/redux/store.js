import { configureStore } from "@reduxjs/toolkit";
import sliceFormData from "./reducers/formData";

export const reduxStore = configureStore({
  reducer: {
    TaskData: sliceFormData,
  },
});
