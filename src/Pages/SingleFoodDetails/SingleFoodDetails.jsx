import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const SingleFoodDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   Get single food data by axios
  const getSingleFoodData = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/foods/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  //    Tanstack Query for loading single food data
  const {
    data: singleFoodData = {},
    isPending,
    isError,
    error,
  } = useQuery({ queryKey: ["singleFoodData"], queryFn: () => getSingleFoodData() });

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

  const { food_image, food_name, food_quantity, expire_date, pickup_location, donator_details } = singleFoodData;

  // Modal Form
  // Get the data from form using React Hook Form

  const onSubmit = async (data) => {
    console.log(data);
    const { food_name, food_image, food_quantity, pickup_location, expire_date, food_status, additional_note } = data;
    const food_quantity_number = parseInt(food_quantity);

    // Added food from form
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
    console.log(addedFood);

    // Post added food to server
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/foods`, addedFood);
      if (data) toast.success("Food Requested");
      navigate("/my-food-requests");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Features  */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Grid  */}
        <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
          <div>
            <img className="rounded-xl" src={food_image} />
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
              {/*  */}
              {/* Requst Food Modal */}
              <button
                className="btn py-3 px-6 mt-[40px] lg:mt-[80px] inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white transition-all hover:bg-secondary hover:text-black disabled:opacity-50 disabled:pointer-events-none"
                onClick={() => document.getElementById("my_modal_3").showModal()}
              >
                Request Food
              </button>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>
                  <h3 className="font-bold text-lg">Request Food</h3>
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
                          Add Food
                        </button>
                      </div>
                    </form>
                    {/* End Form  */}
                  </div>
                </div>
              </dialog>
            </div>
          </div>
          {/* End Col  */}
        </div>
        {/* End Grid  */}
      </div>
      {/* End Features  */}
    </div>
  );
};

export default SingleFoodDetails;
