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
  const { keyword, from, to, page = 1, pageSize = 10 } = params;
  const response = keyword
    ? await newsApi.get<NewsApiResponse>("/everything", {
        params: {
          language: "en",
          q: keyword,
          from,
          to,
          page,
          pageSize,
        },
      })
    : await newsApi.get<NewsApiResponse>("/top-headlines", {
        params: {
          language: "en",
          from,
          to,
          page,
          pageSize,
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
  const { keyword, from, to, page = 1, pageSize = 10 } = params;
  const response = await guardianApi.get("/search", {
    params: {
      q: keyword,
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
  const { keyword, from, to, page = 1 } = params;
  console.log("keyword", keyword);
  const response = keyword
    ? await nytApi.get("/articlesearch.json", {
        params: {
          q: keyword,
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
