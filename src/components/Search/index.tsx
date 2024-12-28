import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("keyword") || ""
  );

  // Debounce function to limit API calls
  useEffect(() => {
    const timeout = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);

      if (searchTerm.trim()) {
        newParams.set("keyword", searchTerm);
      } else {
        newParams.delete("keyword");
      }

      navigate(`/?${newParams.toString()}`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchParams, navigate, searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newParams = new URLSearchParams(searchParams);

    if (searchTerm.trim()) {
      newParams.set("keyword", searchTerm);
    } else {
      newParams.delete("keyword");
    }

    navigate(`/?${newParams.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search articles..."
        className="p-2 border rounded-lg w-full bg-background-secondary"
      />
      <button
        type="submit"
        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
