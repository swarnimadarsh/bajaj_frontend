import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [options, setOptions] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    try {
      const jsonInput = JSON.parse(input);
      setError('');
      // Make API call
      axios.post('https://bajaj-backend-9b62.onrender.com/dataRoute/post', jsonInput)
        .then((res) => {
          setResponse(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      setError('Invalid JSON format');
    }
  };

  return (
    <div className="container">
      <h1>Frontend Application</h1>
      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder='{"data":["M","1","334","4","B"]}'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <div>
          <select multiple onChange={(e) => setOptions([...e.target.selectedOptions].map(o => o.value))}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highestLowercase">Highest lowercase alphabet</option>
          </select>
          <div className="response-container">
            {options.includes('alphabets') && (
              <p>Filtered Response<br/><span>Alphabets: {response.alphabets.join(', ')}</span></p>
            )}
            {options.includes('numbers') && (
              <p>Filtered Response<br/><span>Numbers: {response.numbers.join(', ')}</span></p>
            )}
            {options.includes('highestLowercase') && (
              <p>Filtered Response<br/><span>Highest Lowercase: {response.highestLowercase}</span></p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
