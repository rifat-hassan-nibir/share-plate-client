import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const UpdateYourFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const foodData = useLoaderData();

  // Get the data from form using React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { food_name, food_image, food_quantity, pickup_location, expire_date, food_status, additional_note } = data;
    const food_quantity_number = parseInt(food_quantity);

    // Added food details from form
    const addedFood = {
      food_name,
      food_image,
      food_quantity: food_quantity_number,
      pickup_location,
      expire_date,
      food_status,
      additional_note,
      donator_details: { donator_image: user.photoURL, name: user.displayName, email: user.email },
    };

    // Update food details
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/update-food/${foodData._id}`, addedFood);
      if (data.modifiedCount > 0) toast.success("Food Details Updated");
      navigate("/manage-my-foods");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ type: "twin", stiffness: 100, duration: 0.5 }}
      className="bg-secondary"
    >
      <Helmet>
        <title>Share Plate | Update Food Details</title>
      </Helmet>

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ">
        <div className="max-w-3xl mx-auto bg-white lg:p-10 p-5 rounded-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">Update Your Food</h1>
          </div>

          <div className="mt-12">
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 lg:gap-6">
                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label htmlFor="food-name" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                      Food Name
                    </label>
                    <input
                      type="text"
                      id="food-name"
                      defaultValue={foodData.food_name}
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      {...register("food_name", { required: true })}
                    />
                    {errors.food_name && <span className="text-red-500">This field is required</span>}
                  </div>

                  <div>
                    <label htmlFor="food-image" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                      Food Image
                    </label>
                    <input
                      type="text"
                      id="food-image"
                      defaultValue={foodData.food_image}
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm  focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      {...register("food_image", { required: true })}
                    />
                    {errors.food_image && <span className="text-red-500">This field is required</span>}
                  </div>
                </div>
                {/* End Grid */}

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label htmlFor="food-quantity" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                      Food Quantity
                    </label>
                    <input
                      type="number"
                      id="food-quantity"
                      defaultValue={foodData.food_quantity}
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm  focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      {...register("food_quantity", { required: true })}
                    />
                    {errors.food_quantity && <span className="text-red-500">This field is required</span>}
                  </div>

                  <div>
                    <label htmlFor="pickup-location" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      id="pickup-location"
                      defaultValue={foodData.pickup_location}
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm  focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      {...register("pickup_location", { required: true })}
                    />
                    {errors.pickup_location && <span className="text-red-500">This field is required</span>}
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label htmlFor="expired-date" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                      Expire Date
                    </label>
                    <input
                      type="date"
                      id="expired-date"
                      defaultValue={foodData.expire_date}
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm  focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      {...register("expire_date", { required: true })}
                    />
                    {errors.expire_date && <span className="text-red-500">This field is required</span>}
                  </div>

                  <div>
                    <label htmlFor="status" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                      Status
                    </label>
                    <select
                      id="status"
                      defaultValue={foodData.food_status}
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm  focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      {...register("food_status", { required: true })}
                    >
                      <option value="Available">Available</option>
                      <option value="Not Available">Not Available</option>
                    </select>
                    {errors.food_status && <span className="text-red-500">This field is required</span>}
                  </div>
                </div>
                {/* End Grid  */}

                <div>
                  <label htmlFor="additional-note" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                    Additional Note
                  </label>
                  <textarea
                    id="additional-note"
                    rows="4"
                    defaultValue={foodData.additional_note}
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm  focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    {...register("additional_note", { required: true })}
                  ></textarea>
                  {errors.additional_note && <span className="text-red-500">This field is required</span>}
                </div>

                {/* Donator Information */}
                <div>
                  <label htmlFor="donator-information" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                    Donator&apos;s Information:
                  </label>
                  <div className="grid grid-cols-5 gap-4 lg:gap-6 items-center">
                    <div className="col-span-1">
                      <img className="inline-block size-[62px] rounded-full" src={user.photoURL} alt="Donator Image" />
                    </div>
                    <div className="col-span-5 lg:col-span-2">
                      <input
                        type="text"
                        name="donatorNmail"
                        id="donator-nmail"
                        defaultValue={user.displayName}
                        disabled
                        className=" py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      />
                    </div>
                    <div className="col-span-5 lg:col-span-2">
                      <input
                        type="email"
                        name="donatorEmail"
                        id="donator-email"
                        defaultValue={user.email}
                        disabled
                        className=" py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* End Grid */}

              {/* Submit Button */}
              <div className="mt-6 grid">
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white hover:bg-secondary hover:text-black hover:transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                  Update Food
                </button>
              </div>
            </form>
            {/* End Form  */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UpdateYourFood;
