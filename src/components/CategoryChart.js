import React, { useState } from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { useGlobalState } from '../context/GlobalState';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#A28EFF'];

const CategoryChart = () => {
  const { transactions, categories } = useGlobalState();
  const [chartType, setChartType] = useState('Pie');
  
  // Date filter state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Ensure transactions and categories are defined before accessing them
  if (!transactions || !categories) {
    return <p>Loading data...</p>;  // Or any appropriate loading state
  }

  // Handle filtering of transactions based on date range
  const filterTransactionsByDate = (transactions, startDate, endDate) => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const isAfterStartDate = startDate ? transactionDate >= new Date(startDate) : true;
      const isBeforeEndDate = endDate ? transactionDate <= new Date(endDate) : true;
      return isAfterStartDate && isBeforeEndDate;
    });
  };

  // Prepare filtered transactions
  const filteredTransactions = filterTransactionsByDate(transactions, startDate, endDate);

  // Prepare data by calculating total expenses and income per category
  const getCategoryData = (transactionType) => {
    return categories.map((category) => {
      const total = (filteredTransactions || [])
        .filter((t) => t.category === category && t.type === transactionType)
        .reduce((sum, t) => sum + (isNaN(parseFloat(t.amount)) ? 0 : parseFloat(t.amount)), 0);

      return { name: category, value: total };
    }).filter(entry => entry.value > 0); // Only include categories with a positive total
  };

  // Prepare data for income and expense separately
  const expenseData = getCategoryData('expense');
  const incomeData = getCategoryData('income');

  const renderChart = (data) => {
    switch (chartType) {
      case 'Bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        );
      case 'Line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        );
      case 'Pie':
      default:
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
    }
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Income & Expenses by Category</h2>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="Pie">Pie Chart</option>
          <option value="Bar">Bar Chart</option>
          <option value="Line">Line Chart</option>
        </select>
      </div>

      <div className="flex mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mr-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        />
      </div>

      {expenseData.length === 0 && incomeData.length === 0 ? (
        <p className="text-gray-500">No data available for the selected date range.</p>
      ) : (
        <div className="flex justify-between">
          <div className="w-1/2 p-2">
            <h3 className="text-center font-semibold">Income</h3>
            <ResponsiveContainer width="100%" height={300}>
              {renderChart(incomeData)}
            </ResponsiveContainer>
          </div>
          <div className="w-1/2 p-2">
            <h3 className="text-center font-semibold">Expenses</h3>
            <ResponsiveContainer width="100%" height={300}>
              {renderChart(expenseData)}
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryChart;
