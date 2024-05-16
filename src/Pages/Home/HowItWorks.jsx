import sharingFood from "../../assets/sharing-food.jpg";
import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ type: "twin", stiffness: 100, duration: 0.5 }}
      className="bg-accent py-[50px] lg:py-[100px]"
    >
      <div className="container px-4 lg:px-0 mx-auto">
        {/* Grid  */}
        <div className="grid lg:grid-cols-2 lg:items-center gap-12 lg:gap-32">
          <div className="">
            <div className="space-y-6 sm:space-y-8">
              {/* Title  */}
              <div className="space-y-2 md:space-y-4">
                <h2 className="font-bold text-3xl lg:text-4xl text-gray-800 dark:text-neutral-200">How it works?</h2>
                <p className="text-gray-500 dark:text-neutral-500">
                  Welcome to Share Plate! We&apos;re a community-driven platform dedicated to bringing people together through the love of
                  food. Our mission is to connect home cooks, food enthusiasts, and local farmers to share recipes, tips, and culinary
                  experiences. Whether you&apos;re looking to discover new dishes or share your own culinary creations, Share Plate is the
                  place to celebrate the joy of cooking and eating together. Join us in building a vibrant community where every plate tells
                  a story!
                </p>
              </div>
              {/* End Title  */}

              {/* List  */}
              <ul className="space-y-2 sm:space-y-4">
                <li className="flex space-x-3">
                  <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      className="flex-shrink-0 size-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>

                  <span className="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
                    <span className="font-bold">Join Our Community:</span> Sign up for a free account to become a member of Share Plate.
                    Whether you&apos;re a home cook, food enthusiast, or local farmer, everyone is welcome!
                  </span>
                </li>

                <li className="flex space-x-3">
                  <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      className="flex-shrink-0 size-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>

                  <span className="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
                    <span className="font-bold">Add Your Food:</span> Fillup the form in the Add Food Page to list your food.
                  </span>
                </li>

                <li className="flex space-x-3">
                  <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      className="flex-shrink-0 size-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>

                  <span className="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
                    <span className="font-bold">Wait For a Request:</span>People will request for your food and contact you through your
                    given email.
                  </span>
                </li>
              </ul>
              {/* End List  */}
            </div>
          </div>
          {/* End Col  */}

          {/* Col Start */}
          <div>
            <img className="rounded-xl" src={sharingFood} alt="Image Description" />
          </div>
          {/* Col End */}
        </div>
        {/* End Grid  */}
      </div>
    </motion.div>
  );
};

export default HowItWorks;
