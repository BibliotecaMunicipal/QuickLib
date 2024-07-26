// src/components/TabButtons.js
// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
const TabButtons = ({ selectedTab, handleTabChange }) => {
  const getBorderClass = (tab) => {
    return selectedTab === tab ? 'border-blue-600' : 'border-gray-300';
  };

  return (
    <div className="flex justify-center my-8 dark:bg-transparent">
      <button
        className={`px-4 py-2 rounded-l border ${getBorderClass('libros')} ${
          selectedTab === 'libros' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
        }`}
        onClick={() => handleTabChange('libros')}
      >
        📚 Libros
      </button>
      <button
        className={`px-4 py-2 border-t border-b ${getBorderClass('usuarios')} ${
          selectedTab === 'usuarios' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
        }`}
        onClick={() => handleTabChange('usuarios')}
      >
        🧑‍💻 Usuarios
      </button>
      <button
        className={`px-4 py-2 rounded-r border ${getBorderClass('Prestamos')} ${
          selectedTab === 'Prestamos' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
        }`}
        onClick={() => handleTabChange('Prestamos')}
      >
        📖 Prestamos Externos
      </button>
      <button
        className={`px-4 py-2 rounded-r border ${getBorderClass('Consulta')} ${
          selectedTab === 'Consulta' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
        }`}
        onClick={() => handleTabChange('Consulta')}
      >
           📖  Prestamos Interno
      </button>
    </div>
  );
};

export default TabButtons;
