import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const SignUp = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, email, photoURL, password } = data;

    // Password validation
    if (password.length < 6) {
      return toast.error("Password should not be less than 6 digits");
    }
    if (!/[A-Z]/.test(password)) {
      return toast.error("Password should contain at least one uppercase character");
    }
    if (!/[a-z]/.test(password)) {
      return toast.error("Password should contain at least one lowercase character");
    }

    // Create User with email and password
    createUser(email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL,
        }).then(() => {
          toast.success("Account created successfuly");
          navigate("/");
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error");
      });
  };

  // Google Sign Up
  const handleGoogleSignUp = () => {
    googleLogin()
      .then((result) => {
        console.log(result.user);
        toast.success("Google Login Successful");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error");
      });
  };

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ type: "twin", stiffness: 100, duration: 0.5 }}
      className="max-w-md mx-auto lg:px-0 px-4 lg:my-[80px] my-[50px]"
    >
      <Helmet>
        <title>Share Plate | Sign Up</title>
      </Helmet>

      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign up</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Already have an account?
              <Link
                to="/sign-in"
                className="text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500"
                href="../examples/html/signin.html"
              >
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <button
              onClick={handleGoogleSignUp}
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                <path
                  d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                  fill="#4285F4"
                />
                <path
                  d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                  fill="#34A853"
                />
                <path
                  d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                  fill="#FBBC05"
                />
                <path
                  d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                  fill="#EB4335"
                />
              </svg>
              Sign up with Google
            </button>

            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
              Or
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-y-4">
                {/* Name Form Group */}
                <div>
                  <label htmlFor="Name" className="block text-sm mb-2 dark:text-white">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      {...register("name", { required: true })}
                    />
                    {errors.name && <span className="text-red-600">This field is required</span>}
                  </div>
                </div>
                {/* End of Name from group */}

                {/* Email Form Group */}
                <div>
                  <label htmlFor="email" className="block text-sm mb-2 dark:text-white">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      {...register("email", { required: true })}
                    />
                    {errors.email && <span className="text-red-600">This field is required</span>}
                  </div>
                </div>
                {/* End Form Group */}

                {/* Photo URL Form Group */}
                <div>
                  <label htmlFor="Name" className="block text-sm mb-2 dark:text-white">
                    Photo URL
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="photoURL"
                      name="photoURL"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      {...register("photoURL", { required: true })}
                    />
                    {errors.photoURL && <span className="text-red-600">This field is required</span>}
                  </div>
                </div>
                {/* End of Photo URL Form Group */}

                {/* Password Form Group */}
                <div>
                  <label htmlFor="password" className="block text-sm mb-2 dark:text-white">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      {...register("password", { required: true })}
                    />
                    <span className="absolute right-4 hover:cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                    </span>
                  </div>
                  {errors.password && <span className="text-red-600">This field is required</span>}
                </div>
                {/* End Form Group */}

                <button
                  type="submit"
                  className="w-full mt-2 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent transition-all bg-primary text-white hover:bg-secondary hover:text-primary disabled:opacity-50 disabled:pointer-events-none"
                >
                  Sign up
                </button>
              </div>
            </form>
            {/* End Form */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;
