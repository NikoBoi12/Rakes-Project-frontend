window.onload = function() {
    const clientId = "109017883108-gjq8t85q8uts1gd2j5h1n0dmutm2ekh0.apps.googleusercontent.com";
    const loginBtn = document.getElementById('google-login-btn');
    if (loginBtn) {
        loginBtn.onclick = function() {
            google.accounts.id.initialize({
                client_id: clientId,
                callback: handleCredentialResponse
            });
            google.accounts.id.prompt();
        };
    }
};

function handleCredentialResponse(response) {
    // Decode JWT to get user info
    const userInfoDiv = document.getElementById('user-info');
    const data = parseJwt(response.credential);
    userInfoDiv.innerHTML = `
        <h3>Welcome, ${data.name}</h3>
        <img src="${data.picture}" alt="Profile" style="border-radius:50%;width:80px;height:80px;" />
        <p>Email: ${data.email}</p>
    `;
}

function parseJwt(token) {
    // Basic JWT parsing (no validation)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
