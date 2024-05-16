import FeaturedFoodCard from "./FeaturedFoodCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FeaturedFoods = () => {
  // Get the food data using axios
  const getFoodData = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/foods?status=Available&quantity_sort=Descending&limit=6`);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // Tanstack Query
  const { data: featuredFoods = [], isError, error } = useQuery({ queryKey: ["featuredFoods"], queryFn: () => getFoodData() });

  // Show error
  if (isError) {
    console.log(isError, error);
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-490px)]">
        <p className="text-center text-3xl font-bold">Something Went Wrong! Please Reload.</p>
      </div>
    );
  }
  return (
    <div>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ type: "twin", stiffness: 100, duration: 0.5 }}
        className="px-4 lg:px-0 lg:py-[100px] py-[50px]"
      >
        <div className="space-y-2 md:space-y-4 lg:mb-[50px] mb-[30px]">
          <h1 className="font-bold text-3xl lg:text-4xl text-gray-800 dark:text-neutral-200 text-center">Featured Foods</h1>
          <p className="text-gray-500 dark:text-neutral-50 text-center">Take a look at our featured foods sorted by quantities</p>
        </div>

        {/* Show loader when data is still loading */}
        {featuredFoods.length === 0 && (
          <div className="text-center mt-[100px]">
            <span className="loading loading-spinner loading-lg "></span>
          </div>
        )}

        <div className="container mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[32px]">
          {featuredFoods.map((food, index) => (
            <FeaturedFoodCard food={food} key={index}></FeaturedFoodCard>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/available-foods"
            type="button"
            className="py-3 px-6 mt-[40px] lg:mt-[80px] inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white transition-all hover:bg-secondary hover:text-black disabled:opacity-50 disabled:pointer-events-none"
          >
            <button>Show All Avaiable Foods</button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturedFoods;
