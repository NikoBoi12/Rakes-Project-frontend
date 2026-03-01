function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

/**
 * Redirects to login page if user is not authenticated.
 */
function redirectIfNotAuthenticated() {
    if (!getCookie('google_access_token')) {
        window.location.href = 'index.html';
    }
}
redirectIfNotAuthenticated();


/**
 * Handles the upload form submission event.
 * Validates file selection and simulates upload (no actual upload logic implemented).
 */
function handleUploadFormSubmit(event) {
    event.preventDefault();
    const fileInput = document.getElementById('syllabus-files');
    const statusDiv = document.getElementById('upload-status');
    const files = fileInput.files;
    if (files.length === 0) {
        statusDiv.textContent = 'Please select at least one file.';
        statusDiv.style.color = '#e91e63';
        return;
    }
    const file = files[0];
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        statusDiv.textContent = 'Only PDF files are allowed.';
        statusDiv.style.color = '#e91e63';
        return;
    }
    statusDiv.textContent = `Uploading ${files.length} file(s)...`;
    statusDiv.style.color = '#ad1457';
    import('./base64ConvertSend.js').then((module) => {
        return module.uploadPdf(file);
    }).then(() => {
        statusDiv.textContent = 'File sent successfully!';
        statusDiv.style.color = '#43a047';
    }).catch((err) => {
        statusDiv.textContent = `Error: ${err.message}`;
        statusDiv.style.color = '#e91e63';
    });
}

document.getElementById('upload-form').onsubmit = handleUploadFormSubmit;
