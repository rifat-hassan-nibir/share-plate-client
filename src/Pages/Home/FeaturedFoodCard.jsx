/* eslint-disable react/prop-types */
const FeaturedFoodCard = ({ food }) => {
  const { food_image, food_name, food_quantity, expire_date, additional_note, pickup_location, donator_details } = food;
  return (
    <div>
      <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <img className="object-cover w-full h-64" src={food_image} alt="Article" />

        <div className="p-6">
          <div>
            <div className="flex justify-between">
              <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">Quantity: {food_quantity}</span>
              <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">{pickup_location}</span>
            </div>
            <a
              href="#"
              className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
              tabIndex="0"
              role="link"
            >
              {food_name}
            </a>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{additional_note.slice(0, 50)}...</p>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img className="size-10 rounded-full" src={donator_details.donator_image} alt="Avatar" />
                <a href="#" className="mx-2 font-semibold text-gray-700 dark:text-gray-200" tabIndex="0" role="link">
                  {donator_details.name}
                </a>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">Expire Date: {expire_date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedFoodCard;
