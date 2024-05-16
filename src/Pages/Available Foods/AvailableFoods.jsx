import axios from "axios";
import FeaturedFoodCard from "../Home/FeaturedFoodCard";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../Components/PageHeader";
import Gap from "../../Components/Gap";
import { Helmet } from "react-helmet";
import { useState } from "react";
import toast from "react-hot-toast";

const AvailableFoods = () => {
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  // Get the data of available food using axios
  const getAvailableFoods = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/foods?status=Available&date_sort=${sort}&search=${search}`);
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Tanstack Query
  const {
    data: availableFoods = [],
    isError,
    error,
  } = useQuery({ queryKey: ["availableFoods", sort, search], queryFn: () => getAvailableFoods() });

  // Show error
  if (isError) {
    console.log(isError, error);
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-490px)]">
        <p className="text-center text-3xl font-bold">Something Went Wrong! Please Reload.</p>
      </div>
    );
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearch(searchText);
  };

  const handleReset = () => {
    setSort("");
    setSearch("");
  };

  return (
    <div className="container mx-auto px-4 lg:px-0">
      <Helmet>
        <title>Share Plate | Available Foods</title>
      </Helmet>

      {/* Page Title */}
      <PageHeader pageTitle={"Available Foods"}></PageHeader>

      <div className="grid lg:grid-cols-12 items-center my-10 gap-10">
        {/* Sorting Functinality */}
        <select
          onChange={(e) => setSort(e.target.value)}
          className="shadow-lg shadow-gray-100 lg:col-span-3 py-4 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        >
          <option value="">Sort by date</option>
          <option>Latest</option>
          <option>Oldest</option>
        </select>

        {/* Search Field */}
        <div className="lg:col-span-7 relative">
          {/* Form  */}
          <form onSubmit={handleSearch}>
            <div className="relative z-10 flex space-x-3 p-[5px] bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-gray-900/20">
              <div className="flex-[1_0_0%] ">
                <label htmlFor="hs-search-article-1" className="block text-sm text-gray-700 font-medium dark:text-white">
                  <span className="sr-only">Search Foods</span>
                </label>
                <input
                  type="text"
                  name="search"
                  id="hs-search-article-1"
                  className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-green-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Search article"
                />
              </div>
              <div className="flex-[0_0_auto] ">
                <button
                  type="submit"
                  className="size-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white transition-all hover:bg-secondary disabled:opacity-50 disabled:pointer-events-none"
                  href="#"
                >
                  <svg
                    className="flex-shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
          {/* End Form  */}
        </div>
        {/* End of Search field  */}

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="lg:col-span-2 py-3  rounded-lg text-center shadow-lg shadow-gray-100 bg-primary text-white "
        >
          Reset
        </button>
      </div>

      {/* Show loader when data is still loading */}
      {availableFoods.length === 0 && (
        <div className="text-center mt-[100px]">
          <span className="loading loading-spinner loading-lg "></span>
        </div>
      )}

      {/* Available Foods Grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[32px] ">
        {availableFoods.map((food) => (
          <FeaturedFoodCard food={food} key={food._id}></FeaturedFoodCard>
        ))}
      </div>

      <Gap></Gap>
    </div>
  );
};

export default AvailableFoods;
