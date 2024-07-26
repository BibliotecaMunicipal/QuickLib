import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderAdmin from '../../../components/Admin/HeaderAdmin';
import TabButtons from '../../../components/Admin/tabButton';
import UserForm from './registros_internos/users';
import BookForm from './registros_internos/libros';
import Prestamos from './registros_internos/Prestamos';
import Consulta from './registros_internos/consulta';

const Registro = () => {
  const location = useLocation();
  const initialState = location.state || { selectedTab: 'libros'};
  const [selectedTab, setSelectedTab] = useState(initialState.selectedTab);


  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const getBorderColor = () => {
    switch (selectedTab) {
      case 'libros':
        return 'border-blue-600';
      case 'usuarios':
        return 'border-green-600';
      case 'Prestamos':
        return 'border-red-800';
      case 'Consulta':
        return 'border-gray-800';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col dark:bg-neutral-900">
      <HeaderAdmin />
      <TabButtons selectedTab={selectedTab} handleTabChange={handleTabChange} />
      <div className="flex flex-1 justify-center items-center">
        <div className={`bg-white p-8 rounded-md shadow-md w-96 ${getBorderColor()} border-2`}>
          {selectedTab === 'usuarios' && <UserForm />}
          {selectedTab === 'libros' && <BookForm />}
          {selectedTab === 'Prestamos' && (
            <Prestamos
            />
          )}
          {selectedTab === 'Consulta' && <Consulta />}
        </div>
      </div>
    </div>
  );
};

export default Registro;
