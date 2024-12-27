interface NewsCardProps {
  title: string;
  img: string;
  srcName: string;
  publishedAt: string;
}

const NewsCard = ({ title, img, srcName, publishedAt }: NewsCardProps) => {
  const articleDate = new Date(publishedAt);
  const intlDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(articleDate);
  return (
    <div className=" bg-background-secondary flex flex-col rounded-lg overflow-hidden border border-border">
      <div className="w-full aspect-video overflow-hidden">
        <img
          src={img || "/assets/news.png"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-8">
        <div className=" text-sm font-semibold text-highlight">{srcName}</div>
        <div className="w-12 border border-highlight mt-2"></div>
        <div className=" text-sm text-text-secondary mt-4 font-mono">
          {intlDate}
        </div>
        <div className=" text-2xl font-bold mt-4 line-clamp-2">{title}</div>
      </div>
    </div>
  );
};

export default NewsCard;
