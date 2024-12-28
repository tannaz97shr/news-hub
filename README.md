# Frontend Application

This is a frontend application built with React.js.

## About This Project

This project was developed as a case study for my interview process with Innoscripta. It is a modern React application designed to display news articles from multiple sources while offering a seamless and intuitive user experience.

### **Key Features**

- **Technology Stack**: Built with React, styled using Tailwind CSS, and state management with Redux Toolkit.
- **Theme Switcher**: Implemented a dynamic theme switcher for toggling between dark and light modes.
- **Preferences Page**: Users can customize their news feed by selecting their preferred category, author, and source. Preferences are stored using cookies for persistence.
- **Article Sources**: Articles are fetched from NewsAPI, The Guardian, and The New York Times.
- **Pagination**: A user-friendly pagination system integrated with URL parameters.
- **Filter Component**: Users can filter articles by date, category, and source. Filters are managed via URL parameters for easy navigation and sharing.
- **Article Redirection**: Clicking on any article card redirects users to the original source page for detailed reading.

### **Technical Highlights**

- Asynchronous data fetching handled with Redux Toolkit's thunk.
- Responsive design created with Tailwind's utility-first approach.
- Preference persistence implemented using `js-cookie`.
- Clean routing and navigation powered by React Router.

This application demonstrates my ability to build scalable and maintainable front-end applications, integrate APIs, and ensure a smooth user experience.

## Containerizing with Docker

Follow these steps to run the application inside a Docker container:

### **Requirements**

- Docker installed on your system.

### **Steps to Build and Run**

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>

   ```

2. Build the Docker image::

   ```bash
   docker build -t news-hub .
   ```

3. Run the Docker container:

   ```bash
   docker run -p 3000:3000 news-hub
   ```

4. Access the application in your browser at:

   ```bash
   http://localhost:3000
   ```

### Customizing the Port

- To run the application on a different port, modify the docker run command:

```bash
  docker run -p <your-port>:3000 news-hub
```
