# Health Fitness Tracker

## Description

This is a simple health fitness tracker that allows users to track their daily workouts. The user can add new workouts. The user can also view their progress in a graph format.

## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Code Coverage](#code-coverage)

## Technologies

- Angular 19
- PrimeNG
- Tailwind CSS
- Chart.js
- Angular Material

## Installation

To install the necessary dependencies, run the following command:

1. Clone the repository

```bash
git clone https://github.com/mazam5/Workout-Exercises-Tracker-Angular
```

2.Install the dependencies

```bash
npm install
```

3.Run the application

```bash
ng serve --open
```

## Code Coverage

This application uses Angular 19 and uses PrimeNG and Angular Material for the UI components.

The application has the following components:

1. `app.component` - This is the main component that contains the header navigation bar and the router outlet.

2. `workout-list.component` - This component displays the list of workouts and renders the `search-workout-filter.component` component which apply filters to the workouts list.

3. `add-new-workout.component` - This component allows the user to add a new workout. The user can enter the user's name, workout name, and the workout duration, and users can even add multiple workouts by clicking on the `+` Icon Button. This component uses ReactiveForms.

4. `search-workout-filter.component` - This component allows the user to filter the workouts list by the user's name and the workout type.

5. `header.component` - This component displays the header navigation bar.

6. `charts.component` - This component displays the user's workout progress in a bar graph format.

7. `page-not-found.component` - This component gets rendered when it navigates to the undefined route.
