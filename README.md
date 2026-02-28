
# Raikes Hacks Calendar Project - Frontend

This is the frontend for the Syllabus to Calendar app. It allows users to log in with Google, upload syllabus files, and add events to their Google Calendar.

## Features
- Google OAuth login using Google Identity Services
- Authenticated file upload page
- Simulated upload process (no backend integration)

## Usage
1. Run the static server:
	```bash
	npm start
	```
2. Open `index.html` in your browser.
3. Log in with Google and follow the prompts to upload your syllabus files.

## File Overview
- `index.html`: Main login page
- `script.js`: Handles Google login and user info display
- `upload.html`: File upload page for authenticated users
- `upload.js`: Handles authentication check and upload form logic

## Development
To modify or extend functionality, edit the relevant JS and HTML files. All code is documented for clarity.