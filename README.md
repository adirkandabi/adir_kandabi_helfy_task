# Task Manager App

## Backend Setup

1. cd api
2. npm install
3. npx nodemon server.js (runs on port 4000)

## Frontend Setup

1. cd app
2. npm install
3. npm run dev (runs on port 3000)

## API Endpoints

- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- PATCH /api/tasks/:id/toggle

## Time Spent

- Backend API: 90 minutes.
- Frontend Core & Carousel: 120 minutes.
- Testing, Polishing & Final Wraps: 30 minutes.

## Design Decisions & Assumptions

- Infinite Carousel: Implemented using a "Cloning" technique to ensure a seamless transition from the last slide back to the first.
- State Management: Used local state and custom hooks for clean separation of concerns.
- Inline Editing: Decided on inline editing within the TaskItem for a faster, more modern user experience compared to modals.
- Search Logic: Implemented client-side for instant feedback as the user types.

## API Documentation

`https://documenter.getpostman.com/view/37942791/2sBXcBnN6N`
