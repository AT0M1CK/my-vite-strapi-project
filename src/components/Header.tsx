import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <>
      <nav className="bg-white fixed top-0 left-0 right-0 border-gray-200 dark:bg-gray-900 shadow-xl z-50 h-16">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <h1 className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            {user?.token ? <>{user?.username}'s Home</> : "LOGO"}
          </h1>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <button
                  className="block py-2 px-3 text-white bg-softGreen rounded-sm md:bg-transparent md:text-softGreen md:p-0 dark:text-white md:dark:text-softGreen"
                  aria-current="page"
                >
                  Home
                </button>
              </li>
              <li>
                <button className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-softGreen md:p-0 dark:text-white md:dark:hover:text-softGreen dark:hover:bg-gray-500 dark:hover:text-white md:dark:hover:bg-transparent">
                  About
                </button>
              </li>
              <li>
                <button className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-softGreen md:p-0 dark:text-white md:dark:hover:text-softGreen dark:hover:bg-gray-500 dark:hover:text-white md:dark:hover:bg-transparent">
                  Services
                </button>
              </li>
              <li>
                <button className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-softGreen md:p-0 dark:text-white md:dark:hover:text-softGreen dark:hover:bg-gray-500 dark:hover:text-white md:dark:hover:bg-transparent">
                  Pricing
                </button>
              </li>
              <li>
                <button className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-softGreen md:p-0 dark:text-white md:dark:hover:text-softGreen dark:hover:bg-gray-500 dark:hover:text-white md:dark:hover:bg-transparent">
                  Contact
                </button>
              </li>
              <li>
                {user ? (
                  <button
                    onClick={() => {
                      logout();
                    }}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-700 dark:hover:bg-gray-500 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Logout
                  </button>
                ) : (
                  <></>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
