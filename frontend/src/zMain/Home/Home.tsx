import React, { useState } from 'react';
import axios from 'axios';


const YourComponent = () => {
  const [message, setMessage] = useState('');

  const handleButtonClick = () => {
    const apiUrl = 'http://localhost:3000';  // Update with your backend's URL

    // Fetch the data from the backend
	axios.get(apiUrl)
	.then(response => setMessage(response.data))  // Use response.data as the string
	.catch(error => console.error('Error fetching data:', error));
  };

  return (
    <div>
      <button style={{
		backgroundColor: 'lavender',
	  	}}
		onClick={handleButtonClick}>Fetch Data from Backend</button>
      <p>Message from backend: {message}</p>
    </div>
  );
};


export default function Home() {

    return (
        <div className="center">
            <YourComponent />
        </div>
    );
}