import React, { useState } from 'react';
import { useGlobalState } from '../context/GlobalState';

const DateFilter = () => {
  const { transactions } = useGlobalState();
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
      setFilteredTransactions(transactions);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-2xl mx-auto">
      {/* Date Inputs */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="flex flex-col w-full">
          <label htmlFor="fromDate" className="text-gray-700 font-medium mb-1">From:</label>
          <input
            type="date"
            id="fromDate"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="toDate" className="text-gray-700 font-medium mb-1">To:</label>
          <input
            type="date"
            id="toDate"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={filterTransactions}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto mt-2 sm:mt-0"
        >
          Apply Filter
        </button>
      </div>

      {/* Filtered Transactions */}
      {filteredTransactions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-center text-lg font-semibold text-gray-700">Filtered Transactions</h3>
          <ul className="mt-4 divide-y divide-gray-200">
            {filteredTransactions.map((transaction, index) => (
              <li key={index} className="py-2 flex justify-between text-sm sm:text-base">
                <div className="text-gray-600">
                  {transaction.description} - <span className="italic">{transaction.category}</span>
                </div>
                <div className="text-gray-800 font-medium">
                  ₹{transaction.amount} <span className="text-gray-500 text-sm">({new Date(transaction.date).toLocaleDateString()})</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DateFilter;
