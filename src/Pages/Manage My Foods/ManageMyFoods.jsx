import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../Components/PageHeader";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);

  // Load data using user email
  const getFoodsDataByEmail = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/foods/my-foods/${user.email}`);
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  //   Tanstack Query for loading food data
  const {
    data: foodsDataByEmail = [],
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({ queryKey: ["foodsDataByEmail"], queryFn: () => getFoodsDataByEmail() });

  // Show loader when data is in loading state
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <span className="loading loading-spinner loading-lg mx-auto"></span>
      </div>
    );
  }

  // Show error
  if (isError) {
    console.log(isError, error);
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-490px)]">
        <p className="text-center text-3xl font-bold">Something Went Wrong! Please Reload.</p>
      </div>
    );
  }

  const deleteFood = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#275B15",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-food/${id}`);
          if (data.deletedCount > 0) {
            // Refetch Data for deleting data without reloading
            refetch();
          }
        } catch (error) {
          toast(error.message);
        }
        Swal.fire({
          title: "Deleted!",
          text: "Food Deleted",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="container mx-auto px-4 lg:px-0">
      <PageHeader pageTitle={"Manage Your Foods"}></PageHeader>
      <div className="flex flex-col my-10">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg overflow-hidden dark:border-neutral-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead className="bg-gray-50 dark:bg-neutral-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">
                      Food Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">
                      Expire Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">
                      Pickup Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {foodsDataByEmail?.map((data) => (
                    <tr key={data._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                        {data.food_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{data.food_quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{data.expire_date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{data.pickup_location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{data.food_status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="space-x-5">
                          <button
                            type="button"
                            onClick={() => deleteFood(data._id)}
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white px-4 py-1 transition-all hover:bg-red-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"
                          >
                            Delete
                          </button>
                          <Link
                            to={`/update-your-food/${data._id}`}
                            type="button"
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent px-4 py-1 bg-primary text-white transition-all hover:bg-green-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"
                          >
                            Update
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMyFoods;
