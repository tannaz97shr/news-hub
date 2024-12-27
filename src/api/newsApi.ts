import axios from "axios";
import { FetchEverythingParams, NewsApiResponse } from "../types/general";

const newsApi = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: {
    "X-Api-Key": `${process.env.REACT_APP_NEWS_API_KEY}`,
  },
});

export default newsApi;

export const fetchEverything = async (
  params: FetchEverythingParams
): Promise<NewsApiResponse> => {
  const { keyword, from, to, sources, page = 1, pageSize = 10 } = params;
  try {
    const response = await newsApi.get<NewsApiResponse>("/everything", {
      params: {
        language: "en",
        ...(sources && { sources }),
        ...(keyword && { q: keyword }),
        ...(from && { from }),
        ...(to && { to }),
        page,
        pageSize,
        // apiKey: process.env.REACT_APP_NEWS_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    throw error;
  }
};
