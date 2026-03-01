/**
 * Initializes Google Sign-In on page load.
 * Renders the Google login button and sets up the callback.
 */
let tokenClient;
window.onload = function() {
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
    }
};

/**
 * Handles the Google credential response after login.
 * Saves JWT, displays user info, and redirects to upload page.
 * @param {Object} response - The Google credential response object.
 */
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
