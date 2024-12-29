import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const EmptyState = () => {
  const navigate = useNavigate();

  const onReset = () => {
    navigate("/");

    Cookies.remove("preferredSources");
    Cookies.remove("preferredCategories");
    Cookies.remove("preferredAuthors");

    console.log("Filters and preferences have been reset.");
    alert("Filters and preferences have been reset.");
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center mx-auto">
      <img
        src="/assets/empty-state.png"
        alt="No Results"
        className="w-40 h-40 mb-6"
      />
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        No Results Found
      </h2>
      <p className="text-gray-600 mt-2">
        We couldn't find anything matching your filters and preferences. Try
        resetting them to explore more.
      </p>
      <button
        onClick={onReset}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Reset Filters & Preferences
      </button>
    </div>
  );
};

export default EmptyState;
