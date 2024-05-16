import { motion } from "framer-motion";

const SubscribeToNewsLetter = () => {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ type: "twin", stiffness: 100, duration: 0.5 }}
      className="bg-primary"
    >
      <div className="max-w-6xl py-10 px-4 sm:px-6 lg:px-8 lg:py-16 mx-auto">
        <div className="max-w-xl text-center mx-auto">
          <div className="mb-5">
            <h2 className="text-2xl font-bold md:text-3xl md:leading-tight text-white dark:text-white">Sign up to our newsletter</h2>
          </div>

          <form>
            <div className="mt-5 lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
              <div className="w-full">
                <label htmlFor="hero-input" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  id="hero-input"
                  name="hero-input"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter your email"
                />
              </div>
              <a
                className="w-full sm:w-auto whitespace-nowrap py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent transition-all bg-secondary text-black hover:bg-accent disabled:opacity-50 disabled:pointer-events-none"
                href="#"
              >
                Subscribe
              </a>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default SubscribeToNewsLetter;
