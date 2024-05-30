# Cultivation Team Management App

## Overview

This project is a React application designed to manage a cultivation team in a greenhouse. It allows company admins to manage which users have access to a cultivation, assign roles, and remove users from the cultivation team. The app interacts with a mock API to fetch and manipulate cultivation and user data.

## Features

- Display a list of cultivation users with their roles.
- Add new users to the cultivation team through a searchable modal.
- Update the role of existing users.
- Remove users from the cultivation team.
- Consumes a provided mock API for data operations.

## Technologies Used

- **React**: Latest version for building the user interface.
- **TypeScript**: For type-safe development.
- **React Query**: For data fetching and state management.
- **React Router DOM**: For navigation.
- **Tailwind CSS**: For styling components.
- **Jest**: For unit testing.
- **Playwright**: For end-to-end testing.
- **Nx**: For workspace management and development tooling.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/mmahabadi/source-assignment-frontend-engineer.git
    cd source-assignment-frontend-engineer
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

## Running the Application

To start the application in development mode, run:
```bash
npm run dev
```
The application will be available at http://localhost:4200.

## Testing
To run the unit tests using Jest:
```bash
npm test
```
### End-to-End Tests
To run the end-to-end tests using Playwright:
```bash
npm run test:e2e
```

To run the end-to-end tests in UI mode:
```bash
npm run test:e2e:ui
```

## Conclusion
This project demonstrates the application of frontend engineering techniques to build a functional and interactive React application. It showcases the integration of various technologies and best practices in React development.