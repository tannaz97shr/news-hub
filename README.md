# Frontend Application

This is a frontend application built with React/Next.js.

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
   docker build -t my-frontend-app .
   ```

3. Run the Docker container:

   ```bash
   docker run -p 3000:3000 my-frontend-app
   ```

4. Access the application in your browser at:

   ```bash
   http://localhost:3000
   ```

### Customizing the Port

- To run the application on a different port, modify the docker run command:

```bash
  docker run -p <your-port>:3000 my-frontend-app
```
