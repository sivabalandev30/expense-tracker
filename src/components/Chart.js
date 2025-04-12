import React from 'react';
import { useGlobalState } from '../context/GlobalState'; // Corrected import

const Chart = () => {
  const { transactions } = useGlobalState(); // Using useGlobalState to access data

  // Create chart data using the transactions
  // Your chart logic here...

  return (
    <div>
      <h2>Chart</h2>
      {/* Render the chart here */}
    </div>
  );
};

export default Chart;
