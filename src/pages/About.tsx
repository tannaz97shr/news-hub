const About = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 bg-background-primary dark:bg-background-primary">
      <h1 className="text-3xl font-bold text-center mb-8 text-text-primary dark:text-text-primary">
        About This Project
      </h1>
      <div className="space-y-6">
        <p className="text-lg text-text-secondary dark:text-text-secondary">
          This project was developed as a case study for my interview process
          with Innoscripta. It is a modern React application designed to display
          news articles from multiple sources while offering a seamless and
          intuitive user experience.
        </p>

        <h2 className="text-2xl font-semibold text-text-primary dark:text-text-secondary">
          Key Features
        </h2>
        <ul className="list-disc list-inside space-y-2 text-text-secondary dark:text-text-secondary">
          <li>
            <strong>Technology Stack:</strong> Built with{" "}
            <span className="text-blue-600 dark:text-blue-600">React</span>,
            styled using{" "}
            <span className="text-blue-600 dark:text-blue-600">
              Tailwind CSS
            </span>
            , and state management with{" "}
            <span className="text-blue-600 dark:text-blue-600">
              Redux Toolkit
            </span>
            .
          </li>
          <li>
            <strong>Theme Switcher:</strong> Implemented a dynamic theme
            switcher for toggling between dark and light modes.
          </li>
          <li>
            <strong>Preferences Page:</strong> Users can customize their news
            feed by selecting their preferred category, author, and source.
            Preferences are stored using cookies for persistence.
          </li>
          <li>
            <strong>Article Sources:</strong> Articles are fetched from{" "}
            <span className="text-blue-600 dark:text-blue-600">NewsAPI</span>,{" "}
            <span className="text-blue-600 dark:text-blue-600">
              The Guardian
            </span>
            , and{" "}
            <span className="text-blue-600 dark:text-blue-600">
              The New York Times
            </span>
            .
          </li>
          <li>
            <strong>Pagination:</strong> A user-friendly pagination system
            integrated with URL parameters.
          </li>
          <li>
            <strong>Filter Component:</strong> Users can filter articles by
            date, category, and source. Filters are managed via URL parameters
            for easy navigation and sharing.
          </li>
          <li>
            <strong>Article Redirection:</strong> Clicking on any article card
            redirects users to the original source page for detailed reading.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-text-primary dark:text-text-secondary">
          Technical Highlights
        </h2>
        <ul className="list-disc list-inside space-y-2 text-text-secondary dark:text-text-secondary">
          <li>
            Asynchronous data fetching handled with Redux Toolkit's{" "}
            <span className="text-blue-600 dark:text-blue-600">thunk</span>.
          </li>
          <li>
            Responsive design created with Tailwind's utility-first approach.
          </li>
          <li>
            Preference persistence implemented using{" "}
            <span className="text-blue-600 dark:text-blue-600">js-cookie</span>.
          </li>
          <li>
            Clean routing and navigation powered by{" "}
            <span className="text-blue-600 dark:text-blue-600">
              React Router
            </span>
            .
          </li>
        </ul>

        <p className="text-lg text-text-secondary dark:text-text-secondary">
          This application demonstrates my ability to build scalable and
          maintainable front-end applications, integrate APIs, and ensure a
          smooth user experience.
        </p>
      </div>
    </div>
  );
};

export default About;
