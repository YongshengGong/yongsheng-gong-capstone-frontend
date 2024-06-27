# Project Title
Employee Management System

## Overview

Employee Management System is a website that can help a company keep organized with its employees.

### Problem

Employee Management System is a website that can help a company keep organized with its employees. Most companies have to use different apps to manage attendance, payroll, tax, sick and leave notes, tasks, performance and reports. With Employee Management System, a company can handle all these tasks in just one place.

### User Profile

- Companies:
    - that want to keep organized with everything related to employees to be  found in one app.

### Features

- As a user, I want to be able to create an account to manage my employees.
- As a logged in user, I want to be able to see all my employees' profiles including managers'.
- As a logged in user, I want to be able to divide employees into different group with different duties.
- As a logged in user, I want to be able to write payroll and tax slips.
- As a logged in user, I want to be able to assign tasks and provide feedbacks.
- As a logged in user, I want to be able to receive attendance, notes and reports.

## Implementation

### Tech Stack

- React
- MySQL
- Express
- Client libraries: 
    - react
    - react-router
    - react-router-dom
    - axios
    - sass
    - react-resizable
    - react-rnd
    - antd
- Server libraries:
    - knex
    - express
    - bcrypt for password hashing
    - jsonwebtoken
    - mysql2
    - cors

### APIs

- No external APIs will be used for the first sprint

### Sitemap

- Home page
- List employees
- Write payroll, tax, tasks, feedbacks
- Review notes and reports
- Register
- Login

### Mockups

#### Home Page (h4)
![alt](src/assets/images/home_page.jpg)


#### Register Page
<!-- ![](register.png) -->

#### Login Page
<!-- ![](login.png) -->

#### Employees Page
<!-- ![](enter-location.png) -->

#### Payroll Page
<!-- ![](view-cafes.png) -->

#### Tax Page
<!-- ![](view-cafe.png) -->

#### Task Page
<!-- ![](view-cafe-rated.png)s -->

#### Feedback Page

#### Notes Page

#### Reports Page


### Data

<!-- ![](sql-diagram.png) -->

### Endpoints

**GET /cafes**

<!-- - Get cafés, with an optional "visited" if the user is logged in or not -->

Parameters:
<!-- - longitude: User-provided location as a number -->
<!-- - latitude: User-provided location as a number -->
<!-- - token (optional): JWT used to add "visited" boolean -->


Response:
<!-- ```
[
    {
        "id": 1,
        "name": "Quantum Coffee",
        "distance": 0.25,
        "averageRating": 4.5,
        "visited": true
    },
    ...
]
``` -->

**GET /cafes/:id**

<!-- - Get café by id, with an optional "userRating" if the user is logged in or not -->

Parameters:
<!-- - id: Café id as number -->
<!-- - token (optional):  JWT used to add user rating -->

Response:
<!-- ```
{
    "id": 1,
    "name": "Quantum Coffee",
    "distance": 0.25,
    "averageRating": 4.5,
    "userRating": 5
}
``` -->

**POST /cafes/:id/rating**

<!-- - Logged in user can add their rating of a café -->

Parameters:
<!-- - id: Café id -->
<!-- - token: JWT of the logged in user -->
<!-- - rating: Number Rating out of 5 in 0.5 increments -->

Response:
<!-- ```
{
    "id": 1,
    "name": "Quantum Coffee",
    "distance": 0.25,
    "averageRating": 4.5,
    "userRating": 5
}
``` -->

**PUT /cafes/:id/rating**

<!-- - Logged in user can update their rating of a café -->

Parameters:
<!-- - id: Café id -->
<!-- - token: JWT of the logged in user -->
<!-- - rating: Number Rating out of 5 in 0.5 increments -->

Response:
<!-- ```
{
    "id": 1,
    "name": "Quantum Coffee",
    "distance": 0.25,
    "averageRating": 4.5,
    "userRating": 5
}
``` -->

**POST /users/register**

- Add a user account

Parameters:

- email: User's email
- password: User's provided password

Response:
```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

**POST /users/login**

- Login a user

Parameters:
- email: User's email
- password: User's provided password

Response:
```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

### Auth

- JWT auth
    - Before adding auth, all API requests will be using a fake user with id 1
    - Added after core features have first been implemented
    - Store JWT in localStorage, remove when a user logs out
    - Add states for logged in showing different UI in places listed in mockups

## Roadmap

- Create client
    - react project with routes and boilerplate pages

- Create server
    - express project with routing, with placeholder 200 responses

- Create migrations

- Gather 15 sample café geolocations in two different cities

- Create seeds with sample café data

- Deploy client and server projects so all commits will be reflected in production

- Feature: List cafés from a given location
    - Implement list cafés page including location form
    - Store given location in sessionStorage
    - Create GET /cafes endpoint

- Feature: View café
    - Implement view café page
    - Create GET /cafes/:id 

- Feature: Rate café
    - Add form input to view café page
    - Create POST /ratings
    - States for add & update ratings 

- Feature: Home page

- Feature: Create account
    - Implement register page + form
    - Create POST /users/register endpoint

- Feature: Login
    - Implement login page + form
    - Create POST /users/login endpoint

- Feature: Implement JWT tokens
    - Server: Update expected requests / responses on protected endpoints
    - Client: Store JWT in local storage, include JWT on axios calls

- Bug fixes

- DEMO DAY

## Nice-to-haves

- Integrate Google Places / Maps
    - View more details about a café
    - Visual radius functionality
- Forgot password functionality
- Ability to add a café 
- Elite status badging for users and cafés: Gamify user ratings
- Expand rating system
    - Coffee
    - Ambiance
    - Staff
- Expanded user information: full name, favorite café
- Unit and Integration Tests

