import React from 'react';
import { useGlobalState } from '../context/GlobalState'; // Correct import

const Balance = () => {
  const { transactions } = useGlobalState(); // Using transactions data

  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

  const balance = totalIncome - totalExpense;

  return (
    <div>
      <h2>Balance</h2>
      <div>Total Income: {totalIncome}</div>
      <div>Total Expense: {totalExpense}</div>
      <div>Balance: {balance}</div>
    </div>
  );
};

export default Balance;
