# Restaurant Reservation System Capstone Project

## Introduction

This project is for the Software Engineering Immersive Program Final Capstone at Thinkful.  The premise is:

> You have been hired as a full stack developer at _Periodic Tables_, a startup that is creating a reservation system for fine dining restaurants.
> The software is used only by restaurant personnel when a customer calls to request a reservation.
> At this point, the customers will not access the system online.

This project's purpose is to showcase my ability to update a webpage from a very basic format to include 8 separate user stories.  The user stories are described in detail in the Instructions.md file.  The purpose of this README is to showcase the final project, what went into its development and how to set it up so you can take a look at the code and implementation.

#
## Final Deployment

* On Render.com: https://restaurant-reservation-client-bnq8.onrender.com
* Github Code: https://github.com/ehvai/Restaurant_Reservation_Capstone

#
## Skills and Technologies Used

 Frontend | Backend
-|-|-
| JavaScript | Node.js
| HTML | Express
| CSS | Knex
| Bootstrap | Cors
| React |

#
## Setup and Installation:

### Setup

Starter code was provided and is discussed in the Instructions.md file.  Instructions on installation and a detailed description of the pass/fail criteria are also discussed in the Intructions.md file.

Starter Thinkful Code: https://github.com/Thinkful-Ed/starter-restaurant-reservation
Sample Thinkful Deployment: https://project-restaurant-reservations.onrender.com/dashboard

Although this project was about establishing user stories, the starter code did not functionally work between front end and back end, so initial code needed to be written for the page to work.

In order to track the user stories, I used a Kanban board provided by GitHub.  After forking and cloning the starter file, I created a new repository with the starter code and linked it to the github project.

Once the code was functional and a very basic dashboard was working, I deployed to Render.com and linked to the main branch of github.  Each user story was created using the relevant branch (i.e., US-01 for user story 1).  Additionally I created a CSS branch at the end for the styling and Readme portion.  When each set of tests passed, I generated a pull request to the main branch.  This then updated the Render.com with the current working code.

### Installation

1. Fork and clone this repository.
1. Run `npm install` to install project dependencies.
1. Run `npx knex` commands from within the `back-end` folder, which is where the `knexfile.js` file is located.
1. Update the `./back-end/.env` file with the connection URL's to your PostgreSQL database instance.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`.
1. Run `npx knex` commands from within the `back-end` folder, which is where the `knexfile.js` file is located.
1. Run `npm run start:dev` within the `back-end` to start your server in development mode.
1. Run `npm start` within the `front-end` to start your local host

#
## API

### Reservations Table

The `reservations` table represents reservations to the restaurant and has the following fields:

- `reservation_id`: (Primary Key)
- `first_name`: (String) The first name of the customer.
- `last_name`: (String) The last name of the customer.
- `mobile_number`: (String) The customer's cell number.
- `reservation_date`: (Date) The date of the reservation.
- `reservation_time`: (Time) The time of the reservation.
- `people`: (Integer) The size of the party.
- `Status`: (String) The reservation status can be _booked, seated, finished, or cancelled_ and defaults to _booked._

An example record:

```json
  {
    "first_name": "Mickey",
    "last_name": "Mouse",
    "mobile_number": "111-111-1111",
    "reservation_date": "2022-11-02",
    "reservation_time": "16:00:00",
    "people": 2,
    "status": "booked"
  }
```

### Tables Table

The `tables` table represents the tables that are available in the restaurant and has the following fields:

- `table_id`: (Primary Key)
- `table_name`: (String) The name of the table.
- `capacity`: (Integer) The maximum number of people that the table can seat.
- `reservation_id`: (Foreign Key) The reservation - if any - that is currently seated at the table.

An example record looks like the following:

```json
  {
    "table_name": "Bar #1",
    "capacity": 1,
    "reservation_id": 10,
  }
```
### Routes

The API has the following routes:

Method | Route | Description
 -|-|-
| `GET` | `/dashboard` | List all reservations for current date as well as tables.
| `GET` | `/dashboard?date=YYYY-MM-DD` | List all reservations based on query date.
| `POST` | `/reservations/new` | Creates a new reservation. `reservation_id` or `status` should not be included but all other fields are required.
| `PUT` | `/reservations/:reservation_id/edit` | Update a specific reservation `by reservation_id`.
| `POST` | `/tables/new` | Creates a new table. `table_name` and `capacity` are required.
| `PUT` | `/:table_id/seat` | Assigns a table to a reservation and changes that reservation `status` to _seated_. Body should only contain `reservation_id`.
| `DELETE` | `/:table_id/seat` | Removes a reservation from a table and changes reservation `status` to _finished_

#
## Screenshots

### Dashboard

The Dashboard displays the list of reservations for the selected date along with all the tables and their current status.

path = '/dashboard'
![dashboard](https://github.com/ehvai/Restaurant_Reservation_Capstone/blob/main/screenshots/dashboard.png)

### Create and Edit Reservations

The Create and Edit Reservations are two separate actions but they use the same base ReservationForm component.

path = '/reservations/new'
![createReservation](https://github.com/ehvai/Restaurant_Reservation_Capstone/blob/main/screenshots/createReservation.png)

The Edit Reservation requires the reservation ID.

path='/reservations/:reservation_id/edit'
![editReservation](https://github.com/ehvai/Restaurant_Reservation_Capstone/blob/main/screenshots/editReservation.png)

### Create Table

The Create Table lets you input a table name with the capacity for the table.

path = '/tables/new'
![createTable](https://github.com/ehvai/Restaurant_Reservation_Capstone/blob/main/screenshots/createTable.png)

### Search

The Search component lets you search the reservations by phone number and lists any that match even a part of the inputted number.

path = '/search'
![search](https://github.com/ehvai/Restaurant_Reservation_Capstone/blob/main/screenshots/search.png)

### Seat Reservation to Table

This is the Seat component.  This allows the user to seat a reservation at an open table.

path = '/reservations/:reservation_id/seat'
![seatReservationToTable](https://github.com/ehvai/Restaurant_Reservation_Capstone/blob/main/screenshots/seatReservationToTable.png)

