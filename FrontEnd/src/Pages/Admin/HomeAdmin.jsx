/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../../components/Admin/HeaderAdmin.jsx';
import CarrouselPDF from "../../components/component.PDF/carouselPDF.jsx";
import PdfCredentialsCard from '../Admin/PDF/credentialsCard';
import 'react-toastify/dist/ReactToastify.css';
import { FaUndoAlt, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import SweetAlert from 'react-bootstrap-sweetalert';

import {
  getAllClient,
  useDeleteClient,
  useRecoverClient
} from '../../hooks/client.hook';

import {
  useGetBooks,
  useDeleteBooks,
  useRecoverBook,
  useGetActiveBooks
} from '../../hooks/book.hook';

import {
  useGetLossBooks
} from '../../hooks/loss.hook';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('usuarios');
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [recoverId, setRecoverId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmRecover, setConfirmRecover] = useState(null);
  const [activeBooksCount, setActiveBooksCount] = useState(0);
  const [lossBooksCount, setLossBooksCount] = useState(0);
  const [searchClientTerm, setSearchClientTerm] = useState('');
  const [searchBookTerm, setSearchBookTerm] = useState('');

  useEffect(() => {
    const fetchLossBooks = async () => {
      try {
        const librosPerdidos = await useGetLossBooks();
        setLossBooksCount(librosPerdidos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    };

    fetchLossBooks();
  }, []);

  useEffect(() => {
    const fetchActiveBooks = async () => {
      try {
        const librosActivos = await useGetActiveBooks();
        setActiveBooksCount(librosActivos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    };

    fetchActiveBooks();
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllClient();
        setClients(data);
        setFilteredClients(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [confirmRecover, confirmDelete]); // Actualizado para refrescar cuando se confirme recuperación o eliminación

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await useGetBooks();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [confirmRecover, confirmDelete]); // Actualizado para refrescar cuando se confirme recuperación o eliminación

  const handleRecoverBook = (ISBN) => {
    setLoading(true);
    setError(null);
    setRecoverId(ISBN);

    setConfirmRecover(
      <SweetAlert
      warning
      showCancel
      confirmBtnText="Confirmar"
      confirmBtnBsStyle="btn btn-danger"
      cancelBtnBsStyle="btn btn-secondary"
      title="¿Estás seguro?"
      onConfirm={() => confirmRecoverAction(ISBN, 'book')}
      onCancel={cancelRecoverAction}
      focusCancelBtn
    >
      Esta acción recuperará el libro con ISBN: {ISBN}.
    </SweetAlert>
  );

  setLoading(false);

    // try {
    //   console.log(`Recuperando Libro con ISBN: ${ISBN}`);
    //   await useRecoverBook(ISBN);
    //   setBooks(prevBooks => prevBooks.map(book => {
    //     if (book.ISBN === ISBN) {
    //       return { ...book, status: true }; // Actualizamos el estado del libro recuperado a true
    //     }
    //     return book;
    //   }));
    //   toast.success('Libro recuperado exitosamente');
    // } catch (error) {
    //   setError(error.message);
    //   toast.error('Error al intentar recuperar el libro');
    // } finally {
    //   setLoading(false);
    //   setConfirmRecover(null);
    // }
  };

  const handleRecoverClient = (username) => {
    setLoading(true);
    setError(null);
    setRecoverId(username);

    setConfirmRecover(
      <SweetAlert
      warning
      showCancel
      confirmBtnText="Confirmar"
      confirmBtnBsStyle="btn btn-danger"
      cancelBtnBsStyle="btn btn-secondary"
      title="¿Estás seguro?"
      onConfirm={() => confirmRecoverAction(username, 'client')}
      onCancel={cancelRecoverAction}
      focusCancelBtn
    >
      Esta acción recuperará el usuario con username: {username}.
    </SweetAlert>
  );

  setLoading(false);

    // try {
    //   console.log(`Recuperando Cliente con username: ${username}`);
    //   await useRecoverClient(username);
    //   setClients(prevClients => prevClients.map(client => {
    //     if (client.username === username) {
    //       return { ...client, status: true }; // Actualizamos el estado del cliente recuperado a true
    //     }
    //     return client;
    //   }));
    //   toast.success('Cliente recuperado exitosamente');
    // } catch (error) {
    //   setError(error.message);
    //   toast.error('Error al intentar recuperar el cliente');
    // } finally {
    //   setLoading(false);
    //   setConfirmRecover(null);
    // }
  };

  const confirmRecoverAction = async (id, type) => {
    setLoading(true);
    try {
      if (type === 'book') {
        await useRecoverBook(id);
        setBooks(prevBooks => prevBooks.filter(book => book.ISBN !== id));
        setFilteredBooks(prevFilteredBooks => prevFilteredBooks.filter(book => book.ISBN !== id));
        toast.success('Libro recuperado exitosamente');
      } else if (type === 'client') {
        await useRecoverClient(id);
        setClients(prevClients => prevClients.filter(client => client.username !== id));
        setFilteredClients(prevFilteredClients => prevFilteredClients.filter(client => client.username !== id));
        toast.success('Cliente recuperado exitosamente');
      }
    } catch (error) {
      setError(error.message);
      toast.error('Error al intentar dar de baja');
    } finally {
      setLoading(false);
      setConfirmRecover(null);
    }
  };

  const cancelRecoverAction = () => {
    setConfirmRecover(null);
    setLoading(false);
  };

  const handleDeleteBook = (ISBN) => {
    setLoading(true);
    setError(null);
    setDeleteId(ISBN);

    setConfirmDelete(
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Confirmar"
        confirmBtnBsStyle="btn btn-danger"
        cancelBtnBsStyle="btn btn-secondary"
        title="¿Estás seguro?"
        onConfirm={() => confirmDeleteAction(ISBN, 'book')}
        onCancel={cancelDeleteAction}
        focusCancelBtn
      >
        Esta acción dará de baja el libro con ISBN: {ISBN}.
      </SweetAlert>
    );

    setLoading(false);
  };

  const handleDeleteClient = (username) => {
    setLoading(true);
    setError(null);
    setDeleteId(username);

    setConfirmDelete(
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Confirmar"
        confirmBtnBsStyle="btn btn-danger"
        cancelBtnBsStyle="btn btn-secondary"
        title="¿Estás seguro?"
        onConfirm={() => confirmDeleteAction(username, 'client')}
        onCancel={cancelDeleteAction}
        focusCancelBtn
      >
        Esta acción dará de baja al cliente con username: {username}.
      </SweetAlert>
    );

    setLoading(false);
  };

  const confirmDeleteAction = async (id, type) => {
    setLoading(true);
    try {
      if (type === 'book') {
        await useDeleteBooks(id);
        setBooks(prevBooks => prevBooks.filter(book => book.ISBN !== id));
        setFilteredBooks(prevFilteredBooks => prevFilteredBooks.filter(book => book.ISBN !== id));
        toast.success('Libro dado de baja exitosamente');
      } else if (type === 'client') {
        await useDeleteClient(id);
        setClients(prevClients => prevClients.filter(client => client.username !== id));
        setFilteredClients(prevFilteredClients => prevFilteredClients.filter(client => client.username !== id));
        toast.success('Cliente dado de baja exitosamente');
      }
    } catch (error) {
      setError(error.message);
      toast.error('Error al intentar dar de baja');
    } finally {
      setLoading(false);
      setConfirmDelete(null);
    }
  };

  const cancelDeleteAction = () => {
    setConfirmDelete(null);
    setLoading(false);
  };

  const handleSearchClient = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchClientTerm(searchTerm);
    const filteredClients = clients.filter(client =>
      client.username.toLowerCase().includes(searchTerm) ||
      client.firstName.toLowerCase().includes(searchTerm) ||
      client.lastName.toLowerCase().includes(searchTerm) 
    );
    setFilteredClients(filteredClients);
  };

  const handleSearchBook = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchBookTerm(searchTerm);
    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm)
    );
    setFilteredBooks(filteredBooks);
  };

  const renderUserActions = (user) => (
    <div className="flex justify-center space-x-4">
      {user.status === false ? (
        <button onClick={() => handleRecoverClient(user.username)} className="text-blue-600 hover:text-blue-800 mx-1">
          <FaUndoAlt />
        </button>
      ) : (
        <PdfCredentialsCard user={user}/>
      )}
      <button onClick={() => handleDeleteClient(user.username)} className="text-red-600 hover:text-red-800 mx-1">
        <FaTrashAlt />
      </button>
    </div>
  );

  const renderBookActions = (book) => (
    <div className="flex justify-center space-x-4">
      {book.status === false ? (
        <button onClick={() => handleRecoverBook(book.ISBN)} className="text-blue-600 hover:text-blue-800 mx-1">
          <FaUndoAlt />
        </button>
      ) : (
        <button onClick={() => handleDeleteBook(book.ISBN)} className="text-red-600 hover:text-red-800 mx-1">
          <FaTrashAlt />
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-gray-100 p-4 dark:bg-neutral-900 min-h-screen">
      <HeaderAdmin />

      <div className="flex flex-col md:flex-row justify-between dark:bg-neutral-900">
        <CarrouselPDF />
        <div className="flex flex-col space-y-4 w-full md:w-1/3">
          <div className="bg-white p-8 rounded-md shadow-md text-center dark:bg-neutral-800 ">
            <h3 className="text-4xl text-blue-600">{activeBooksCount}</h3>
            <p className="text-lg dark:text-white">En vista</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md text-center dark:bg-neutral-800">
            <h3 className="text-4xl text-red-600">{lossBooksCount}</h3>
            <p className="text-lg dark:text-white">Perdidos</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-8 space-x-4">
        <button
          className={`px-4 py-2 mx-2 rounded shadow-md ${selectedTab === 'usuarios' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
          onClick={() => setSelectedTab('usuarios')}
        >
          Usuarios
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded shadow-md ${selectedTab === 'libros' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
          onClick={() => setSelectedTab('libros')}
        >
          Libros
        </button>
      </div>

      {selectedTab === 'usuarios' && (
  <div className="bg-white p-4 rounded-md shadow-md dark:bg-neutral-800 mt-4 overflow-hidden">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Usuarios</h2>
      <input
        type="text"
        placeholder="Buscar cliente"
        className="border p-2 rounded"
        value={searchClientTerm}
        onChange={handleSearchClient}
      />
    </div>
    {loading && <p className="text-center text-gray-600 dark:text-white">Cargando clientes...</p>}
    {!loading && (
      <div className="max-h-80 overflow-y-auto">
        <table className="min-w-full bg-white dark:bg-neutral-800">
          <thead>
            <tr className="w-full h-16 border-gray-300 dark:border-gray-700 border-b py-8">
              <th className="pl-4 text-gray-600 dark:text-white">Nombre</th>
              <th className="text-gray-600 dark:text-white">Email</th>
              <th className="text-gray-600 dark:text-white">Nombre</th>
              <th className="text-gray-600 dark:text-white">Apellido</th>
              <th className="text-gray-600 dark:text-white">Estado</th>
              <th className="pr-4 text-gray-600 dark:text-white">Acciones</th>
            </tr>
          </thead>
          <tbody className="max-h-64">
            {filteredClients.map((client) => (
              <tr key={client.username} className={`h-16 border-gray-300 dark:border-gray-700 border-b ${!client.status ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
                <td className="pl-4 dark:text-white">{client.username}</td>
                <td className="dark:text-white">{client.email}</td>
                <td className="dark:text-white">{client.firstName}</td>
                <td className="dark:text-white">{client.lastName}</td>
                <td className="dark:text-white">{client.status ? 'Activo' : 'Inactivo'}</td>
                <td className="pr-4">
                  {renderUserActions(client)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)}

{selectedTab === 'libros' && (
  <div className="bg-white p-4 rounded-md shadow-md dark:bg-neutral-800 mt-4 overflow-hidden">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Libros</h2>
      <input
        type="text"
        placeholder="Buscar libro"
        className="border p-2 rounded"
        value={searchBookTerm}
        onChange={handleSearchBook}
      />
    </div>
    {loading && <p className="text-center text-gray-600 dark:text-white">Cargando libros...</p>}
    {!loading && (
      <div className="max-h-80 overflow-y-auto">
        <table className="min-w-full bg-white dark:bg-neutral-800">
          <thead>
            <tr className="w-full h-16 border-gray-300 dark:border-gray-700 border-b py-8">
              <th className="pl-4 text-gray-600 dark:text-white">ISBN</th>
              <th className="text-gray-600 dark:text-white">Título</th>
              <th className="text-gray-600 dark:text-white">Autor</th>
              <th className="text-gray-600 dark:text-white">Ejemplares</th>
              <th className="text-gray-600 dark:text-white">Año de Publicacion</th>
              <th className="text-gray-600 dark:text-white">Estado</th>
              <th className="pr-4 text-gray-600 dark:text-white">Acciones</th>
            </tr>
          </thead>
          <tbody className="max-h-64">
            {filteredBooks.map((book) => (
              <tr key={book.ISBN} className={`h-16 border-gray-300 dark:border-gray-700 border-b ${!book.status ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
                <td className="pl-4 dark:text-white">{book.ISBN}</td>
                <td className="dark:text-white">{book.title}</td>
                <td className="dark:text-white">{book.author}</td>
                <td className="dark:text-white">{book.copies}</td>
                <td className="dark:text-white">{book.yearPublication}</td>
                <td className="dark:text-white">{book.status ? 'Activo' : 'Inactivo'}</td>
                <td className="pr-4">
                  {renderBookActions(book)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)}


      {confirmDelete}
      {confirmRecover}
    </div>
  );
};

export default Dashboard;
