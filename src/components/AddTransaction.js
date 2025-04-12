import React, { useState } from 'react';
import { useGlobalState } from '../context/GlobalState';

const AddTransaction = () => {
  const { transactions, setTransactions } = useGlobalState();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('income'); // Default to 'income'
  const [date, setDate] = useState(''); // New state for date

  // Categories list (you can customize this list)
  const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Other'];

  // Handle adding a new transaction
  const handleAddTransaction = () => {
    if (amount && description && category && date) { // Ensure date is also provided
      const newTransaction = {
        amount,
        description,
        category,
        type,
        date: new Date(date) // Store as a Date object
      };
      setTransactions([...transactions, newTransaction]); // Add to transactions state
      setAmount(''); // Reset amount
      setDescription(''); // Reset description
      setCategory(''); // Reset category
      setDate(''); // Reset date
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-center text-xl font-semibold mb-4">Add Transaction</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAddTransaction(); }}>
        <div className="mb-4">
          <label htmlFor="description" className="block">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="border rounded p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Transaction</button>
      </form>

      {/* Show transactions if available */}
      {transactions.length > 0 && (
        <div className="mt-4">
          <h3 className="text-center text-lg font-semibold">Recent Transactions</h3>
          <ul className="mt-2">
            {transactions.map((transaction, index) => (
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

export default AddTransaction;
