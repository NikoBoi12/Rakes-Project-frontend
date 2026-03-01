let client;

/**
 * Initializes Google OAuth 2.0 client on page load.
 * Sets up the request for Google Calendar scopes.
 */
let tokenClient;
window.onload = function() {
<<<<<<< HEAD
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
=======
    const GOOGLE_CLIENT_ID = "109017883108-gjq8t85q8uts1gd2j5h1n0dmutm2ekh0.apps.googleusercontent.com"; //

    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/calendar.events',
        callback: (response) => {
            if (response.access_token) {
                localStorage.setItem('google_access_token', response.access_token);
                window.location.href = 'upload.html'; //
            }
        },
    });

    const loginButton = document.getElementById('google-login-btn');
    if (loginButton) {
        loginButton.onclick = () => {
            tokenClient.requestAccessToken();
        };
>>>>>>> origin/main
    }
};

/**
 * Sends the authorization code to the backend server.
 * The backend will trade it for an Access Token and set an HttpOnly session cookie.
 * @param {string} code - The OAuth authorization code.
 */
<<<<<<< HEAD
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
=======
function handleCredentialResponse(response) {
    localStorage.setItem('google_jwt', response.credential);

    const userInfoContainer = document.getElementById('user-info');
    const userData = parseJwt(response.credential);
    userInfoContainer.innerHTML = `
        <h3>Welcome, ${userData.name}</h3>
        <img src="${userData.picture}" alt="Profile" />
        <p>Email: ${userData.email}</p>
    `;

    setTimeout(() => {
        window.location.href = 'upload.html';
    }, 1200);
}

/**
 * Decodes a JWT token and returns its payload as an object.
 * Note: This does not validate the token.
 * @param {string} token - The JWT token string.
 * @returns {Object} The decoded payload object.
 */
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(char => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );
    return JSON.parse(jsonPayload);
}
>>>>>>> origin/main
