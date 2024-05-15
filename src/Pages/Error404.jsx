import { Link } from "react-router-dom";
import logo from "../../public/share-plate-logo.png";
import errorImage from "../../src/assets/404-landing-page-free-vector.jpg";

const Error404 = () => {
  return (
    <div>
      <div className="max-w-[50rem] flex flex-col mx-auto size-full h-[100vh]">
        {/* ========== HEADER ==========  */}
        <header className="mb-auto flex justify-center z-50 w-full py-4">
          <nav className="px-4 sm:px-6 lg:px-8" aria-label="Global">
            <Link to="/" className="flex-none text-xl font-semibold sm:text-3xl dark:text-white" href="#" aria-label="Brand">
              <img src={logo} alt="Share Plate" />
            </Link>
          </nav>
        </header>
        {/* ========== END HEADER ==========  */}

        {/* ========== MAIN CONTENT ==========  */}
        <main id="content">
          <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
            <img className="max-w-[500px] mx-auto" src={errorImage} alt="Error 404" />
            <p className="mt-3 text-gray-600 dark:text-neutral-400">Oops, something went wrong.</p>
            <p className="text-gray-600 dark:text-neutral-400">Sorry, we couldn&apos;t find your page.</p>
            <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
              <Link
                to="/"
                className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white transition-all hover:bg-secondary hover:text-black disabled:opacity-50 disabled:pointer-events-none"
              >
                <svg
                  className="flex-shrink-0 size-4"
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
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </main>
        {/* ========== END MAIN CONTENT ==========  */}

        {/* ========== FOOTER ========== */}
        <footer className="mt-auto text-center py-5">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-gray-500 dark:text-neutral-500">© Share Plate All Rights Reserved. 2024.</p>
          </div>
        </footer>
        {/* ========== END FOOTER ========== */}
      </div>
    </div>
  );
};

export default Error404;
