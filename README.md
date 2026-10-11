# Prerequisites

- [Node.js](https://nodejs.org/en/) v20.17.0
- [npm](https://www.npmjs.com/) v10.8.2

# Instructions for local execution

1. Make sure you have installed Node and npm. You can verify this by running the following command in your terminal:

   ```bash
   node -v
   npm -v
   ```

2. Clone the repository
3. Enter the project folder and install the necessary modules from the terminal:

   ```bash
   npm run install:all
   ```

4. Run the follow command on your terminal

   ```bash
   npm run dev
   ```

5. Check the terminal and open this link [http://localhost:5173/](http://localhost:5173/) on your preferred browser to see the vite demo page.

# Instructions for Database Initialization

The application uses PostgreSQL as its database.

Database initialization is handled automatically by Docker Compose through two SQL scripts:

- `seed/init.sql`: Creates the database tables.
- `seed/seed.sql`: Populates the database with initial data.

## First-time initialization

To initialize the database, run the following command from the project root:

```bash
docker compose up -d
```

On the first startup, PostgreSQL automatically executes `init.sql` followed by `seed.sql`.

## Verify database initialization

To verify that the tables have been created successfully, run:

```bash
docker compose exec db psql -U admin -d admin -c "\dt"
```

## Reset the database

If you need to recreate the database from scratch, run:

```bash
docker compose down -v
docker compose up -d
```

**Warning:** This operation deletes all data stored in the Docker Compose volumes.

The database will be recreated, and both initialization scripts will run again.

## Access the Database

You can access and manage the PostgreSQL database using Adminer.

Open [http://localhost:8090](http://localhost:8090) on your preferred browser.

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

# Authentication and Authorization

The application implements authentication and role-based authorization using JSON Web Tokens (JWT).

Users authenticate using their username and password. Upon successful authentication, the backend generates a JWT that must be included in subsequent requests to access protected API endpoints.

## JWT Configuration

Before running the application, configure the JWT secret key in the backend environment variables.

```bash
JWT_SECRET=your_secret_key
```

## User Authentication

If the credentials are valid, the server responds with `200 OK` and returns a JWT along with the user's information:

```JSON
{
    "message": "Login successful",
    "token": "<JWT_TOKEN>",
    "user": {
        "id": 1,
        "username": "example_user",
        "role": "GUEST"
    }
}
```

The generated JWT is valid for **1 hour**. Once expired, the user must authenticate again to obtain a new token.

If the credentials are invalid, the server responds with `401 Unauthorized`.

## Accessing Protected Endpoints

Protected API endpoints require a valid JWT.

The token must be included in the `Authorization` HTTP header using the Bearer authentication scheme:

```HTTP
Authorization: Bearer <JWT_TOKEN>
```

The backend verifies the JWT before allowing access to protected resources.

## Role-Based Authorization

The application implements **Role-Based Access Control (RBAC)** to restrict access to certain endpoints based on the authenticated user's role.

Currently, the application supports four roles:

- **ADMIN:** Users with administrative privileges
- **OPERATOR**: Users with operative privileges
- **TOTEM**
- **GUEST:** Regular users with limited permissions

Authorization is handled through two Express middleware components:

1. `authenticateToken` &rarr; Verifies the JWT provided in the request and identifies the authenticated user.
   After verifying the token, the middleware retrieves the user's current information from the database. This **ensures that changes to user roles take effect immediately**, even if the user still holds a previously issued JWT.
2. `authorizeRole` &rarr; Checks whether the authenticated user's role is authorized to access the requested endpoint.

The authorization middleware must always be executed after the authentication middleware.

## Authentication and Authorization Errors

The API returns the following HTTP status codes:

| Status Code                 | Description                                                            |
| --------------------------- | ---------------------------------------------------------------------- |
| `200 OK`                    | Authentication successful or authorized request completed successfully |
| `400 Bad Request`           | Missing or invalid request parameters                                  |
| `401 Unauthorized`          | Missing, invalid, or expired JWT, or invalid login credentials         |
| `403 Forbidden`             | The authenticated user does not have the required permissions          |
| `500 Internal Server Error` | An unexpected server error occurred                                    |

## Security Notes

**Current development limitation**: Passwords are temporarily stored in plain text for local testing purposes. Before deploying the application to a production environment, password hashing (e.g., Argon2 or bcrypt) must be implemented.

### JWT Payload

The JWT contains the user's unique identifier (`sub` claim), which is used to identify the authenticated user.

User roles are retrieved directly from the database during each authenticated request rather than relying on potentially outdated JWT claims.

This ensures that permission changes are immediately reflected in subsequent requests.

JWTs are signed but not encrypted, so sensitive information such as passwords must never be included in the token payload.
