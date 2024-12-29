import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background-secondary dark:bg-background-primary py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          {/* Quick Links */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-text-primary dark:text-text-primary">
              Quick Links
            </h2>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-text-secondary dark:text-text-secondary hover:text-blue-600 dark:hover:text-blue-400"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-text-secondary dark:text-text-secondary hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/preferences"
                  className="text-text-secondary dark:text-text-secondary hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Preferences
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-text-primary dark:text-text-primary">
              Follow Us
            </h2>
            <div className="mt-2 space-y-2">
              <div
                // href="#"
                // target="_blank"
                // rel="noopener noreferrer"
                className="text-text-secondary dark:text-text-secondary hover:text-blue-600 dark:hover:text-blue-400"
              >
                <i className="fab fa-facebook-f"></i> Facebook
              </div>
              <div
                // href="#"
                // target="_blank"
                // rel="noopener noreferrer"
                className="text-text-secondary dark:text-text-secondary hover:text-blue-600 dark:hover:text-blue-400"
              >
                <i className="fab fa-twitter"></i> Twitter
              </div>
              <div
                // href="#"
                // target="_blank"
                // rel="noopener noreferrer"
                className="text-text-secondary dark:text-text-secondary hover:text-blue-600 dark:hover:text-blue-400"
              >
                <i className="fab fa-linkedin"></i> LinkedIn
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-text-secondary dark:text-text-secondary mt-4 md:mt-0">
            <p>
              &copy; {new Date().getFullYear()} NewsApp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
