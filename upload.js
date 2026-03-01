
/**
 * Redirects to login page if user is not authenticated.
 * Authentication is checked by presence of Google JWT in localStorage.
 */
function redirectIfNotAuthenticated() {
    if (!localStorage.getItem('google_access_token')) { // Updated key
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
