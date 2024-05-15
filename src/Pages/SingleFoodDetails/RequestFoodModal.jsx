/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RequestFoodModal = ({ id }) => {
  const { user } = useContext(AuthContext);
  const [foodData, setFoodData] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getSingleFoodData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSingleFoodData = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/foods/${id}`);
    setFoodData(data);
  };

  const { _id, food_name, food_image, pickup_location, expire_date, donator_details } = foodData;

  // Updating additional_note field value
  const handleNoteValueChange = async (e) => {
    const additionalNoteLength = e.target.value.length;
    if (additionalNoteLength > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  // Form submit function
  const handleFoodRequest = async (e) => {
    e.preventDefault();
    const form = e.target;

    const food_id = _id;
    const donor_name = form.donor_name.value;
    const donor_email = form.donor_email.value;
    const request_date = form.request_date.value;
    const user_email = form.user_email.value;
    const additional_note = form.additional_note.value;
    const food_status = "Requested";

    const requestedFoodData = {
      food_id,
      food_name,
      food_image,
      pickup_location,
      donor_name,
      donor_email,
      expire_date,
      request_date,
      user_email,
      additional_note,
      food_status,
    };

    if (donator_details.email === user?.email) return toast.error("Donator cannot request his own added food");

    // Add food to requested foods collection
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/requested-foods`, requestedFoodData);
      console.log(data);
      if (data.insertedId) {
        toast.success("Food Requested");
        navigate("/my-food-requests");
      }
    } catch (error) {
      toast.error(error.message);
    }

    // Close modal after request
    document.getElementById("my_modal_3").close();
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-3xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Request Food</h3>

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
                      name="food_name"
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
                      name="food_image"
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
                    <label htmlFor="food-id" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                      Food ID
                    </label>
                    <input
                      type="text"
                      id="food-id"
                      defaultValue={_id}
                      name="food_id"
                      disabled
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm  focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>

                  {/* Pickupt Location */}
                  <div>
                    <label htmlFor="pickup-location" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      id="pickup-location"
                      defaultValue={pickup_location}
                      name="pickup_location"
                      disabled
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm  focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label htmlFor="donor-name" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                      Donor Name
                    </label>
                    <input
                      type="text"
                      id="donor-name"
                      defaultValue={donator_details?.name}
                      name="donor_name"
                      disabled
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm  focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="donator-email" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                      Donor Email
                    </label>
                    <input
                      type="email"
                      id="donator-email"
                      defaultValue={donator_details?.email}
                      name="donor_email"
                      disabled
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm  focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>

                  {/* Request Date */}
                  <div>
                    <label htmlFor="request-date" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                      Expire Date
                    </label>
                    <input
                      type="text"
                      id="expire-date"
                      defaultValue={expire_date}
                      name="expire_date"
                      disabled
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm  focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>

                  {/* Request Date */}
                  <div>
                    <label htmlFor="request-date" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                      Request Date
                    </label>
                    <input
                      type="text"
                      id="request-date"
                      defaultValue={new Date().toLocaleDateString()}
                      name="request_date"
                      disabled
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm  focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>

                  {/* Requester's Email */}
                  <div className="col-span-2">
                    <label htmlFor="user-email" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                      User Email
                    </label>
                    <input
                      type="email"
                      id="user-email"
                      defaultValue={user?.email}
                      name="user_email"
                      disabled
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm  focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
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
              </div>
              {/* End Grid */}

              {/* Submit Button */}
              <div className="mt-6 grid">
                <button
                  disabled={isDisabled}
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
