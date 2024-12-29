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
    author,
  } = params;

  const categoryKeywords: Record<string, string[]> = {
    technology: ["tech", "AI", "software", "computers"],
    sports: ["football", "cricket", "NBA", "soccer"],
    health: ["health", "wellness", "medicine"],
  };

  const categoryQuery = category?.length
    ? category
        .map((cat) => categoryKeywords[cat]?.join(" OR "))
        .filter(Boolean)
        .join(" OR ")
    : "";

  const shouldFetchWithParams =
    (keyword && keyword.trim().length > 0) ||
    (categoryQuery && categoryQuery.trim().length > 0) ||
    (sources && sources.length > 0);

  const sourcesQuery =
    sources && sources.length > 0 ? sources.join(",") : "bbc-news,cnn";

  if (author && author.length > 0) {
    const response = await newsApi.get<NewsApiResponse>("/everything", {
      params: {
        language: "en",
        from,
        to,
        page,
        pageSize: 20,
        sources: "bbc-news,cnn",
      },
    });

    const articles = response.data.articles.map((article: any) => ({
      title: article.title,
      url: article.url,
      urlToImage: article.urlToImage,
      source: article.source.name,
      publishedAt: article.publishedAt,
      author: article.author,
    }));
    return articles.filter((article) =>
      author.some(
        (auth) =>
          article.author &&
          article.author.toLowerCase().includes(auth.toLowerCase())
      )
    );
  }

  const response = shouldFetchWithParams
    ? await newsApi.get<NewsApiResponse>("/everything", {
        params: {
          language: "en",
          q: keyword || categoryQuery,
          from,
          to,
          page,
          pageSize,
          sources: sourcesQuery,
        },
      })
    : await newsApi.get<NewsApiResponse>("/everything", {
        params: {
          language: "en",
          from,
          to,
          page,
          pageSize,
          sources: "bbc-news,cnn",
        },
      });

  const articles = response.data.articles.map((article: any) => ({
    title: article.title,
    url: article.url,
    urlToImage: article.urlToImage,
    source: article.source.name,
    publishedAt: article.publishedAt,
    author: article.author,
  }));

  return articles;
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
  const categoryQuery = category?.length
    ? category
        .map((cat) => categoryKeywords[cat]?.join(" OR "))
        .filter(Boolean)
        .join(" OR ")
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
  const { keyword, from, to, page = 1, category, pageSize = 9 } = params;
  const categoryKeywords: Record<string, string[]> = {
    technology: ["tech", "AI", "software", "computers"],
    sports: ["football", "cricket", "NBA", "soccer"],
    health: ["health", "wellness", "medicine"],
  };

  const categoryQuery = category?.length
    ? category
        .map((cat) => categoryKeywords[cat]?.join(" OR "))
        .filter(Boolean)
        .join(" OR ")
    : "";

  const query = [keyword, categoryQuery].filter(Boolean).join(" OR ");
  // Calculate the offset to get the correct page
  const offset = (page - 1) * pageSize;

  // Request to NYT API
  const response = query
    ? await nytApi.get("/articlesearch.json", {
        params: {
          q: query, // Use either keyword or category-based query
          begin_date: from?.replace(/-/g, ""), // NYT requires YYYYMMDD format
          end_date: to?.replace(/-/g, ""),
          page,
          offset: offset,
          "api-key": process.env.REACT_APP_NYT_API_KEY,
        },
      })
    : await nytApi.get("/articlesearch.json", {
        params: {
          begin_date: from?.replace(/-/g, ""),
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

export const getNewsApiAuthors = async (): Promise<string[]> => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  try {
    const res = await newsApi.get<NewsApiResponse>(
      "https://newsapi.org/v2/everything",
      {
        params: {
          language: "en",
          from: formatDate(yesterday),
          to: formatDate(today),
          page: 1,
          pageSize: 20,
          sources: "bbc-news,cnn",
        },
      }
    );
    const articles = res.data.articles;
    const authors = Array.from(
      new Set(
        articles
          .map((article) => article.author)
          .filter((author): author is string => typeof author === "string") // Type narrowing
      )
    );

    return authors;
  } catch (error) {
    console.error("Failed to fetch authors:", error);
    return [];
  }
};

export const fetchTopHeadlines = async (): Promise<Article[]> => {
  try {
    const response = await newsApi.get<NewsApiResponse>("/top-headlines", {
      params: {
        sources: "bbc-news,cnn",
        pageSize: 5,
        language: "en",
      },
    });

    return response.data.articles.map((article: any) => ({
      title: article.title,
      url: article.url,
      urlToImage: article.urlToImage,
      source: article.source.name,
      publishedAt: article.publishedAt,
      author: article.author,
    }));
  } catch (error: any) {
    console.error("Failed to fetch top headlines:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch top headlines"
    );
  }
};
