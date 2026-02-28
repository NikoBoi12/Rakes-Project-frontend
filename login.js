let client;

/**
 * Initializes Google OAuth 2.0 client on page load.
 * Sets up the request for Google Calendar scopes.
 */
window.onload = function() {
    const GOOGLE_CLIENT_ID = "109017883108-gjq8t85q8uts1gd2j5h1n0dmutm2ekh0.apps.googleusercontent.com";

    // Initialize the OAuth client to request an Authorization Code
    client = google.accounts.oauth2.initCodeClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/calendar.events', // Request Calendar access
        ux_mode: 'popup',
        callback: (response) => {
            if (response.error) {
                console.error('Login failed:', response.error);
                alert('Authentication was cancelled or failed.');
                return;
            }
            // Send the authorization code to your backend
            sendCodeToBackend(response.code);
        }
    });

    // Attach the click event to your custom UI button
    const loginButton = document.getElementById('google-login-btn');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            // Trigger the Google consent screen
            client.requestCode();
        });
    }
};

/**
 * Sends the authorization code to the backend server.
 * The backend will trade it for an Access Token and set an HttpOnly session cookie.
 * @param {string} code - The OAuth authorization code.
 */
function sendCodeToBackend(code) {
    fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code })
    })
    .then(res => {
        if (res.ok) {
            // The backend successfully set the HttpOnly cookie. 
            // We can now safely redirect.
            window.location.href = 'upload.html';
        } else {
            alert('Backend authentication failed.');
        }
    })
    .catch(err => console.error("Network error:", err));
}