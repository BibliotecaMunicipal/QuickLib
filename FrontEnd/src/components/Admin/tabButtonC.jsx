// src/components/TabButtons.js
// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
const TabButtonsC = ({ selectedTab, handleTabChange }) => {
  const getBorderClass = (tab) => {
    return selectedTab === tab ? 'border-blue-600' : 'border-gray-300';
  };

  return (
    <div className="flex justify-center my-8 dark:bg-transparent">
      <button
        className={`px-4 py-2 rounded-l border ${getBorderClass('Prestados')} ${
          selectedTab === 'Prestados' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
        }`}
        onClick={() => handleTabChange('Prestados')}
      >
        Prestamos
      </button>
      <button
        className={`px-4 py-2 border-t border-b ${getBorderClass('Perdidos')} ${
          selectedTab === 'Perdidos' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
        }`}
        onClick={() => handleTabChange('Perdidos')}
      >
         Perdidos
      </button>
      <button
        className={`px-4 py-2 rounded-r border ${getBorderClass('Donados')} ${
          selectedTab === 'Donados' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
        }`}
        onClick={() => handleTabChange('Donados')}
      >
        Donados
      </button>
    </div>
  );
};

export default TabButtonsC;
