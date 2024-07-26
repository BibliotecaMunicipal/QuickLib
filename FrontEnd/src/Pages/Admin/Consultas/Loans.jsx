// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useGetLoans, useReturnLoan } from '../../../hooks/loan.hook.js';
import { FaCheck, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import SweetAlert from 'react-bootstrap-sweetalert';
import { format } from 'date-fns';

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [returnId, setReturnId] = useState(null);
  const [confirmReturn, setConfirmReturn] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true);
      setError(null);
      try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const data = await useGetLoans('Prestados'); // Asumiendo que 'Prestados' es el tipo correcto para obtener préstamos prestados
        setLoans(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  const handleReturn = async (idLoan) => {
    setLoading(true);
    setError(null);

    console.log(`Intentando devolver libro con idLoan: ${idLoan}`);

    setReturnId(idLoan);
    setConfirmReturn(() => (
      <SweetAlert 
        warning
        showCancel
        confirmBtnText="Confirmar"
        confirmBtnBsStyle='btn btn-primary btn-ih'
        cancelBtnBsStyle='btn btn-secondary'
        title='¿Estas Seguro?'
        onConfirm={() => confirmReturnAction(idLoan)}
        onCancel={cancelReturnAction}
        focusCancelBtn
        customButtons={
          <React.Fragment>
            <button onClick={() => confirmReturnAction(idLoan)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Confirmar
            </button>
            <button onClick={cancelReturnAction} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
              Cancelar
            </button>
          </React.Fragment>
        }
        style={{ backgroundColor: 'white', color: 'black' }}
      >
        Esta acción devolverá el libro prestado antes de la fecha limite.
      </SweetAlert>
    ));
    setLoading(false);
  }

  const confirmReturnAction = async (idLoan) => {
    setLoading(true);
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await useReturnLoan(idLoan);
      setLoans(loans.filter(loan => loan.idLoan !== idLoan));
      toast.success('¡Libro devuelto exitosamente!');
    } catch (err) {
      setError(err.message);
      toast.error('Error al devolver el libro');
    } finally {
      setLoading(false);
      setConfirmReturn(false);
    }
  }

  const cancelReturnAction = () => {
    setConfirmReturn(null);
    setLoading(false);
  }

  const filteredLoans = loans.filter(item => 
    (item.title && item.title.toLowerCase().includes(searchText.toLowerCase())) ||
    (item.username && item.username.toLowerCase().includes(searchText.toLowerCase())) ||
    (item.firstName && item.firstName.toLowerCase().includes(searchText.toLowerCase())) ||
    (item.lastName && item.lastName.toLowerCase().includes(searchText.toLowerCase())) ||
    (item.author && item.author.toLowerCase().includes(searchText.toLowerCase()))
  );

  // Format dates
  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };

  return (
    <div className="container min-w-full p-4 bg-gradient-to-b border-solid border-2 border-sky-700 rounded-lg overflow-auto">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Tabla de Libros Prestados</h2>
        <div className="relative">
          <input 
            type="text"
            placeholder="Buscar por usuario, nombre o titulo"
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
              <th className="border border-gray-200 dark:border-gray-700 p-2">Titulo</th>
              <th className="border border-gray-200 dark:border-gray-700 p-2">Usuario</th>
              <th className="border border-gray-200 dark:border-gray-700 p-2">Nombre</th>
              <th className="border border-gray-200 dark:border-gray-700 p-2">Apellidos</th>
              <th className="border border-gray-200 dark:border-gray-700 p-2">Direccion</th>
              <th className="border border-gray-200 dark:border-gray-700 p-2">Fecha Inicial</th>
              <th className="border border-gray-200 dark:border-gray-700 p-2">Fecha Limite</th>
              <th className="border border-gray-200 dark:border-gray-700 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-200 dark:border-gray-700 p-2">{item.title}</td>
                <td className="border border-gray-200 dark:border-gray-700 p-2">{item.username}</td>
                <td className="border border-gray-200 dark:border-gray-700 p-2">{item.firstName}</td>
                <td className="border border-gray-200 dark:border-gray-700 p-2">{item.lastName}</td>
                <td className="border border-gray-200 dark:border-gray-700 p-2">{item.address}</td>
                <td className="border border-gray-200 dark:border-gray-700 p-2">{formatDate(item.createdAt)}</td>
                <td className="border border-gray-200 dark:border-gray-700 p-2">{formatDate(item.finalDate)}</td>
                <td className="border border-gray-200 dark:border-gray-700 p-2 text-center">
                  <button
                    onClick={() => handleReturn(item.idLoan)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaCheck />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {confirmReturn}
    </div>
  );
};

export default Loans;
