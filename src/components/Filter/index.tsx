import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterForm from "./FilterForm";

const Filter = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(
    searchParams.get("startDate") || ""
  );
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [selectedSources, setSelectedSources] = useState<string[]>(
    searchParams.get("source")?.split(",") || []
  );

  const toggleSource = (source: any) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    );
  };

  const applyFilters = () => {
    const newParams = new URLSearchParams(searchParams);

    // Apply date filter
    if (startDate) newParams.set("startDate", startDate);
    else newParams.delete("startDate");

    if (endDate) newParams.set("endDate", endDate);
    else newParams.delete("endDate");

    // Apply category filter
    if (selectedCategory) newParams.set("category", selectedCategory);
    else newParams.delete("category");

    // Apply sources filter
    if (selectedSources.length > 0) {
      newParams.set("source", selectedSources.join(","));
    } else {
      newParams.delete("source");
    }

    navigate(`/?${newParams.toString()}`);
    setIsModalOpen(false);
  };

  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
    setSelectedCategory("");
    setSelectedSources([]);
    navigate("/");
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="p-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
        onClick={() => setIsModalOpen(true)}
      >
        <FiFilter size={20} />
        <span>Filters</span>
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-blackWithOpacity dark:bg-whiteWithOpacity flex items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-md rounded-lg p-4 relative">
            <h2 className="text-lg font-bold mb-4 dark:text-gray-800">
              Filters
            </h2>
            <FilterForm
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSources={selectedSources}
              toggleSource={toggleSource}
              applyFilters={applyFilters}
              resetFilters={resetFilters}
            />
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              Close ✖️
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
