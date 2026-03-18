# Library Book Borrowing System

## Overview
This project is a full-stack web application that manages library book borrowing and returns. It is built using Node.js, Express, and MongoDB, with a lightweight frontend using HTML, CSS, and JavaScript.

The application supports core library operations including book management, member management, borrowing, returning, due date tracking, and fine calculation.

## Features

* Book listing with availability tracking
* Member creation with configurable borrowing limits
* Borrow books with validation checks
* Return books with automatic updates
* Due date tracking (7-day borrowing period)
* Fine calculation for late returns
* Basic frontend interface for interaction
* Health check endpoint for service monitoring

## Technology Stack

* Backend: Node.js, Express.js
* Database: MongoDB with Mongoose
* Frontend: HTML, CSS, JavaScript
* Tools: Git, Postman

## Project Structure

```
library-system/
│
├── config/
│   ├── db.js
│   ├── getNextId.js
│
├── models/
│   ├── book.js
│   ├── member.js
│   ├── borrow.js
│   ├── counter.js
│
├── routes/
│   ├── bookRoutes.js
│   ├── memberRoutes.js
│   ├── borrowRoutes.js
│
├── public/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Application Endpoints

| Functionality | Endpoint                     |
| ------------- | ---------------------------- |
| Frontend UI   | http://localhost:5000        |
| Health Check  | http://localhost:5000/health |
| Books API     | /api/books                   |
| Members API   | /api/members                 |
| Borrow API    | /api/borrows                 |

---

## Sample Usage / Test Flow

### Step 1: Add a Book

Provide title, author, and number of copies, then create a book entry.

---

### Step 2: Add a Member

Provide name, email, and borrowing limit to create a member.

---

### Step 3: Borrow a Book

Provide memberId and bookId.

System validations:

* Member must exist
* Book must be available
* Borrow limit must not be exceeded

---

### Step 4: Return a Book

Provide memberId and bookId.

System actions:

* Marks return date
* Updates available copies
* Calculates fine if overdue

---

### Step 5: Fine Calculation

If a book is returned after the due date:

```
Fine = Number of delayed days × 10 (Rs)
```

---

## Assumptions

* Authentication is not included as it is outside the scope of the assignment
* Books and members are created via API or UI
* Borrow duration is fixed at 7 days
* Each member has a configurable borrowing limit

---

## Design Considerations

* Modular structure with separation of concerns
* RESTful API design
* Input validation and error handling
* Auto-increment IDs implemented using a counter collection
* Scalable and maintainable code organization

---

## Deployment

The application can be deployed on platforms such as Render, Railway, or AWS.

Deployed URL: <https://library-book-borrow-system.onrender.com/>

---

## Status

All required features have been implemented and tested. The application is ready for deployment and submission.

---

## Author

SWAMINATHAN P L
