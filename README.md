# Express mongoose api Documentation
The User Management System is a Node.js-based API built with Express and MongoDB. It allows users to perform CRUD operations on user records, including creating, updating, retrieving, and deleting user information. The API also incorporates authentication to ensure secure access to user data.
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
  - [Create a User](#create-a-user)
  - [Get a User by ID](#get-a-user-by-id)
  - [Update the User completely](#update-the-user-completely)
  - [Update any point in the user field](#update-any-point-in-the-user-field)
  - [Delete a User](#delete-a-user)
- [Authentication](#authentication)
## Installation
To install and set up the User Management System API, follow these steps:
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies using `npm install`.
4. Configure the MongoDB connection in the `.env` file.
5. Start the application using `npm start`.
## Usage
Once the API is up and running, you can send HTTP requests to interact with the user records. Use a tool like Postman to test the different endpoints of the API.
The API will be available at `http://localhost:9999` by default.
## Endpoints
### Create a User
- **Endpoint:** `POST /post`
- **Description:** Create a new user record.
- **Request Body:**
  - `name` (string): First name of the user.
  - `surname` (string): Last name of the user.
  - `age` (number): Age of the user.
  - `email` (string): Email address of the user.
  - `gender` (string): Gender of the user.
  - `address` (string): Address of the user.
  - `phone_Number` (string): Phone number of the user.
  - `registration_Date` (string): Registration date of the user.
  - `password` (string): Password of the user (will be stored hashed in the database).
- **Response:**
  - Body: JSON object representing the created user.
### Get a User by ID
- **Endpoint:** `GET /fetch/:id`
- **Description:** Retrieve a specific user by their ID.
- **Parameters:**
  - `id`: The unique identifier of the user.
- **Response:**
  - Body: JSON object representing the user.
### Update the User completely
- **Endpoint:** `PUT /update/:id`
- **Description:** Update a specific user by their ID.
- **Parameters:**
  - `id`: The unique identifier of the user.
- **Request Body:** Same as the create endpoint.
- **Response:**
  - Body: JSON object representing the updated user.
### Update any point in the user field
- **Endpoint:** `PATCH /update/:id`
- **Description:** Update specific fields of a user by their ID.
- **Parameters:**
  - `id`: The unique identifier of the user.
- **Request Body:** A JSON object containing the fields to be updated.
- **Response:**
  - Body: JSON object representing the updated user.
### Delete a User
- **Endpoint:** `DELETE /del/:id`
- **Description:** Delete a specific user by their ID.
- **Parameters:**
  - `id`: The unique identifier of the user.
- **Response:**
  - Status: `204 No Content`
## Authentication
The User Management System API incorporates authentication to secure access to user data. User passwords are stored hashed in the database to ensure their confidentiality.
