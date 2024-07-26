// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import HeaderAdmin from '../../../components/Admin/HeaderAdmin.jsx';
import Loans from './Loans';
import LossBooks from './LossBooks';
import DonationBooks from './DonationBooks';


const Consultas = () => {
  const [activeTab, setActiveTab] = useState('Prestados');

  const getBackgroundClass = () => {
    switch (activeTab) {
      case 'Prestados':
        return 'from-blue-500 via-slate-50 to-blue-500 dark:from-blue-700 dark:via-black dark:to-blue-700';
      case 'Perdidos':
        return 'from-red-500 via-white to-red-500 dark:from-red-700 dark:via-black dark:to-red-700';
      case 'Donados':
        return 'from-green-500 via-white to-green-500 dark:from-green-700 dark:via-black dark:to-green-700';
      default:
        return 'from-blue-300 via-white to-blue-300 dark:from-blue-500 dark:via-black dark:to-blue-500';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${getBackgroundClass()} text-black dark:text-white`}>
      <HeaderAdmin />
      <div className="flex justify-around py-4">
        <button
          className={`flex items-center px-4 py-2 rounded ${activeTab === 'Prestados' ? 'bg-blue-700 text-white' : 'bg-gray-300 dark:bg-gray-700'}`}
          onClick={() => setActiveTab('Prestados')}
        >
          Prestados 
        </button>
        <button
          className={`flex items-center px-4 py-2 rounded ${activeTab === 'Perdidos' ? 'bg-red-500 text-white' : 'bg-gray-300 dark:bg-gray-700'}`}
          onClick={() => setActiveTab('Perdidos')}
        >
          Perdidos 
        </button>
        <button
          className={`flex items-center px-4 py-2 rounded ${activeTab === 'Donados' ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-700'}`}
          onClick={() => setActiveTab('Donados')}
        >
          Donados 
        </button>
      </div>
      {activeTab === 'Prestados' && <Loans />}
      {activeTab === 'Perdidos' && <LossBooks />}
      {activeTab === 'Donados' && <DonationBooks />}
    </div>
  );
};

export default Consultas;
