# Syllabus to Calendar - Frontend

A vanilla web application built for RaikesHacks that allows students to seamlessly extract dates from a PDF syllabus and add them directly to their Google Calendar. 

Created by Tyler Roelfs, Evan Wachendorf, & Jesse Mills.

## Features
* **Google OAuth Integration:** Secure user authentication and Calendar API authorization using Google Sign-In.
* **PDF Uploads:** Simple interface for users to select and upload their course syllabi.
* **Event Filtering:** Users can toggle checkboxes to exclude specific types of events (e.g., office hours, class times, exams, or assignments) before processing.
* **Real-time Feedback:** Provides UI updates on the status of the AI parsing and event generation.

## Required Components
* HTML / CSS
* Vanilla JavaScript 
* Node.js / `serve` 

## Setup & Installation

1. **Clone the repository**  

2. **Install dependencies:**
   This project uses a simple local server to avoid CORS issues with ES6 modules.
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   This will run `npx serve .` and host the application locally.

4. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`.


## Related Repos
https://github.com/NikoBoi12/Rakes-Project-backend/blob/main/README.md
