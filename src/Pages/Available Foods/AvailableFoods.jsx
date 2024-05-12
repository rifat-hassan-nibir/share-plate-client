import axios from "axios";

const AvailableFoods = () => {
  const getAvaiableFoods = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/foods?status=available`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  getAvaiableFoods();

  return (
    <div className="container mx-auto">
      <h1>Available Foods</h1>
    </div>
  );
};

export default AvailableFoods;
