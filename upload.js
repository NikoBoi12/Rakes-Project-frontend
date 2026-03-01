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
    const submitButton = event.target.querySelector('button[type="submit"]');
    const files = fileInput.files;
    if (submitButton && submitButton.disabled) {
        return;
    }
    if (files.length === 0) {
        statusDiv.textContent = 'Please select at least one file.';
        statusDiv.style.color = '#ff0000';
        return;
    }
    const file = files[0];
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        statusDiv.textContent = 'Only PDF files are allowed.';
        statusDiv.style.color = '#ff0000';
        return;
    }
    statusDiv.textContent = `Analyzing syllabus and creating events\n(this may take a moment)...`;
    statusDiv.style.color = '#3182ce';
    if (submitButton) {
        submitButton.disabled = true;
    }

    import('./base64ConvertSend.js').then((module) => {
        return module.uploadPdf(file);
    }).then((events) => {
        statusDiv.textContent = `Syllabus processed successfully! Created ${events.length} events.`;
    }).catch((err) => {
        statusDiv.textContent = `Error: ${err.message}`;
        statusDiv.style.color = '#ff0000';
    }).finally(() => {
        if (submitButton) {
            submitButton.disabled = false;
        }
    });
}

document.getElementById('upload-form').onsubmit = handleUploadFormSubmit;
