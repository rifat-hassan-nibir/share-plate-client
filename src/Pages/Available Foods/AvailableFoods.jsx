import axios from "axios";
import FeaturedFoodCard from "../Home/FeaturedFoodCard";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../Components/PageHeader";
import Gap from "../../Components/Gap";

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
  } = useQuery({ queryKey: ["availableFoods"], queryFn: () => getAvailableFoods() });

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
      {/* Page Title */}
      <PageHeader pageTitle={"Available Foods"}></PageHeader>
      <Gap></Gap>

      {/* Available Foods Grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[32px]">
        {availableFoods.map((food) => (
          <FeaturedFoodCard food={food} key={food._id}></FeaturedFoodCard>
        ))}
      </div>

      <Gap></Gap>
    </div>
  );
};

export default AvailableFoods;
