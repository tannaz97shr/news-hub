export interface Article {
  title: string;
  url: string;
  urlToImage: string | null;
  source: string;
  publishedAt: string;
  author?: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface FetchEverythingParams {
  keyword?: string;
  from?: string;
  to?: string;
  sources?: string[];
  page?: number;
  pageSize?: number;
  category?: string[];
  author?: string[];
}

export interface IOption {
  value: string;
  label: string;
}
