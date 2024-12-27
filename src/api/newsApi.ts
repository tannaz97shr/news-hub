import axios from "axios";
import {
  Article,
  FetchEverythingParams,
  NewsApiResponse,
} from "../types/general";

// News API
const newsApi = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: {
    "X-Api-Key": `${process.env.REACT_APP_NEWS_API_KEY}`,
  },
});

// The Guardian API
const guardianApi = axios.create({
  baseURL: "https://content.guardianapis.com",
});

// New York Times API
const nytApi = axios.create({
  baseURL: "https://api.nytimes.com/svc/search/v2",
});

// Fetch news from NewsAPI
export const fetchEverything = async (
  params: FetchEverythingParams
): Promise<Article[]> => {
  const {
    keyword,
    from,
    to,
    page = 1,
    pageSize = 10,
    category,
    sources,
  } = params;

  // Define the category-specific keywords
  const categoryKeywords: Record<string, string[]> = {
    technology: ["tech", "AI", "software", "computers"],
    sports: ["football", "cricket", "NBA", "soccer"],
    health: ["health", "wellness", "medicine"],
  };

  // Get the category keywords if a category is provided
  const categoryQuery = category
    ? categoryKeywords[category]?.join(" OR ")
    : "";

  const response =
    keyword || categoryQuery
      ? await newsApi.get<NewsApiResponse>("/everything", {
          params: {
            language: "en",
            q: keyword || categoryQuery, // Include either the keyword or category keywords
            from,
            to,
            page,
            pageSize,
            sources,
          },
        })
      : await newsApi.get<NewsApiResponse>("/top-headlines", {
          params: {
            language: "en",
            from,
            to,
            page,
            pageSize,
            sources,
          },
        });

  return response.data.articles.map((article: any) => ({
    title: article.title,
    url: article.url,
    urlToImage: article.urlToImage,
    source: article.source.name,
    publishedAt: article.publishedAt,
  }));
};

// Fetch news from The Guardian API
export const fetchGuardian = async (
  params: FetchEverythingParams
): Promise<Article[]> => {
  const { keyword, from, to, page = 1, pageSize = 10, category } = params;
  // Define the category-specific keywords for The Guardian
  const categoryKeywords: Record<string, string[]> = {
    technology: ["tech", "AI", "software", "computers"],
    sports: ["football", "cricket", "NBA", "soccer"],
    health: ["health", "wellness", "medicine"],
  };

  // Get the category keywords if a category is provided
  const categoryQuery = category
    ? categoryKeywords[category]?.join(" OR ")
    : "";

  // If a category filter is applied, append it to the keyword search
  const searchQuery =
    keyword || categoryQuery ? (keyword || "") + " " + categoryQuery : "";

  const response = await guardianApi.get("/search", {
    params: {
      q: searchQuery.trim(),
      fromDate: from,
      toDate: to,
      page,
      "page-size": pageSize,
      "api-key": process.env.REACT_APP_GUARDIAN_API_KEY,
    },
  });
  return response.data.response.results.map((article: any) => ({
    title: article.webTitle,
    url: article.webUrl,
    urlToImage: null, // Guardian doesn't always provide images
    source: "The Guardian",
    publishedAt: article.webPublicationDate,
  }));
};

// Fetch news from New York times API
export const fetchNYT = async (
  params: FetchEverythingParams
): Promise<Article[]> => {
  const { keyword, from, to, page = 1, category } = params;
  const categoryKeywords: Record<string, string[]> = {
    technology: ["tech", "AI", "software", "computers"],
    sports: ["football", "cricket", "NBA", "soccer"],
    health: ["health", "wellness", "medicine"],
  };

  // Get the category-specific keywords if a category is provided
  const categoryQuery = category
    ? categoryKeywords[category]?.join(" OR ")
    : "";

  // Prepare the keyword query (use the provided keyword or category keywords)
  const query = keyword || categoryQuery ? keyword || categoryQuery : "";

  // Request to NYT API
  const response = query
    ? await nytApi.get("/articlesearch.json", {
        params: {
          q: query, // Use either keyword or category-based query
          begin_date: from?.replace(/-/g, ""), // NYT requires YYYYMMDD format
          end_date: to?.replace(/-/g, ""),
          page,
          "api-key": process.env.REACT_APP_NYT_API_KEY,
        },
      })
    : await nytApi.get("/articlesearch.json", {
        params: {
          begin_date: from?.replace(/-/g, ""), // NYT requires YYYYMMDD format
          end_date: to?.replace(/-/g, ""),
          page,
          "api-key": process.env.REACT_APP_NYT_API_KEY,
        },
      });
  return response.data.response.docs.map((article: any) => ({
    title: article.headline.main,
    url: article.web_url,
    urlToImage: null, // NYT doesn't always provide images
    source: "New York Times",
    publishedAt: article.pub_date,
  }));
};
