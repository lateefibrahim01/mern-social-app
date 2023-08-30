# MERN Stack App - Guide to Success

## Description
This MERN (MongoDB, Express, React, Node.js) stack application is a guide to success where users can create, read, update, and delete posts about achieving success in life. It supports user authentication using JWT and Google login. State management is handled with Redux, and the app is styled using Tailwind CSS.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication)
- [CRUD Operations](#crud-operations)
- [State Management](#state-management)
- [Styling](#styling)
- [Contributing](#contributing)
- [License](#license)

## Features
- User Registration and Login (JWT and Google)
- Create, Read, Update, Delete (CRUD) Posts
- State Management with Redux
- Styling with Tailwind CSS

## Technologies
- MongoDB
- Express.js
- React
- Node.js
- Redux
- JWT for Authentication
- Google OAuth for Authentication
- Tailwind CSS

## Installation
1. Clone this repository.
2. Navigate to the project directory, then to sever and client directory.
3. Run `npm install` to install dependencies at server and client directories.
4. Configure environment variables for MongoDB, JWT secret, and Google OAuth credentials.
5. Run `npm start` to start the development server.

## Usage
- Visit the app in your browser at `http://localhost:3000`.
- Register or log in to start using the app.
- Create, read, update, and delete posts about success.

## Authentication
- User authentication is implemented using JSON Web Tokens (JWT) and Google login.
- To enable Google login, provide your Google OAuth credentials in the environment variables.

## CRUD Operations
- Users can perform CRUD operations on posts.
- Create: Click the "Create Post" button and fill out the form.
- Read: Browse and view existing posts.
- Update: Click the edit icon on a post and make changes.
- Delete: Click the delete icon on a post to remove it.

## State Management
- Redux is used for state management.
- Actions, reducers, and store configuration can be found in the `src` directory.

## Styling
- The app is styled using Tailwind CSS.


## Contributing
Contributions are welcome.

## License
This project is licensed under the [MIT License](LICENSE).
