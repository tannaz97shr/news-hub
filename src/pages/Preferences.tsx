import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { categoryOptions, sourceOptions } from "../constants";
import { fetchAuthorsThunk } from "../features/news/newsSlice";
import { AppDispatch } from "../store";
import { IOption } from "../types/general";

const Preferences = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { authors, authorsStatus, authorsError } = useSelector(
    (state: any) => state.news
  );

  const [preferredSources, setPreferredSources] = useState<IOption[]>([]);
  const [preferredCategories, setPreferredCategories] = useState<IOption[]>([]);
  const [preferredAuthors, setPreferredAuthors] = useState<IOption[]>([]);

  useEffect(() => {
    // Load preferences from cookies
    const savedSources = Cookies.get("preferredSources");
    const savedCategories = Cookies.get("preferredCategories");
    const savedAuthors = Cookies.get("preferredAuthors");

    if (savedSources) {
      // setPreferredSources(JSON.parse(savedSources))
      const sources = JSON.parse(savedSources);
      setPreferredSources(
        categoryOptions.filter((src) => sources.includes(src.value))
      );
    }
    if (savedCategories) {
      const categories = JSON.parse(savedCategories);
      setPreferredCategories(
        categoryOptions.filter((cat) => categories.includes(cat.value))
      );
    }
    if (savedAuthors) {
      const authors = JSON.parse(savedAuthors);
      setPreferredAuthors(
        authorOptions.filter((author) => authors.includes(author.value))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authorsStatus === "idle") {
      dispatch(fetchAuthorsThunk());
    }
  }, [dispatch, authorsStatus]);

  const handleSavePreferences = () => {
    Cookies.set(
      "preferredSources",
      JSON.stringify(preferredSources.map((src) => src.value)),
      {
        expires: 7,
      }
    );
    Cookies.set(
      "preferredCategories",
      JSON.stringify(preferredCategories.map((src) => src.value)),
      {
        expires: 7,
      }
    );
    Cookies.set(
      "preferredAuthors",
      JSON.stringify(preferredAuthors.map((src) => src.value)),
      {
        expires: 7,
      }
    );
    alert("Preferences saved successfully!");
  };

  const handleResetPreferences = () => {
    Cookies.remove("preferredSources");
    Cookies.remove("preferredCategories");
    Cookies.remove("preferredAuthors");

    setPreferredSources([]);
    setPreferredCategories([]);
    setPreferredAuthors([]);

    alert("Preferences have been reset.");
  };

  const authorOptions: IOption[] = authors.map((author: string) => ({
    value: author,
    label: author,
  }));

  return (
    <div className="max-w-4xl mx-auto p-6 bg-background-secondary shadow-md rounded-lg w-full">
      <h1 className="text-2xl font-bold mb-6 text-center text-text-primary">
        Set Your Preferences
      </h1>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSavePreferences();
        }}
      >
        <div className="flex flex-col">
          <label className="text-sm font-medium text-text-primary mb-2">
            Preferred Sources:
          </label>
          <Select
            isMulti
            options={sourceOptions}
            value={preferredSources}
            onChange={(selected: any) => setPreferredSources(selected || [])}
            className="text-text-primary border border-gray-200 dark:border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-highlight dark:bg-gray-700"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-text-primary mb-2">
            Preferred Categories:
          </label>
          <Select
            isMulti
            options={categoryOptions}
            value={preferredCategories}
            onChange={(selected: any) => setPreferredCategories(selected || [])}
            className="text-text-primary border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-highlight dark:text-black"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-text-primary mb-2">
            Preferred Authors:
          </label>
          {authorsStatus === "loading" ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Loading authors...
            </p>
          ) : authorsError ? (
            <p className="text-sm text-red-500 dark:text-red-400">
              Error loading authors: {authorsError}
            </p>
          ) : (
            <Select
              className="text-text-primary border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-highlight dark:text-black"
              isMulti
              options={authorOptions}
              value={preferredAuthors}
              onChange={(selected: any) => setPreferredAuthors(selected || [])}
            />
          )}
        </div>

        <div className="flex justify-between items-center gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            Save Preferences
          </button>
          <button
            type="button"
            onClick={handleResetPreferences}
            className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Reset Preferences
          </button>
        </div>
      </form>
    </div>
  );
};

export default Preferences;
