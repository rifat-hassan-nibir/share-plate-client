import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AvailableFoods from "../Pages/Available Foods/AvailableFoods";
import Error404 from "../Pages/Error404";
import SignIn from "../Pages/Sign In/SignIn";
import SignUp from "../Pages/Sign Up/SignUp";
import AddFood from "../Pages/Add Food/AddFood";
import ManageMyFoods from "../Pages/Manage My Foods/ManageMyFoods";
import MyFoodRequests from "../Pages/My Foods Requests/MyFoodRequests";
import PrivateRoute from "./PrivateRoute";
import SingleFoodDetails from "../Pages/SingleFoodDetails/SingleFoodDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error404></Error404>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/available-foods",
        element: <AvailableFoods></AvailableFoods>,
      },
      {
        path: "/sign-in",
        element: <SignIn></SignIn>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/food-details/:id",
        element: (
          <PrivateRoute>
            <SingleFoodDetails></SingleFoodDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-my-foods",
        element: (
          <PrivateRoute>
            <ManageMyFoods></ManageMyFoods>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-food-requests",
        element: (
          <PrivateRoute>
            <MyFoodRequests></MyFoodRequests>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
