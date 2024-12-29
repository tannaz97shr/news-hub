import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { FiExternalLink } from "react-icons/fi";
import { fetchTopHeadlinesThunk } from "../../features/news/newsSlice";
import { AppDispatch, RootState } from "../../store";

const Slider = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { topHeadlines, topHeadlinesStatus } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    if (topHeadlinesStatus === "idle") {
      dispatch(fetchTopHeadlinesThunk());
    }
  }, [dispatch, topHeadlinesStatus]);

  if (topHeadlinesStatus === "loading") {
    return <p>Loading...</p>;
  }

  if (topHeadlinesStatus === "failed") {
    return <p>Failed to load top headlines.</p>;
  }

  return (
    <>
      <div className=" text-4xl font-bold mb-6">Top Headlines</div>
      <div className="mb-6">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={50}
          slidesPerView={1}
        >
          {topHeadlines.map((headline) => {
            const articleDate = new Date(headline.publishedAt);
            const intlDate = new Intl.DateTimeFormat("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }).format(articleDate);
            return (
              <SwiperSlide key={headline.url}>
                <div className="w-full flex">
                  <div className="w-2/3 aspect-video">
                    <img
                      src={headline.urlToImage || "/assets/news.png"}
                      alt={headline.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className=" w-1/3 flex flex-col p-4">
                    <div className=" text-sm font-semibold text-highlight">
                      {headline.source}{" "}
                      {headline.author && (
                        <span className="ml-4 text-text-primary text-sm">
                          ({headline.author})
                        </span>
                      )}
                    </div>
                    <div className="w-12 border border-highlight mt-2"></div>
                    <div className=" text-sm text-text-secondary mt-4 font-mono">
                      {intlDate}
                    </div>
                    <div className=" text-2xl font-bold mt-6">
                      {headline.title}
                    </div>
                    <a
                      href={headline.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto ml-auto inline-flex items-center text-blue-500 font-medium hover:text-blue-700 transition-colors"
                    >
                      Read full article <FiExternalLink className="ml-2" />
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
