import axios from "axios";
import FeaturedFoodCard from "../Home/FeaturedFoodCard";
import { useQuery } from "@tanstack/react-query";

const AvailableFoods = () => {
  // Get the data of available food using axios
  const getAvailableFoods = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/foods?status=Available`);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // Tanstack Query
  const {
    data: availableFoods = [],
    isPending,
    isError,
    error,
  } = useQuery({ queryKey: ["featuredFoods"], queryFn: () => getAvailableFoods() });

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
    <div className="container mx-auto">
      <h1>Available Foods</h1>
      {availableFoods.map((food) => (
        <FeaturedFoodCard food={food} key={food._id}></FeaturedFoodCard>
      ))}
    </div>
  );
};

export default AvailableFoods;
