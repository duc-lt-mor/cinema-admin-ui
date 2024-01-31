import {
  DEFAULT_SCREENING_LIMIT,
  DEFAULT_SCREENING_PAGE,
} from "@/app/screening/constants/pagination-configs.constant";
import { createSlice } from "@reduxjs/toolkit";

const screeningSlice = createSlice({
  name: "screening",
  initialState: {
    currentPage: DEFAULT_SCREENING_PAGE,
    currentLimit: DEFAULT_SCREENING_LIMIT,
  },
  reducers: {
    setCurrentPage(
      state,
      action: { type: string; payload: { currentPage: string } },
    ) {
      state.currentPage = action.payload.currentPage;
    },
    setCurrentLimit(
      state,
      action: { type: string; payload: { currentLimit: string } },
    ) {
      state.currentLimit = action.payload.currentLimit;
    },
  },
});

const screeningReducer = screeningSlice.reducer;

export const { setCurrentPage, setCurrentLimit } = screeningSlice.actions;
export default screeningReducer;
