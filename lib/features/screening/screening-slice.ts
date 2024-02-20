import {
  DEFAULT_SCREENING_LIMIT,
  DEFAULT_SCREENING_PAGE,
} from "@/app/screening/constants/pagination-configs.constant";
import { TScreeningFilter } from "@/types/screening.type";
import { createSlice } from "@reduxjs/toolkit";

const screeningSlice = createSlice({
  name: "screening",
  initialState: {
    pagination: {
      page: +DEFAULT_SCREENING_PAGE,
      limit: +DEFAULT_SCREENING_LIMIT,
    },
    filter: {} as TScreeningFilter,
  },
  reducers: {
    setScreeningPagination(
      state,
      action: {
        type: string;
        payload: { page: number; limit: number };
      },
    ) {
      state.pagination = action.payload;
    },
    setScreeningFilter(
      state,
      action: { type: string; payload: TScreeningFilter },
    ) {
      state.filter = action.payload;
    },
  },
});

const screeningReducer = screeningSlice.reducer;

export const { setScreeningPagination, setScreeningFilter } =
  screeningSlice.actions;
export default screeningReducer;
