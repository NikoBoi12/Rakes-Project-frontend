/**
 * Converts a File to a raw Base64 string (strips the data URL prefix)
 */
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Takes the pdfFile argument and sends it via HTTP POST
 */
// Add the same helper function here (or export/import it)
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export async function uploadPdf(pdfFile, filters = []) {
  if (!pdfFile) return;

  try {
    const base64String = await convertToBase64(pdfFile);
    const accessToken = getCookie('google_access_token');

    const payload = { file: base64String };
    
    if (filters.length > 0) {
      payload.filters = filters;
    }

    const response = await fetch('http://localhost:5000/create-invite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('Successfully uploaded:', data);
      return data.processed_events;
    } else {
      throw new Error(data.error || 'Failed to process syllabus');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}