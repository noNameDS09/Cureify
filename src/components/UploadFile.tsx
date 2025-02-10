'use client'
import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [img, setImg] = useState(null);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // Check if prompt is provided
    if (!prompt) {
      setError('Prompt is required');
      return;
    }

    // Prepare FormData to send both prompt and image
    const formData = new FormData();
    formData.append('prompt', prompt);
    if (img) {
      formData.append('img', img);  // Append the image file
    }

    // Make the API call to the Flask backend
    try {
      const response = await fetch('http://localhost:5001/process', {
        method: 'POST',
        body: formData,  // Send FormData instead of JSON
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.result);
      }
    } catch (err) {
      console.error('Error during fetch:', err);
      setError('Error during fetch');
    }
  };

  return (
    <div>
      <h1>Submit your prompt</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt"
      />
      <input
        type="file"
        onChange={(e) => setImg(e.target.files[0])}
      />
      <button onClick={handleSubmit}>Submit</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && <p>{result}</p>}

      {img && (
        <div>
          <h2>Uploaded Image</h2>
          <img src={URL.createObjectURL(img)} alt="Uploaded" style={{ maxWidth: '300px', maxHeight: '300px' }} />
        </div>
      )}
    </div>
  );
}

export default App;
