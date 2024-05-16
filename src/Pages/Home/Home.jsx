import Hero from "./Hero";
import Gap from "../../Components/Gap";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import FeaturedFoods from "./FeaturedFoods";
import HowItWorks from "./HowItWorks";
import SubscribeToNewsLetter from "./SubscribeToNewsLetter";

const Home = () => {
  return (
    <div>
      {/* Tab title */}
      <Helmet>
        <title>Share Plate | Home</title>
      </Helmet>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "twin", stiffness: 100, duration: 0.5 }}
      >
        <Hero></Hero>
      </motion.div>

      <Gap></Gap>

      <HowItWorks></HowItWorks>

      <FeaturedFoods></FeaturedFoods>

      <SubscribeToNewsLetter></SubscribeToNewsLetter>
    </div>
  );
};

export default Home;
