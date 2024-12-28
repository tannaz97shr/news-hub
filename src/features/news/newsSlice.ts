import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchEverything,
  fetchGuardian,
  fetchNYT,
  getNewsApiAuthors,
} from "../../api/newsApi";
import { Article, FetchEverythingParams } from "../../types/general";

interface NewsState {
  articles: Article[];
  authors: string[];
  authorsStatus: "idle" | "loading" | "succeeded" | "failed";
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  authorsError: string | null;
}

const initialState: NewsState = {
  articles: [],
  authors: [],
  authorsStatus: "idle",
  status: "idle",
  error: null,
  authorsError: null,
};

export const fetchEverythingThunk = createAsyncThunk(
  "news/fetchEverything",
  async (params: FetchEverythingParams, { rejectWithValue }) => {
    try {
      const { sources, author } = params;

      if (author?.length) {
        const newsApiArticles = await fetchEverything(params);

        return newsApiArticles.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );
      } else {
        const shouldFetchNewsApi =
          !sources?.length ||
          sources.includes("bbc-news") ||
          sources.includes("cnn");
        const shouldFetchGuardian =
          !sources?.length || sources.includes("The Guardian");
        const shouldFetchNYT =
          !sources?.length || sources.includes("New York Times");

        // Fetch data from APIs based on flags
        const newsApiPromise = shouldFetchNewsApi
          ? fetchEverything(params)
          : Promise.resolve([]);
        const guardianPromise = shouldFetchGuardian
          ? fetchGuardian(params)
          : Promise.resolve([]);
        const nytPromise = shouldFetchNYT
          ? fetchNYT(params)
          : Promise.resolve([]);

        const [newsApiArticles, guardianArticles, nytArticles] =
          await Promise.all([newsApiPromise, guardianPromise, nytPromise]);

        // Combine all articles and sort by date
        const combinedArticles = [
          ...(newsApiArticles || []),
          ...(guardianArticles || []),
          ...(nytArticles || []),
        ].sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );

        return combinedArticles;
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch articles"
      );
    }
  }
);

export const fetchAuthorsThunk = createAsyncThunk(
  "news/fetchAuthors",
  async (_, { rejectWithValue }) => {
    try {
      const authors = await getNewsApiAuthors();
      return authors;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch authors");
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
    builder
      .addCase(fetchAuthorsThunk.pending, (state) => {
        state.authorsStatus = "loading";
        state.authorsError = null;
      })
      .addCase(
        fetchAuthorsThunk.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.authorsStatus = "succeeded";
          state.authors = action.payload;
        }
      )
      .addCase(
        fetchAuthorsThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.authorsStatus = "failed";
          state.authorsError = action.payload;
        }
      );
  },
});

export default newsSlice.reducer;
