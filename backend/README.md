# Backend API Documentation

This document outlines the API routes available in the backend of the PostAcle application.

## Base URL
`/api`

## Authentication
Some routes require an API Key to be passed in the `x-api-key` header.

## API Routes

### 1. User Routes (`/api/users`)

**Purpose**: Handles user registration and login.

-   **`POST /api/users/register`**
    -   **Description**: Registers a new user. Only users with `owner` permissions can access this route.
    -   **Authentication**: Required (owner API Key).
    -   **Request Body (JSON)**:
        ```json
        {
          "username": "string",
          "password": "string",
          "userType": "string" (e.g., "writer", "manager", "recruiter", "owner"),
          "apiKey": "string"
        }
        ```
    -   **Responses**:
        -   `201 Created`: User registered successfully.
        -   `403 Forbidden`: If the authenticated user is not an owner.
        -   `500 Internal Server Error`: For other errors.

-   **`POST /api/users/login`**
    -   **Description**: Authenticates a user and returns their API Key.
    -   **Authentication**: None.
    -   **Request Body (JSON)**:
        ```json
        {
          "username": "string",
          "password": "string"
        }
        ```
    -   **Responses**:
        -   `200 OK`: Logged in successfully, returns `apiKey`.
        -   `400 Bad Request`: Invalid credentials.
        -   `500 Internal Server Error`: For other errors.

### 2. Blog Routes (`/api/blogs`)

**Purpose**: Manages permanent and temporary blog posts, including retrieval, creation, modification, deletion, and approval workflows.

-   **`GET /api/blogs/index`**
    -   **Description**: Retrieves a limited number of blogs from the index collection.
    -   **Authentication**: None.
    -   **Query Parameters**:
        -   `limit`: (Optional) Number of blogs to return (default: 4).
    -   **Responses**:
        -   `200 OK`: Returns an array of index blogs.
        -   `500 Internal Server Error`: For other errors.

-   **`GET /api/blogs/best`**
    -   **Description**: Retrieves the top 5 blogs from the best collection.
    -   **Authentication**: None.
    -   **Responses**:
        -   `200 OK`: Returns an array of best blogs.
        -   `500 Internal Server Error`: For other errors.

-   **`GET /api/blogs/:blogID`**
    -   **Description**: Retrieves a specific blog by its `blogID`.
    -   **Authentication**: None.
    -   **URL Parameters**:
        -   `blogID`: The unique identifier of the blog.
    -   **Responses**:
        -   `200 OK`: Returns the blog object.
        -   `404 Not Found`: If the blog does not exist.
        -   `500 Internal Server Error`: For other errors.

-   **`POST /api/blogs`**
    -   **Description**: Adds a new permanent blog. Requires `manager` permissions.
    -   **Authentication**: Required (manager API Key).
    -   **Request Body (JSON)**: Blog object (refer to `Blog` model for schema).
    -   **Responses**:
        -   `201 Created`: Blog added successfully.
        -   `403 Forbidden`: If the authenticated user is not a manager.
        -   `500 Internal Server Error`: For other errors.

-   **`POST /api/blogs/temp`**
    -   **Description**: Adds a new temporary blog. Requires `writer` permissions.
    -   **Authentication**: Required (writer API Key).
    -   **Request Body (JSON)**: Temporary blog object (refer to `TempBlog` model for schema).
    -   **Responses**:
        -   `201 Created`: Temporary blog added successfully.
        -   `403 Forbidden`: If the authenticated user is not a writer.
        -   `500 Internal Server Error`: For other errors.

-   **`PUT /api/blogs/:blogID`**
    -   **Description**: Modifies an existing permanent blog. Requires `manager` permissions.
    -   **Authentication**: Required (manager API Key).
    -   **URL Parameters**:
        -   `blogID`: The unique identifier of the blog to modify.
    -   **Request Body (JSON)**: Fields to update (e.g., `title`, `content`, `isBest`).
    -   **Responses**:
        -   `200 OK`: Blog updated successfully.
        -   `403 Forbidden`: If the authenticated user is not a manager.
        -   `404 Not Found`: If the blog does not exist.
        -   `500 Internal Server Error`: For other errors.

-   **`DELETE /api/blogs/:blogID`**
    -   **Description**: Deletes a permanent blog. Requires `manager` permissions.
    -   **Authentication**: Required (manager API Key).
    -   **URL Parameters**:
        -   `blogID`: The unique identifier of the blog to delete.
    -   **Responses**:
        -   `200 OK`: Blog deleted successfully.
        -   `403 Forbidden`: If the authenticated user is not a manager.
        -   `404 Not Found`: If the blog does not exist.
        -   `500 Internal Server Error`: For other errors.

-   **`POST /api/blogs/approve/:blogID`**
    -   **Description**: Approves a temporary blog, moving it to the permanent blog collection. Requires `manager` permissions.
    -   **Authentication**: Required (manager API Key).
    -   **URL Parameters**:
        -   `blogID`: The unique identifier of the temporary blog to approve.
    -   **Responses**:
        -   `200 OK`: Temporary blog approved and moved.
        -   `403 Forbidden`: If the authenticated user is not a manager.
        -   `404 Not Found`: If the temporary blog does not exist.
        -   `500 Internal Server Error`: For other errors.

-   **`POST /api/blogs/deapprove/:blogID`**
    -   **Description**: De-approves a permanent blog, moving it back to the temporary blog collection. Requires `manager` permissions.
    -   **Authentication**: Required (manager API Key).
    -   **URL Parameters**:
        -   `blogID`: The unique identifier of the permanent blog to de-approve.
    -   **Responses**:
        -   `200 OK`: Blog de-approved and moved to temporary.
        -   `403 Forbidden`: If the authenticated user is not a manager.
        -   `404 Not Found`: If the blog does not exist.
        -   `500 Internal Server Error`: For other errors.

### 3. Generate Blog Routes (`/api/generate`)

**Purpose**: Handles the generation of temporary blog content using AI and integrates with image services.

-   **`POST /api/generate/generate`**
    -   **Description**: Generates a temporary blog post from raw text, including image search and upload. Requires `writer` permissions.
    -   **Authentication**: Required (writer API Key).
    -   **Request Body (JSON)**:
        ```json
        {
          "rawText": "string" // The raw text to generate the blog from
        }
        ```
    -   **Responses**:
        -   `201 Created`: Temporary blog generated and saved successfully.
        -   `400 Bad Request`: If `rawText` is missing.
        -   `403 Forbidden`: If the authenticated user is not a writer.
        -   `500 Internal Server Error`: For other errors during generation or image processing.

### 4. Writer Routes (`/api/writer`)

**Purpose**: Provides functionalities specific to writers, such as generating, modifying, and viewing their own blogs.

-   **`POST /api/writer/generate-blog`**
    -   **Description**: Generates a blog from raw text and saves it as a draft. Requires `writer` permissions.
    -   **Authentication**: Required (writer API Key).
    -   **Request Body (JSON)**:
        ```json
        {
          "rawText": "string" // The raw text for blog generation
        }
        ```
    -   **Responses**:
        -   `201 Created`: Blog content generated and saved as draft successfully.
        -   `400 Bad Request`: If `rawText` is missing.
        -   `403 Forbidden`: If the authenticated user is not a writer.
        -   `500 Internal Server Error`: For other errors.

-   **`PUT /api/writer/modify-blog/:blogId`**
    -   **Description**: Modifies an existing blog (either temporary or permanent, depending on implementation details in `writerController.js`). Requires `writer` permissions.
    -   **Authentication**: Required (writer API Key).
    -   **URL Parameters**:
        -   `blogId`: The ID of the blog to modify.
    -   **Request Body (JSON)**: Fields to update (e.g., `title`, `content`, `tags`, `categories`, `status`).
    -   **Responses**:
        -   `200 OK`: Blog updated successfully.
        -   `403 Forbidden`: If the authenticated user is not the author of the blog.
        -   `404 Not Found`: If the blog does not exist.
        -   `500 Internal Server Error`: For other errors.

-   **`GET /api/writer/my-blogs`**
    -   **Description**: Retrieves all blogs associated with the authenticated writer.
    -   **Authentication**: Required (writer API Key).
    -   **Responses**:
        -   `200 OK`: Returns an array of blogs written by the authenticated user.
        -   `500 Internal Server Error`: For other errors.

### 5. GitHub Routes (`/api/github`)

**Purpose**: Synchronizes blog data from the MongoDB database to a GitHub repository.

-   **`GET /api/github/sync`**
    -   **Description**: Syncs `index.json`, `best.json`, and individual blog files from the database to the configured GitHub repository.
    -   **Authentication**: None (though typically protected by internal mechanisms or specific API keys in a production environment).
    -   **Responses**:
        -   `200 OK`: GitHub repository synced successfully.
        -   `500 Internal Server Error`: For errors during synchronization.