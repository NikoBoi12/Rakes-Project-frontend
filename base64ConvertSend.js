/**
 * Helper: Converts a File to a raw Base64 string (strips the data URL prefix)
 */
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // On success, split the string to remove "data:application/pdf;base64,"
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Main function: Takes the pdfFile argument and sends it via HTTP POST
 */
export async function uploadPdf(pdfFile) {
  // Basic validation to ensure a file was passed
  if (!pdfFile) {
    console.error("No file provided!");
    return;
  }

  try {
    const base64String = await convertToBase64(pdfFile);

    // Setup the HTTP Request payload
    const payload = {
      fileName: pdfFile.name,
      fileData: base64String 
    };

    // Send the HTTP POST request to your backend
    const response = await fetch('https://your-api-endpoint.com/upload', {
      method: 'POST',
      headers: {
        // Tells the backend we are sending JSON data
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(payload)
    });

    // Handle the backend's response
    if (response.ok) {
      const data = await response.json();
      console.log('Successfully uploaded:', data);
    } else {
      console.error('Upload failed with status:', response.status);
    }

  } catch (error) {
    // Catches network errors or conversion issues
    console.error('An error occurred during the upload process:', error);
  }
}