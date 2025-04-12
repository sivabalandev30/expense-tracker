import React, { useState } from 'react';
import { GlobalProvider } from './context/GlobalState';
import Navbar from './components/Navbar';
import AddTransaction from './components/AddTransaction';
import Balance from './components/Balance';
import TransactionList from './components/TransactionList';
import Chart from './components/Chart';
import CategoryChart from './components/CategoryChart';
import DateFilter from './components/DateFilter';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filteredDateRange, setFilteredDateRange] = useState(null);

  return (
    <GlobalProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Tab Buttons */}
        <div className="flex justify-center space-x-4 mt-6 mb-4 flex-wrap">
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === 'report' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('report')}
          >
            Report
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === 'chart' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('chart')}
          >
            Chart
          </button>
        </div>

        {/* Date Filter for Report Tab */}
        {activeTab === 'report' && (
          <div className="flex justify-center mt-4 mb-6">
            <DateFilter setFilteredDateRange={setFilteredDateRange} />
          </div>
        )}

        {/* Main Content */}
        {activeTab === 'dashboard' ? (
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6">
              <div className="md:col-span-1 sm:col-span-1">
                <AddTransaction />
              </div>
              <div className="md:col-span-2 sm:col-span-1 space-y-6">
                <Balance />
                <TransactionList />
              </div>
            </div>
          </div>
        ) : activeTab === 'report' ? (
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">
              <div className="md:col-span-2 sm:col-span-1 text-center text-gray-600">
                {filteredDateRange?.startDate && filteredDateRange?.endDate ? (
                  <p>Filtered date range: {filteredDateRange.startDate} to {filteredDateRange.endDate}</p>
                ) : (
                  <p>filteredTransactions</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-1 gap-6 justify-center">
              <div className="lg:col-span-12 md:col-span-12 sm:col-span-1 flex justify-center">
                <div className="w-full max-w-4xl">
                  <CategoryChart filteredDateRange={filteredDateRange} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </GlobalProvider>
  );
}

export default App;
