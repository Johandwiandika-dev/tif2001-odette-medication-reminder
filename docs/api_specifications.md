# API Specifications

## Project
TIF2001 Odette Medication Reminder

## Base URL
http://localhost:5000/api/v1

## Authentication

### Register
- Method: POST
- Endpoint: /auth/register
- Description: Register a new user.

### Login
- Method: POST
- Endpoint: /auth/login
- Description: Authenticate user and return JWT token.

## Medications

### Get Medications
- Method: GET
- Endpoint: /medications
- Description: Get medications belonging to the authenticated user.

### Add Medication
- Method: POST
- Endpoint: /medications
- Description: Add a new medication.

### Update Medication
- Method: PUT
- Endpoint: /medications/:id
- Description: Update medication information.

### Delete Medication
- Method: DELETE
- Endpoint: /medications/:id
- Description: Delete a medication.

## Reminders

### Get Reminders
- Method: GET
- Endpoint: /reminders
- Description: Get reminders belonging to the authenticated user.

### Add Reminder
- Method: POST
- Endpoint: /reminders
- Description: Create a medication reminder.

### Update Reminder
- Method: PUT
- Endpoint: /reminders/:id
- Description: Update a reminder.

### Delete Reminder
- Method: DELETE
- Endpoint: /reminders/:id
- Description: Delete a reminder.
