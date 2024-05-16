import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import RequestFoodModal from "./RequestFoodModal";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const SingleFoodDetails = () => {
  const { id } = useParams();

  //   Get single food data by axios
  const getSingleFoodData = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/foods/${id}`);
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  //   Tanstack Query for loading single food data
  const { data: singleFoodData = {}, isPending, isError } = useQuery({ queryKey: ["singleFoodData"], queryFn: () => getSingleFoodData() });

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
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-490px)]">
        <p className="text-center text-3xl font-bold">Something Went Wrong! Please Reload.</p>
      </div>
    );
  }

  //   Single Food Data
  const { food_image, food_name, food_quantity, expire_date, pickup_location, donator_details } = singleFoodData;

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ type: "twin", stiffness: 100, duration: 0.5 }}
    >
      <Helmet>
        <title>Share Plate | Food Details</title>
      </Helmet>
      {/* Features  */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Grid  */}
        <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
          <div>
            <img className="rounded-xl" src={food_image} alt="food image" />
          </div>
          {/* End Col  */}

          <div className="mt-5 sm:mt-10 lg:mt-0">
            <div className="space-y-6 sm:space-y-8">
              {/* Title  */}
              <div className="space-y-2 md:space-y-4">
                <h2 className="font-bold text-3xl lg:text-4xl text-gray-800 dark:text-neutral-200">{food_name}</h2>
                <div className="space-y-2">
                  {" "}
                  <h3 className="font-semibold text-[18px] lg:text-xl text-gray-800 underline dark:text-neutral-200">Donor Information:</h3>
                  <p className="text-gray-500 dark:text-neutral-500 font-bold">
                    Name: <span className="font-normal">{donator_details.name}</span>
                  </p>
                  <p className="text-gray-500 dark:text-neutral-500 font-bold">
                    Pickup Location: <span className="font-normal">{pickup_location}</span>
                  </p>
                </div>
              </div>
              {/* End Title  */}

              {/* List  */}

              <ul className="space-y-2 md:space-y-4">
                <h3 className="font-semibold text-[18px] lg:text-xl text-gray-800 underline dark:text-neutral-200">Food Information:</h3>
                <li className="flex space-x-3">
                  <span className="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
                    <span className="font-bold">
                      Quantity: <span className="font-normal">{food_quantity}</span>
                    </span>
                  </span>
                </li>

                <li className="flex space-x-3">
                  <span className="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
                    <span className="font-bold">
                      Expire Date: <span className="font-normal">{expire_date}</span>
                    </span>
                  </span>
                </li>
              </ul>
              {/* End List  */}

              {/*  */}
              {/* Requst Food Modal */}
              <button
                className="btn py-3 px-6 mt-[40px] lg:mt-[80px] inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white transition-all hover:bg-secondary hover:text-black disabled:opacity-50 disabled:pointer-events-none"
                onClick={() => document.getElementById("my_modal_3").showModal()}
              >
                Request Food
              </button>
              <RequestFoodModal id={id}></RequestFoodModal>
            </div>
          </div>
          {/* End Col  */}
        </div>
        {/* End Grid  */}
      </div>
      {/* End Features  */}
    </motion.div>
  );
};

export default SingleFoodDetails;
