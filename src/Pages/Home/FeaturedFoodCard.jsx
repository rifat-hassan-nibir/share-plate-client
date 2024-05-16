/* eslint-disable react/prop-types */
import { IoMdPeople } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { GrStatusGood } from "react-icons/gr";
import { Link } from "react-router-dom";

const FeaturedFoodCard = ({ food }) => {
  const { _id, food_image, food_name, food_quantity, expire_date, additional_note, pickup_location, food_status, donator_details } = food;

  return (
    <Link to={`/food-details/${_id}`}>
      <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-lg shadow-gray-100  dark:bg-gray-800">
        <img className="object-cover w-full h-64" src={food_image} alt="Food Image" />

        <div className="p-6">
          <div>
            <div className="flex justify-between">
              <div className="flex items-center bg-secondary px-4 py-1 rounded-full font-medium text-primary">
                <IoMdPeople className="text-[18px]" /> <p className="text-[12px]">: {food_quantity}</p>
              </div>
              <div className="flex items-center bg-secondary px-4 py-1 rounded-full font-medium text-primary">
                <MdOutlineDateRange className="text-[18px]" /> <p className="text-[12px]">: {expire_date}</p>
              </div>
              <div className="flex items-center bg-secondary px-4 py-1 rounded-full font-medium text-primary">
                <GrStatusGood className="text-[18px]" /> <p className="text-[12px]">: {food_status}</p>
              </div>
            </div>
            <h3 className="block mt-4 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 ">
              {food_name}
            </h3>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{additional_note.slice(0, 50)}...</p>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img className="size-10 rounded-full" src={donator_details.donator_image} alt="Avatar" />
                <p className="mx-2 font-semibold text-gray-700 dark:text-gray-200">{donator_details.name}</p>
              </div>
              <div className="flex items-center bg-secondary px-4 py-1 rounded-full font-medium text-primary">
                <IoLocationOutline className="text-[18px]" />
                <p className="text-[12px]">: {pickup_location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedFoodCard;
