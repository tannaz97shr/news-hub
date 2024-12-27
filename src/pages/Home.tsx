import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import { fetchEverythingThunk } from "../features/news/newsSlice";
import { AppDispatch, RootState } from "../store";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, status, error } = useSelector(
    (state: RootState) => state.news
  );

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const formatDate = (date: Date) =>
      `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    const { innerWidth: width } = window;
    const pageSize: number = width > 1279 ? 30 : width > 766 ? 20 : 10;

    const keyword = searchParams.get("keyword") || "technology";
    const from = searchParams.get("from") || formatDate(yesterday);
    const to = searchParams.get("to") || formatDate(today);
    const page = parseInt(searchParams.get("page") || "1", 10);

    dispatch(
      fetchEverythingThunk({
        keyword,
        from,
        to,
        page,
        pageSize,
      })
    );
  }, [dispatch, searchParams]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <NewsCard
          key={article.title}
          title={article.title}
          img={article.urlToImage || ""}
          srcName={article.source.name}
          publishedAt={article.publishedAt}
        />
      ))}
    </div>
  );
};

export default Home;
