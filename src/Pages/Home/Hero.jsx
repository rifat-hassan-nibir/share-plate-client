const Hero = () => {
  return (
    <div className="lg:mt-[50px]">
      {/* Hero  */}
      <div className="relative overflow-hidden">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-2xl text-center mx-auto">
            <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl dark:text-white">
              Reducing <span className="text-primary">Food Waste</span> and Sharing <span className="text-primary">Surplus</span>
            </h1>
            <p className="mt-3 text-lg max-w-lg mx-auto text-gray-800 dark:text-neutral-400">
              Join us in our mission to reduce food waste and share surplus with those in need.
            </p>
          </div>

          <div className="mt-10 relative max-w-5xl mx-auto">
            <div className="w-full object-cover h-96 sm:h-[480px] bg-[url('https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1981&q=80')] bg-no-repeat bg-center bg-cover rounded-xl"></div>

            <div className="absolute bottom-12 -start-20 -z-[1] size-48 bg-gradient-to-b from-orange-500 to-white p-px rounded-lg dark:to-neutral-900">
              <div className="bg-white size-48 rounded-lg dark:bg-neutral-900"></div>
            </div>

            <div className="absolute -top-12 -end-20 -z-[1] size-48 bg-gradient-to-t from-blue-600 to-cyan-400 p-px rounded-full">
              <div className="bg-white size-48 rounded-full dark:bg-neutral-900"></div>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero  */}
    </div>
  );
};

export default Hero;
