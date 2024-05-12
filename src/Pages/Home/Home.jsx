import Hero from "./Hero";
import FeaturedFoodCard from "./FeaturedFoodCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <span className="loading loading-spinner loading-lg mx-auto"></span>
      </div>
    );
  }

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

      {/* Show Featured Foods */}
      <div className="container mx-auto grid lg:grid-cols-3 grid-cols-1 gap-[32px]">
        {featuredFoods.map((food, index) => (
          <FeaturedFoodCard food={food} key={index}></FeaturedFoodCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
