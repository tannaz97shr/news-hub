import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchEverything, fetchGuardian, fetchNYT } from "../../api/newsApi";
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
      const [newsApiArticles, guardianArticles, nytArticles] =
        await Promise.all([
          fetchEverything(params),
          fetchGuardian(params),
          fetchNYT(params),
        ]);

      // Combine and sort articles by date
      const combinedArticles = [
        ...newsApiArticles,
        ...guardianArticles,
        ...nytArticles,
      ].sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

      return combinedArticles;
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
