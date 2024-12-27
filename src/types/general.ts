export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
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
  sources?: string;
  page?: number;
  pageSize?: number;
}
