/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useAltDonation, useGetDonation } from '../../../hooks/donation.hook';
import { FaUndoAlt, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from 'react-bootstrap-sweetalert';

const DonationBooks = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [deDarAlta, setdeDarAlta] = useState(null);
  const [ConfirmDeAlta, setConfirmDeAlta] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchDonation = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await useGetDonation('Donados');
        setDonations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDonation();
  }, []);

  const handleAlt = async (ISBN) => {
    setLoading(true);
    setError(null);
    console.log(`Intentando dar de alto el libro con ISBN: ${ISBN}`);

    setdeDarAlta(ISBN);
    setConfirmDeAlta(() => (
      <SweetAlert 
      warning
      showCancel
      confirmBtnText="Confirmar"
      confirmBtnBsStyle='btn btn-primary btn-ih'
      cancelBtnBsStyle='btn btn-secondary'
      title='¿Estas Seguro?'
      onConfirm={() => confirmDarDeAltaAction(ISBN)}
      onCancel={cancelDarDeAltaAction}
      focusCancelBtn
      customButtons={
          <React.Fragment>
              <button onClick={() => confirmDarDeAltaAction(ISBN)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Confirmar
              </button>
              <button onClick={cancelDarDeAltaAction} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
                  Cancelar
              </button>
          </React.Fragment>
      }
      style={{ backgroundColor: 'white', color: 'black' }}
  >
      Esta acción dará de alta el libro donado.
  </SweetAlert>
));
setLoading(false);
  }

  const confirmDarDeAltaAction = async (ISBN) => {
    setLoading(true);
    try {
      await useAltDonation(ISBN);
      setDonations(donations.filter(item => item.ISBN !== ISBN));
      toast.success('Libro Dado de Alta Exitosamente');
    } catch (error) {
      setError(error.message);
      toast.error('Erro al Intentar Dar de ALta al Libro');
    } finally {
      setLoading(false);
      setConfirmDeAlta(null);
    }
  }

  const cancelDarDeAltaAction = () => {
    setConfirmDeAlta(null);
    setLoading(false);
  }

  const filteredDonations = donations.filter(item => 
    (item.title && item.title.toLowerCase().includes(searchText.toLowerCase())) ||
    (item.typeDonation && item.typeDonation.toLowerCase().includes(searchText.toLowerCase())) ||
    (item.author && item.author.toLowerCase().includes(searchText.toLowerCase()))
);

  return (
    <div className="container min-w-full p-4 bg-gradient-to-b border-solid border-2 border-sky-700 rounded-lg overflow-auto">
    <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Tabla de Libros Donados</h2>
        <div className="relative">
            <input 
                type="text"
                placeholder="Buscar por tipo de Donacion, nombre o titulo"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="p-2 border-b border-black bg-transparent text-gray-700 focus:outline-none dark:text-white"
            />
            <FaSearch className="absolute right-48 top-3 text-gray-700 dark:text-white" />
        </div>
    </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700 divide-y">
          <thead>
            <tr>
              <th className="border border-gray-200 dark:border-gray-700 p-2">ISBN</th>
              <th className="border border-gray-200 dark:border-gray-700 p-2">Titulo Del Libro</th>
              <th className="border border-gray-200 dark:border-gray-700 p-2">Autor Del Libro</th>
              <th className="border border-gray-200 dark:border-gray-700 p-2">Tipo De Donacion</th>
              <th className="border border-gray-200 dark:border-gray-700 p-2">Ejemplares</th>
              <th className="border border-gray-200 dark:border-gray-700 p-2">Categoria</th>
              <th className="border border-gray-200 dark:border-gray-700 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-200 dark:border-gray-700 p-2">{item.ISBN}</td>
                <td className="border border-gray-200 dark:border-gray-700 p-2">{item.title}</td>
                <td className="border border-gray-200 dark:border-gray-700 p-2">{item.author}</td>
                <td className="border border-gray-200 dark:border-gray-700 p-2">{item.typeDonation}</td>
                <td className="border border-gray-200 dark:border-gray-700 p-2">{item.copies}</td>
                <td className="border border-gray-200 dark:border-gray-700 p-2">{item.category}</td>
                <td className="border border-gray-200 dark:border-gray-700 p-2 text-center">
                  <button
                    onClick={() => handleAlt(item.ISBN)}
                    className="text-blue-600 hover:text-blue-800 mx-1"
                    title="Recover"
                  >
                    <FaUndoAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {ConfirmDeAlta}
    </div>
  );
};

export default DonationBooks;
