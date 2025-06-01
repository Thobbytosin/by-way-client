import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: null,
  courses: null,
  coursesFree: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCoursesFree: (state, action) => {
      state.coursesFree = action.payload;
    },
  },
});

export const { setCoursesFree } = courseSlice.actions;

export default courseSlice.reducer;
