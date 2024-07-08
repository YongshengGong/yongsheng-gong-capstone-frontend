# Project Title
Employee Management System

## Overview

Employee Management System is a website that can help a company keep organized with its employees.

### Problem

Employee Management System is a website that can help a company keep organized with its employees. Most companies have to use different apps to manage employee profile, tasks, reports and attendance. With Employee Management System, a company can handle all these tasks in just one place.

### User Profile

- Companies:
    - that want to keep organized with everything related to employees to be  found in one app.

### Features

- As a user, I want to be able to create an account to manage my employees.
- As a logged in user, I want to be able to see all my employees' profiles including managers'.
- As a logged in user, I want to be able to divide employees into different groups.
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
    - jwt-decode
    - uuid
    - antd
- Server libraries:
    - knex
    - express
    - bcrypt
    - jsonwebtoken
    - mysql2
    - cors
- Deployment tools:
    - Netlify for frontend
    - Heroku for backend
    - JawsDB MySQL for database

### APIs

- No external APIs will be used for the first sprint

### Sitemap

- Home page
- Login page
- Boss account register page (this action will also create a new company for employees to join )
- Employee account apply page (applicants have to apply for a specific company account)
- Teams page (logged in) 
- Applicant Page (logged in) (only visible to boss and managers)

### Mockups

#### Home Page (h4)
![alt](src/assets/images/home_page.jpeg)


#### Register Page
<!-- ![]() -->

#### Login Page
![](src/assets/images/login_page.jpeg)

#### Employees Page
![](src/assets/images/employee_page.jpeg)

#### Payroll Page
![](src/assets/images/payroll_page.jpeg)

#### Tax Page
<!-- ![](view-cafe.png) -->

#### Task and Feedback Page
![alt](src/assets/images/task_page.jpeg)

#### Attendance and Notes Page
![](src/assets/images/attendence_notes_page.jpeg)

#### Reports Page
![](src/assets/images/reports_page.jpeg)




### Endpoints

**GET /companies**

Response:
```
{
    "id" : "1",
    "company_name": "Peter's company"
},
    ...

```

**GET /teams**

Response:
```
[
    {
       "id" : "1",
       "company_id": "1",
       "team_name": "Boss (Default)"
    },
    {
    "id" : "2",
    "company_id": "1",
    "team_name": "Managers (Default)"
    },
    {
    "id" : "3",
    "company_id": "1",
    "team_name": "Pending (Default)"
    },
    {
    "id" : "4",
    "company_id": "1",
    "team_name": "Applicants"
    },
    ...
]
```

**GET /members**

Response:
```
{
    "id" : "1",
    "company_id": "1",
    "team_id": "1",
    "username": "peter123",
    "password": "$2b$06$Ewg68SMHpqQJNiNGFu6YUOepOar3MOUKufSnSjfyxoxRSeHglslIC",
    "member_name": "Peter",
    "member_title": "Boss",
    "member_email": "peter@gmail.com",
    "member_phone": "6135393902",
    "member_address": "123 St.",
    "isTeamLeadOrNot": "0"
},
    ...
```


**POST /members**

Parameters: body object

Response: same as GET /members

**POST /teams**

Parameters: body object

Response: same as GET /teams

**POST /companies**

Parameters: body object

Response: same as GET /companies


**PUT /members/:memberID**

Parameters: body object

Response: same as GET /members

**PUT /teams/:teamID**

Parameters: body object

Response: same as GET /teams

**PUT /companies/:companyID**

Parameters: body object

Response: same as GET /companies





### Auth

- JWT Authentication:
    This is the process of verifying the identity of a user. When a user logs in with their credentials (like a username and password), the server authenticates the user's identity and issues a JWT token.
- JWT Authorization:
    After a user is authenticated, JWTs are used to control access to resources. The server checks the JWT to determine what resources the user is allowed to access.
- Role-based access control (RBAC) system:
    RBAC assigns permissions to users based on their roles within an organization.

## Roadmap

- Client
    - react vite project
    - install all dependencies with "npm i"
    - run with "npm run dev"

- Server and Database
    - ndoe express project with routings
    - install all dependencies with "npm i"
    - copy everything from ".env.example" file into a newly created ".env" file
    - make sure that MySQL is locally running
    - create a new database schema with the same name according to the ".env" file
    - migrate all migration files with "npx knex migrate:latest"
      (omit "npx" if the knex command-line tool is installed globally on your system)
    - run all seed files with "npx knex seed:run"
    - use "npx knex migrate:rollback" in case you want to delete the tables you just inserted.
    - run with "npm start"


- Features: 
  - Home page
  - Log in page
  - Register page
    - this is only for boss to first time register a new company
    - this action will create a new company and a boss account at the same time
  - Apply page
    - members must apply to become a specific company member
    - company's boss or manager will contact you with the provided account username and password once approved
    - you can type to search for a company, or you can hover on the input to display all existing companies
  - Nav menu that pops up from the left side (logged in), includes:
    - "Teams" section
      - list all teams
      - list all members in each team
      - display and edit profile information
        - people in "Boss (Default)" team can view and edit everyone's profile
        - people in "Managers (Default)" team can view and edit everyone's except boss's profile
        - people in all other teams can only view and edit their own profile
        - editting team in the profile can cause a member to switch to different team
      - add a new team
        - people in "Boss (Default)" or "Managers (Default)" team can add a new team 
      - delete a team
        - people in "Boss (Default)" or "Managers (Default)" team can delete a team 
        - if there are members currently inside the team that is about to be deleted,
          deleting the team will automatically move them to the "Pending (Default)" team
        - The three default teams cannot be deleted
      - search for a member
        - type in to search
        - or, the search bar, when hovered, will display all members for you to choose
        - pressing 🔍 will scroll to the current location of the member if a member is found
    - "Applicants" section 
      - only visible to boss and managers
      - list all applicants
        - view applicants' profile information
        - approve to move the applicant to the "Teams" section with a specific team assigned
        - refuse to completely delelte the applicant from the database
        - or send an email first and then approve
           - this action will automatically opens up default email app with pre-written subject and    body, body includes the username and password generated for the applicant's new account, you can always edit the subject and body before openning up the email

## Nice-to-haves
 - a task asigning section on the nav menu (logged in)
 - a report section on the nav menu that displays employees' performance with a chart (logged in)
 - a log out section on the nav menu (logged in)
 - ultimate goal
   - a real time chatting system to enhance workplace efficiency

