# HR Backend Project

This is the backend project for the HR (Human Resources) system. It provides the necessary APIs and functionalities to manage employee data, training records, and other HR-related operations.

## Features

- **Employee Management**: Create, update, and delete employee records. Retrieve employee details and search for employees based on various criteria.
- **Training Management**: Track employee training records, including training name, start date, end date, trainer, and description. Update and delete training records.
- **Authentication and Authorization**: Secure endpoints with user authentication. Differentiate user roles for access control.
- **API Documentation**: Detailed documentation of the available APIs and their usage.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web application framework for building RESTful APIs.
- **MongoDB**: Database to store employee and training data.
- **Mongoose**: Object-Document Mapping (ODM) library for MongoDB.
- **JWT**: Authentication mechanism using JSON Web Tokens.
- **Joi**: Data validation library for validating request payloads.
- **Swagger**: API documentation using Swagger UI.

## Installation

1. Clone the repository:
git clone https://github.com/robenend/hr-backend-project.git ↗

2. Install the dependencies:
npm install

3. Configure the environment variables:
- Rename the `.env.example` file to `.env`.
- Update the `.env` file with your specific configuration (database connection, JWT secret, etc.).

4. Start the server:
npm start


## License

This project is licensed under the [MIT License].
```


