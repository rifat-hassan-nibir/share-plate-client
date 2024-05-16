import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div>
      <ScrollRestoration></ScrollRestoration>

      {/* Navbar */}
      <div className="shadow-lg shadow-gray-100 bg-accent">
        <Navbar></Navbar>
      </div>

      <div className="min-h-[calc(100vh-490px)]">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
