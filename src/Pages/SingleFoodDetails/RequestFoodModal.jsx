/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const RequestFoodModal = ({ id }) => {
  const { user } = useContext(AuthContext);
  const [foodData, setFoodData] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    getSingleFoodData();
  }, []);

  const getSingleFoodData = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/foods/${id}`);
    setFoodData(data);
  };

  const { _id, food_name, food_image, food_quantity, pickup_location, expire_date, food_status, donator_details } = foodData;

  // Updating additional_note field value
  const handleNoteValueChange = (e) => {
    const additionalNoteLength = e.target.value.length;
    if (additionalNoteLength > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  // Form submit function
  const handleFoodRequest = (e) => {
    e.preventDefault();

    if (donator_details.email === user.email) return toast.error("Donator cannot request his own added food");
    const newAdditionalNote = e.target.additional_note.value;

    console.log(newAdditionalNote);
    console.log("form submitted");
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-3xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Request Food (I.D: {_id})</h3>

          {/* Form */}

          <div className="mt-12">
            {/* Form */}
            <form onSubmit={handleFoodRequest}>
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
                      defaultValue={food_name}
                      disabled
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="food-image" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                      Food Image
                    </label>
                    <input
                      type="text"
                      id="food-image"
                      defaultValue={food_image}
                      disabled
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm  focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      //   {...register("food_image", { required: true })}
                    />
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
                      defaultValue={food_quantity}
                      disabled
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm  focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      //   {...register("food_quantity", { required: true })}
                    />
                  </div>

                  <div>
                    <label htmlFor="pickup-location" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      id="pickup-location"
                      defaultValue={pickup_location}
                      disabled
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm  focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      //   {...register("pickup_location", { required: true })}
                    />
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
                      defaultValue={expire_date}
                      disabled
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm  focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      //   {...register("expire_date", { required: true })}
                    />
                  </div>

                  <div>
                    <label htmlFor="status" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                      Status
                    </label>
                    <select
                      id="status"
                      defaultValue={food_status}
                      disabled
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm  focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      // {...register("food_status", { required: true })}
                    >
                      <option value="Available">Available</option>
                      <option value="Not Available">Not Available</option>
                    </select>
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
                    name="additional_note"
                    required
                    onChange={handleNoteValueChange}
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm  focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  ></textarea>
                </div>

                {/* Donator Information */}
                <div>
                  <label htmlFor="donator-information" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                    Requester&apos;s Information:
                  </label>
                  <div className="grid grid-cols-5 gap-4 lg:gap-6 items-center">
                    <div className="col-span-1">
                      <img className="inline-block size-[62px] rounded-full" src={user?.photoURL} alt="Donator Image" />
                    </div>
                    <div className="col-span-5 lg:col-span-2">
                      <input
                        type="text"
                        name="donatorName"
                        id="donator-name"
                        defaultValue={user?.displayName}
                        disabled
                        className=" py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      />
                    </div>
                    <div className="col-span-5 lg:col-span-2">
                      <input
                        type="email"
                        name="donatorEmail"
                        id="donator-email"
                        defaultValue={user?.email}
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
                  disabled={isDisabled}
                  onClick={() => document.getElementById("my_modal_3").close()}
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white hover:bg-secondary hover:text-black hover:transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                  Request Food
                </button>
              </div>
            </form>
            {/* End Form  */}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RequestFoodModal;
