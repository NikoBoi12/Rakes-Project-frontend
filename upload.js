
/**
 * Redirects to login page if user is not authenticated.
 * Authentication is checked by presence of Google JWT in localStorage.
 */
function redirectIfNotAuthenticated() {
    if (!localStorage.getItem('google_jwt')) {
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
    statusDiv.textContent = `Uploading ${files.length} file(s)...`;
    statusDiv.style.color = '#ad1457';
    // TODO: Implement actual upload logic here
    setTimeout(() => {
        statusDiv.textContent = 'Files uploaded successfully!';
        statusDiv.style.color = '#43a047';
    }, 1200);
}

document.getElementById('upload-form').onsubmit = handleUploadFormSubmit;
