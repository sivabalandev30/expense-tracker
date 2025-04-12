import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalStateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  // Derive categories from transactions, assuming each transaction has a `category` field
  const categories = [...new Set(transactions.map((transaction) => transaction.category))];

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  return (
    <GlobalStateContext.Provider value={{ transactions, setTransactions, categories, filteredTransactions, setFilteredTransactions }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
