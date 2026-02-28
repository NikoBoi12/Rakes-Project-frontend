/**
 * Initializes Google Sign-In on page load.
 * Renders the Google login button and sets up the callback.
 */
window.onload = function() {
    const GOOGLE_CLIENT_ID = "109017883108-gjq8t85q8uts1gd2j5h1n0dmutm2ekh0.apps.googleusercontent.com";
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse
    });
    const loginButton = document.getElementById('google-login-btn');
    if (loginButton) {
        google.accounts.id.renderButton(
            loginButton,
            { theme: "outline", size: "large" }
        );
    }
};

/**
 * Handles the Google credential response after login.
 * Saves JWT, displays user info, and redirects to upload page.
 * @param {Object} response - The Google credential response object.
 */
function handleCredentialResponse(response) {
    // Save JWT to localStorage for authentication
    localStorage.setItem('google_jwt', response.credential);

    // Decode JWT to get user info
    const userInfoContainer = document.getElementById('user-info');
    const userData = parseJwt(response.credential);
    userInfoContainer.innerHTML = `
        <h3>Welcome, ${userData.name}</h3>
        <img src="${userData.picture}" alt="Profile" />
        <p>Email: ${userData.email}</p>
    `;

    // Redirect to upload page after short delay
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
