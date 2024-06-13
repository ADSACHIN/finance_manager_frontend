import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpendingPrediction = () => {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        console.log('Sending request to backend...');
        const { data } = await axios.post('/api/predict', {
          month: new Date().getMonth() + 1,
          weekday: new Date().getDay(),
        });
        console.log('Received response from backend:', data);
        
        if (data && data.predictedAmount !== undefined) {
          console.log('Setting prediction:', data.predictedAmount);
          setPrediction(data.predictedAmount);
        } else {
          console.error('Invalid response format:', data);
          setError('Invalid response format');
        }
      } catch (error) {
        console.error('Error occurred:', error.message);
        setError(error.message);
      }
    };

    fetchPrediction();
  }, []);

  return (
    <div>
      <h1>Prediction</h1>
      {prediction !== null && <p>Predicted Spending: ${prediction.toFixed(2)}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default SpendingPrediction;
