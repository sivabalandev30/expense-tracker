import React, { useState } from 'react';
import { useGlobalState } from '../context/GlobalState'; 

const DateFilter = () => {
  const { transactions, setTransactions } = useGlobalState(); // Get transactions from global state
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const filterTransactions = () => {
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      const filtered = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= from && transactionDate <= to;
      });
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions); // Reset to all transactions if no filter is applied
    }
  };

  return (
    <div>
      <div className="flex space-x-4">
        <div>
          <label htmlFor="fromDate">From:</label>
          <input
            type="date"
            id="fromDate"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div>
          <label htmlFor="toDate">To:</label>
          <input
            type="date"
            id="toDate"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
      </div>
      <button
        onClick={filterTransactions}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Apply Filter
      </button>

      {/* Show filtered transactions */}
      {filteredTransactions.length > 0 && (
        <div className="mt-4">
          <h3 className="text-center text-lg font-semibold">Filtered Transactions</h3>
          <ul className="mt-2">
            {filteredTransactions.map((transaction, index) => (
              <li key={index} className="flex justify-between py-2">
                <span>{transaction.description} - {transaction.category}</span>
                <span>{transaction.amount} - {new Date(transaction.date).toLocaleDateString()}</span> {/* Ensure date is correctly formatted */}
              </li>
            ))}
          </ul>
        </div>
      )} 
    </div>
  );
};

export default DateFilter;
