/**
 * Redirects to login page if user is not authenticated.
 * Because we are using HttpOnly cookies, we must ping the backend to verify the session.
 */
function redirectIfNotAuthenticated() {
    fetch('/api/auth/check', { 
        method: 'GET',
        credentials: 'include' // This tells the browser to automatically attach the HttpOnly cookie
    })
    .then(res => {
        if (!res.ok) {
            // If the backend returns 401 Unauthorized, kick them back to login
            window.location.href = 'index.html';
        }
    })
    .catch(() => {
        // If the server is unreachable, default to login
        window.location.href = 'index.html';
    });
}

redirectIfNotAuthenticated();