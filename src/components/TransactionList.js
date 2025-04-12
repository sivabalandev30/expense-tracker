// src/components/TransactionList.js
import React from 'react';
import { useGlobalState } from '../context/GlobalState';

const TransactionList = () => {
  const { transactions } = useGlobalState();

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Transaction List</h3>

      <ul className="space-y-2">
        {transactions.map((transaction, index) => (
          <li key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
            <div>
              <p className="font-medium">{transaction.text}</p>
              <span className={`text-sm ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                {transaction.type === 'expense' ? '-' : '+'} ₹{transaction.amount}
              </span>
            </div>
            <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
