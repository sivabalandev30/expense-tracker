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
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  if (!transactions || !categories) {
    return <p>Loading data...</p>;
  }

  const filterTransactionsByDate = (transactions, startDate, endDate) => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const isAfterStartDate = startDate ? transactionDate >= new Date(startDate) : true;
      const isBeforeEndDate = endDate ? transactionDate <= new Date(endDate) : true;
      return isAfterStartDate && isBeforeEndDate;
    });
  };

  const filteredTransactions = filterTransactionsByDate(transactions, startDate, endDate);

  const getCategoryData = (transactionType) => {
    return categories.map((category) => {
      const total = filteredTransactions
        .filter((t) => t.category === category && t.type === transactionType)
        .reduce((sum, t) => sum + (isNaN(parseFloat(t.amount)) ? 0 : parseFloat(t.amount)), 0);

      return { name: category, value: total };
    }).filter(entry => entry.value > 0);
  };

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
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <h2 className="text-lg font-semibold text-center md:text-left">Income & Expenses by Category</h2>
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

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto"
        />
      </div>

      {expenseData.length === 0 && incomeData.length === 0 ? (
        <p className="text-gray-500 text-center">No data available for the selected date range.</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2 p-2">
            <h3 className="text-center font-semibold mb-2">Income</h3>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart(incomeData)}
              </ResponsiveContainer>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-2">
            <h3 className="text-center font-semibold mb-2">Expenses</h3>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart(expenseData)}
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryChart;
