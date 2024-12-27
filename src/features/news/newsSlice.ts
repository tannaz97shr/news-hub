import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchEverything } from "../../api/newsApi";
import { Article, FetchEverythingParams } from "../../types/general";

interface NewsState {
  articles: Article[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  status: "idle",
  error: null,
};

export const fetchEverythingThunk = createAsyncThunk(
  "news/fetchEverything",
  async (params: FetchEverythingParams, { rejectWithValue }) => {
    try {
      const data = await fetchEverything(params);
      return data.articles;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch articles"
      );
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEverythingThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchEverythingThunk.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.status = "succeeded";
          state.articles = action.payload;
        }
      )
      .addCase(
        fetchEverythingThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export default newsSlice.reducer;
