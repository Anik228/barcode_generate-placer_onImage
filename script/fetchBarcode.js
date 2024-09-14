// Import node-fetch using the ES module syntax
import fetch from 'node-fetch';

// API URL
const apiUrl = 'http://localhost:3000/convert';

async function callApi() {
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Log the response from the API
    const responseData = await response.json();
    console.log('API Response:', responseData);
  } catch (error) {
    console.error('Error calling API:', error.message);
  }
}

callApi();
