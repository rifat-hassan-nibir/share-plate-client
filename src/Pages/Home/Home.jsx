import Hero from "./Hero";
import FeaturedFoodCard from "./FeaturedFoodCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Gap from "../../Components/Gap";
import { Link } from "react-router-dom";

const Home = () => {
  // Get the food data using axios
  const getFoodData = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/foods?sort=descending&limit=6`);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // Tanstack Query
  const { data: featuredFoods = [], isPending, isError, error } = useQuery({ queryKey: ["featuredFoods"], queryFn: () => getFoodData() });

  // Show loader when data is in loading state
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <span className="loading loading-spinner loading-lg mx-auto"></span>
      </div>
    );
  }

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
      <Hero></Hero>

      <Gap></Gap>

      {/* Show Featured Foods */}
      <div className="px-4 lg:px-0 lg:py-[100px] py-[50px] bg-accent">
        <h1 className="text-center font-bold text-[22px] lg:text-[36px] lg:mb-[50px] mb-[25px]">Featured Foods</h1>
        <div className="container mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[32px]">
          {featuredFoods.map((food, index) => (
            <FeaturedFoodCard food={food} key={index}></FeaturedFoodCard>
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            to="/available-foods"
            type="button"
            className="py-3 px-4 mt-[40px] lg:mt-[80px] inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white transition-all hover:bg-secondary hover:text-black disabled:opacity-50 disabled:pointer-events-none"
          >
            <button>Show All Avaiable Foods</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
