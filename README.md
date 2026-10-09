# Prerequisites

- [Node.js](https://nodejs.org/en/) v20.17.0
- [npm](https://www.npmjs.com/) v10.8.2

# Instructions for local execution

1. Make sure you have installed Node and npm. You can verify this by running the following command in your terminal:

   ```bash
   node -v
   npm -v
   ```

1. Clone the repository
1. Enter the project folder and install the necessary modules from the terminal:

   ```bash
   npm run install:all
   ```

1. Run the follow command on your terminal

   ```bash
   npm run dev
   ```

1. Check the terminal and open this link [http://localhost:5173/](http://localhost:5173/) on your preferred browser to see the vite demo page.

# Instructions for Docker

1. Make sure you have installed Docker and it is running.
2. Run the following command from the project folder:

   ```bash
   docker compose up -d --build
   ```

3. Open this link [http://localhost:8080/](http://localhost:8080/) on your preferred browser.
4. To stop it, run:

   ```bash
   docker compose down
   ```

To run only the database while developing with `npm run dev`, use `docker compose up -d db`.

## Instructions for Docker

To relase the application from the root project folder, run the following command:

```bash
docker compose up -d --build
```
