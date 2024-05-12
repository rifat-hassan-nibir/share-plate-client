import { Link, NavLink } from "react-router-dom";
import logo from "../../public/share-plate-logo.png";
import { SlUser } from "react-icons/sl";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const userLinks = (
    <>
      <li>
        <Link to="/add-food">Add Food</Link>
      </li>
      <li>
        <Link to="/manage-my-foods">Manage My Foods</Link>
      </li>
      <li>
        <Link to="/my-food-requests">My Food Requests</Link>
      </li>
    </>
  );
  return (
    <div>
      {/* ========== HEADER ==========  */}
      <header className="container mx-auto flex items-center flex-wrap md:justify-start md:flex-nowrap z-50 w-full py-4">
        <nav
          className="relative w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center lg:px-0 px-4 mx-auto"
          aria-label="Global"
        >
          <div className="md:col-span-3">
            {/* Logo */}
            <Link to="/" className="flex-none rounded-xl inline-block focus:outline-none focus:opacity-80">
              <img className="w-[100px]" src={logo} alt="Share Plate" />
            </Link>
            {/* End Logo */}
          </div>

          {/* Button Group */}
          <div className="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
            <div className="hs-dropdown relative inline-flex">
              {user ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="border-2 border-primary size-12 rounded-full">
                    <img className="rounded-full" src={user.photoURL} alt="" />
                  </div>
                  <ul tabIndex={0} className="dropdown-content z-[1] mt-2 menu p-2 shadow bg-base-100 rounded w-52">
                    {userLinks}
                  </ul>
                </div>
              ) : (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="border-2 border-primary p-3 rounded-full">
                    <SlUser className="text-primary size-4" />
                  </div>
                  <ul tabIndex={0} className="dropdown-content z-[1] mt-2 menu p-2 shadow bg-base-100 rounded w-52">
                    {userLinks}
                  </ul>
                </div>
              )}
            </div>

            <div className="md:hidden">
              <button
                type="button"
                className="hs-collapse-toggle size-[38px] flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700"
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <svg
                  className="hs-collapse-open:hidden flex-shrink-0 size-4"
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
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden flex-shrink-0 size-4"
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
          {/* End Button Group */}

          {/* Collapse */}
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6"
          >
            <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0">
              <div>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "inline-block font-bold border-b-2 border-primary text-primary dark:text-white"
                      : "inline-block text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-300"
                  }
                >
                  Home
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/available-foods"
                  className={({ isActive }) =>
                    isActive
                      ? "inline-block font-bold border-b-2 border-primary text-primary dark:text-white"
                      : "inline-block text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-300"
                  }
                >
                  Available Foods
                </NavLink>
              </div>
              <div>
                {user ? (
                  <button
                    onClick={logOutUser}
                    className="inline-block text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-300"
                  >
                    Sign Out
                  </button>
                ) : (
                  <NavLink
                    to="/sign-in"
                    className={({ isActive }) =>
                      isActive
                        ? "inline-block font-bold border-b-2 border-primary text-primary dark:text-white"
                        : "inline-block text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-300"
                    }
                  >
                    Sign In
                  </NavLink>
                )}
              </div>
            </div>
          </div>
          {/* End Collapse */}
        </nav>
      </header>
      {/* ========== END HEADER ========== */}
    </div>
  );
};

export default Navbar;
