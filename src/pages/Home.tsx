import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import Filter from "../components/Filter";
import NewsCard from "../components/NewsCard";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { setLoading } from "../features/loading/loadingSlice";
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
    const pageSize: number = width > 1279 ? 7 : width > 766 ? 7 : 4;

    const savedSource = Cookies.get("preferredSources");
    const savedCategory = Cookies.get("preferredCategories");
    const savedAuthor = Cookies.get("preferredAuthors");

    const parsedSources = savedSource ? JSON.parse(savedSource) : [];
    const parsedCategories = savedCategory ? JSON.parse(savedCategory) : [];
    const parsedAuthors = savedAuthor ? JSON.parse(savedAuthor) : [];

    const keyword = searchParams.get("keyword") || "";
    const from = searchParams.get("from") || formatDate(yesterday);
    const to = searchParams.get("to") || formatDate(today);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const category =
      searchParams.get("category")?.split(",") || parsedCategories;
    const sources = searchParams.get("source")?.split(",") || parsedSources;

    const author = parsedAuthors ? parsedAuthors : [];
    console.log("auths ", author);

    dispatch(
      fetchEverythingThunk({
        keyword,
        from,
        to,
        page,
        pageSize,
        category,
        sources,
        author,
      })
    );
  }, [dispatch, searchParams]);

  if (status === "loading") {
    dispatch(setLoading(true));
  }

  if (status === "failed") {
    dispatch(setLoading(false));
    return <div>Error: {error}</div>;
  }
  if (status === "succeeded") dispatch(setLoading(false));
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div className="lg:w-1/3">
          <Search />
        </div>
        <Filter />
      </div>
      {articles.length ? (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <NewsCard
              key={article.title}
              title={article.title}
              img={article.urlToImage || ""}
              srcName={article.source}
              publishedAt={article.publishedAt}
              url={article.url}
              author={article.author}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
      {articles.length ? <Pagination /> : null}
    </>
  );
};

export default Home;
