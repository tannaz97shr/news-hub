import { categoryOptions, sourceOptions } from "../../constants";

interface FilterFormProps {
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedSources: string[];
  toggleSource: (source: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}

const FilterForm = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedCategory,
  setSelectedCategory,
  selectedSources,
  toggleSource,
  applyFilters,
  resetFilters,
}: FilterFormProps) => {
  return (
    <div className="dark:text-gray-700">
      <label className="block mb-2">
        From Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="block w-full p-2 border rounded-md"
        />
      </label>
      <label className="block mb-2">
        To Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="block w-full p-2 border rounded-md"
        />
      </label>
      <label className="block mb-2">
        Category:
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="block w-full p-2 border rounded-md"
        >
          <option value="">All</option>
          {categoryOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <fieldset className="mb-4">
        {sourceOptions.map(({ value, label }) => (
          <label key={value} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={selectedSources.includes(value)}
              onChange={() => toggleSource(value)}
              className="mr-2"
            />
            {label}
          </label>
        ))}
      </fieldset>
      <button
        onClick={applyFilters}
        className="w-full p-2 bg-blue-600 text-white rounded-md mb-2"
      >
        Apply Filters
      </button>
      <button
        onClick={resetFilters}
        className="w-full p-2 bg-gray-400 text-white rounded-md"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterForm;
