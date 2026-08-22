# Hotel Management System

A full-stack **Hotel Management System** developed with **Spring Boot, React, and MySQL**.

The application provides a web-based interface for managing the main operations of a hotel, including customers, addresses, hotels, rooms, employees, reservations, and payments.

---

## Technologies

### Backend

- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- MySQL
- Lombok
- REST API
- Swagger / OpenAPI

### Frontend

- React
- Vite
- JavaScript
- Material UI (MUI)
- Axios
- React Router

### Database

- MySQL

---

## Main Features

The Hotel Management System currently includes the following modules:

- Dashboard
- Customers
- Addresses
- Hotels
- Rooms
- Employees
- Reservations
- Payments

The application supports CRUD operations for the main entities:

- Create
- Read
- Update
- Delete
- Search
- Filtering

---

## Dashboard

The dashboard provides an overview of the hotel management system.

It displays general statistics such as:

- Total Customers
- Total Hotels
- Total Rooms
- Total Employees
- Total Reservations
- Total Payments

It also provides operational statistics including:

- Available Rooms
- Occupied Rooms
- Reserved Rooms
- Maintenance Rooms
- Pending Reservations
- Confirmed Reservations
- Completed Reservations
- Cancelled Reservations
- Total Revenue

---

## Project Structure

```text
hotel-management-system/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/hotelmanagement/
│   │       └── resources/
│   │           └── application-example.properties
│   │
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── database/
│   └── HotelManagementDB.sql
│
├── .gitignore
└── README.md
```

> The `database` directory and SQL script can be added when the database export is prepared.

---

# Installation and Setup

## Prerequisites

Before running the application, make sure the following software is installed:

- Java
- Maven
- Node.js
- npm
- MySQL Server
- Git

An IDE such as IntelliJ IDEA or Visual Studio Code can also be used.

---

## 1. Clone the Repository

Clone the project from GitHub:

```bash
git clone https://github.com/yannisdrougas/hotel-management-system.git
```

Navigate to the project directory:

```bash
cd hotel-management-system
```

---

## 2. Database Setup

The application uses a MySQL database named:

```text
hotelmanagementdb
```

Create the database in MySQL:

```sql
CREATE DATABASE hotelmanagementdb
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

When the database SQL script is included in the repository, it can be imported from:

```text
database/HotelManagementDB.sql
```

The SQL script will contain the required database structure and sample data.

### Important

The Spring Boot application currently uses:

```properties
spring.jpa.hibernate.ddl-auto=validate
```

This means Hibernate validates the existing database schema rather than creating the required tables automatically.

Therefore, the required database tables must exist before starting the backend.

---

## 3. Backend Database Configuration

For security reasons, the real:

```text
application.properties
```

file is **not included in the GitHub repository** because it contains local database credentials.

Instead, the repository contains:

```text
backend/src/main/resources/application-example.properties
```

Navigate to:

```text
backend/src/main/resources/
```

Create a copy of:

```text
application-example.properties
```

and rename the copy to:

```text
application.properties
```

The directory should then contain:

```text
resources/
├── application-example.properties
└── application.properties
```

Edit your local `application.properties` and configure your MySQL username and password:

```properties
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD
```

For example, if your local MySQL username is `root`:

```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

Do **not** commit your local `application.properties` file to Git.

The file is excluded from version control using `.gitignore`.

---

## 4. Run the Backend

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

Run the Spring Boot application with Maven:

```bash
mvn spring-boot:run
```

On Windows, the Maven Wrapper can also be used:

```cmd
mvnw.cmd spring-boot:run
```

The backend runs by default on:

```text
http://localhost:8080
```

---

## 5. API Documentation

The backend provides REST API documentation using Swagger / OpenAPI.

After starting the backend, open:

```text
http://localhost:8080/swagger-ui/index.html
```

Swagger UI can be used to inspect and test the available REST API endpoints.

---

## 6. Install Frontend Dependencies

Open a second terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the required Node.js packages:

```bash
npm install
```

The `node_modules` directory is generated locally and is intentionally excluded from GitHub.

---

## 7. Run the Frontend

Start the Vite development server:

```bash
npm run dev
```

Vite will display the local application URL in the terminal.

Open that URL in your browser to use the Hotel Management System.

---

# Application Modules

## Customers

Provides functionality for managing hotel customers.

Operations include:

- View customers
- Add customers
- Edit customers
- Delete customers
- Search and filtering

---

## Addresses

Provides functionality for managing address information used by the system.

---

## Hotels

Provides functionality for managing hotel information.

---

## Rooms

Provides functionality for managing hotel rooms and room status.

Room statuses include:

- AVAILABLE
- RESERVED
- OCCUPIED
- MAINTENANCE

Room types include:

- SINGLE
- DOUBLE
- SUITE
- DELUXE
- FAMILY

---

## Employees

Provides functionality for managing hotel employees.

Employee positions include:

- MANAGER
- RECEPTIONIST
- HOUSEKEEPING
- CHEF
- WAITER
- MAINTENANCE

Operations include:

- View employees
- Add employees
- Edit employees
- Delete employees
- Search by last name
- Filter by position

---

## Reservations

Provides functionality for managing hotel reservations.

The module supports reservation management and reservation status tracking.

---

## Payments

Provides functionality for managing payments associated with reservations.

Operations include:

- View payments
- Add payments
- Edit payments
- Delete payments
- Filter payments

---

# REST API

The Spring Boot backend exposes REST endpoints for the main application resources.

Main API paths include:

```text
/api/customers
/api/addresses
/api/hotels
/api/rooms
/api/employees
/api/reservations
/api/payments
```

The frontend communicates with these endpoints using Axios.

---

# Security Notes

Sensitive local configuration is intentionally excluded from the repository.

The following file should never contain publicly committed credentials:

```text
backend/src/main/resources/application.properties
```

Only the template:

```text
application-example.properties
```

is stored in GitHub.

Each developer should create their own local `application.properties` file and configure their own MySQL credentials.

---

# Git Workflow

After making changes to the project, the basic Git workflow is:

```bash
git status
git add .
git commit -m "Describe the changes"
git push
```

Files and directories such as the following are excluded through `.gitignore`:

```text
frontend/node_modules/
frontend/dist/
backend/target/
backend/src/main/resources/application.properties
```

---

# Future Improvements

Possible future improvements include:

- Authentication and authorization
- User roles
- Improved dashboard statistics
- Reporting
- Pagination
- Advanced search
- Reservation availability checking
- Payment reporting
- Deployment
- Automated tests

---

# Author

**Yannis Drougas**

Hotel Management System  
Full-stack project using Spring Boot, React, and MySQL.