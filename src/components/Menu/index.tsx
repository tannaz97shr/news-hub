import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher";

const Menu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-background-primary shadow-md md:shadow-none sticky top-0 z-50 md:w-full">
      <div className="mx-auto py-3 px-4  md:px-12 flex justify-between items-center w-full shadow-md">
        <div className="text-2xl font-bold">
          <a href="/">
            <span className=" text-4xl">News Hub</span>
          </a>
        </div>
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link to="/contact" className="hover:text-blue-500">
            Contact
          </Link>
          <Link to="/about" className="hover:text-blue-500">
            About
          </Link>
          <Link to="/preferences" className="hover:text-blue-500">
            Preferences
          </Link>
          <ThemeSwitcher />
        </nav>
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-blackWithOpacity dark:bg-whiteWithOpacity z-40 md:hidden">
          <div className="bg-background-primary w-3/4 h-full p-6">
            <button
              className="text-2xl mb-6"
              onClick={toggleMenu}
              aria-label="Close Menu"
            >
              <FiX />
            </button>
            <nav className="flex flex-col space-y-4">
              <Link onClick={toggleMenu} to="/" className="hover:text-blue-500">
                Home
              </Link>
              <Link
                onClick={toggleMenu}
                to="/contact"
                className="hover:text-blue-500"
              >
                Contact
              </Link>
              <Link
                onClick={toggleMenu}
                to="/about"
                className="hover:text-blue-500"
              >
                About
              </Link>
              <Link
                onClick={toggleMenu}
                to="/preferences"
                className="hover:text-blue-500"
              >
                Preferences
              </Link>
              <div className="w-fit">
                <ThemeSwitcher />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Menu;
