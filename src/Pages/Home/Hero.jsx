import Slider from "./Slider";

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

          <Slider></Slider>
        </div>
      </div>
      {/* End Hero  */}
    </div>
  );
};

export default Hero;
