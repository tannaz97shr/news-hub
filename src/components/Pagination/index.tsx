import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleNextPage = () => {
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", (currentPage + 1).toString());
    setSearchParams(newParams);
  };

  const handlePrevPage = () => {
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    if (currentPage > 1) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", (currentPage - 1).toString());
      setSearchParams(newParams);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        onClick={handlePrevPage}
        className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
        disabled={parseInt(searchParams.get("page") || "1", 10) <= 1}
      >
        <FaChevronLeft className="mr-2" /> Previous
      </button>
      <button
        onClick={handleNextPage}
        className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
      >
        Next <FaChevronRight className="ml-2" />
      </button>
    </div>
  );
};

export default Pagination;
