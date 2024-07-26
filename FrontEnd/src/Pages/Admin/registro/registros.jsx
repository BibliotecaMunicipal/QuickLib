// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import HeaderAdmin from '../../../components/HeaderAdmin';

const Registro = () => {
  const [selectedTab, setSelectedTab] = useState('usuarios');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const getBorderColor = () => {
    switch (selectedTab) {
      case 'libros':
        return 'border-blue-600';
      case 'usuarios':
        return 'border-gray-200';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col dark:bg-neutral-900">
      {/* Include HeaderAdmin */}
      <HeaderAdmin />

      <div className="flex justify-center my-8 space-x-4 dark:bg-transparent">
        <button
          className={`px-4 py-2 rounded ${
            selectedTab === 'libros' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
          }`}
          onClick={() => handleTabChange('libros')}
        >
          📚 Libros
        </button>
        <button
          className={`px-4 py-2 rounded ${
            selectedTab === 'usuarios' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
          }`}
          onClick={() => handleTabChange('usuarios')}
        >
          🧑‍💻 Usuarios
        </button>
      </div>

      {/* Formulario */}
      <div className="flex flex-1 justify-center items-center">
        <div className={`bg-white p-8 rounded-md shadow-md w-96 ${getBorderColor()} border-2`}>
          {selectedTab === 'usuarios' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Registro de Usuarios</h2>
              <form>
                <div className="mb-4">
                  <label className="block mb-1">Usuario</label>
                  <input type="text" className="w-full p-2 border rounded" />
                </div>
                
                <div className="mb-4">
                  <label className="block mb-1">Nombre</label>
                  <input type="text" className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Apellido</label>
                  <input type="text" className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Direccion</label>
                  <input type="text" className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Telefono</label>
                  <input type="text" className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Edad</label>
                  <input type="text" className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">contraseña</label>
                  <input type="text" className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">confirmar contraseña</label>
                  <input type="text" className="w-full p-2 border rounded" />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                  Registrar
                </button>
              </form>
            </div>
          )}
          {selectedTab === 'libros' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Registro de Libros</h2>
              <form>
                <div className="mb-4">
                  <label className="block mb-1">Título</label>
                  <input type="text" className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Autor</label>
                  <input type="text" className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Año</label>
                  <input type="text" className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Género</label>
                  <input type="text" className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">ISBN</label>
                  <input type="text" className="w-full p-2 border rounded" />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                  Registrar
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registro;
