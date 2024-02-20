import {
  DEFAULT_FILM_LIMIT,
  DEFAULT_FILM_PAGE,
} from "@/app/film/constants/pagination-configs.constant";
import { TFilmFilter } from "@/types/film.type";
import { createSlice } from "@reduxjs/toolkit";

const filmSlice = createSlice({
  name: "film",
  initialState: {
    pagination: {
      page: +DEFAULT_FILM_PAGE,
      limit: +DEFAULT_FILM_LIMIT,
    },
    filter: {} as TFilmFilter,
  },
  reducers: {
    setFilmFilter(state, action: { type: string; payload: TFilmFilter }) {
      state.filter = action.payload;
    },
    setFilmPagination(
      state,
      action: {
        type: string;
        payload: { page: number; limit: number };
      },
    ) {
      state.pagination = action.payload;
    },
  },
});

const filmReducer = filmSlice.reducer;

export const { setFilmFilter, setFilmPagination } = filmSlice.actions;
export default filmReducer;
