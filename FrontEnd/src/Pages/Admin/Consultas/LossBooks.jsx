/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useDeleteLoss, useGetLoss, useRecoverLoss } from '../../../hooks/loss.hook';
import { FaUndoAlt, FaTrashAlt, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from 'react-bootstrap-sweetalert';
import {format} from "date-fns"
 
const LossBooks = () => {
    const [loss, setLoss] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [recoverId, setRecoverId] = useState(null);
    const [confirmRecover, setConfirmRecover] = useState(null);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const fetchLoss = async () => {
            setLoading(true);
            setError(null);
            try {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const data = await useGetLoss('Perdidos');
                setLoss(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchLoss();
    }, []);

    const handleRecover = async (idLoan) => {
        setLoading(true);
        setError(null);

        console.log(`Intentando devolver libro con idLoan: ${idLoan}`);

        setRecoverId(idLoan);
        setConfirmRecover(() => (
            <SweetAlert 
                warning
                showCancel
                confirmBtnText="Confirmar"
                confirmBtnBsStyle='btn btn-primary btn-ih'
                cancelBtnBsStyle='btn btn-secondary'
                title='¿Estas Seguro?'
                onConfirm={() => confirmRecoverAction(idLoan)}
                onCancel={cancelRecoverAction}
                focusCancelBtn
                customButtons={
                    <React.Fragment>
                        <button onClick={() => confirmRecoverAction(idLoan)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Confirmar
                        </button>
                        <button onClick={cancelRecoverAction} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
                            Cancelar
                        </button>
                    </React.Fragment>
                }
                style={{ backgroundColor: 'white', color: 'black' }}
            >
                Esta acción devolverá el libro perdido.
            </SweetAlert>
        ));
        setLoading(false);
    }

    const confirmRecoverAction = async (idLoan) => {
        setLoading(true);

        try {
            console.log(`Devolviendo libro con idLoan: ${idLoan}`);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            await useRecoverLoss(idLoan);
            setLoss(loss.filter(item => item.idLoan !== idLoan));
            toast.success('Libro devuelto exitosamente');
        } catch (error) {
            setError(error.message);
            toast.error('Error al intentar recuperar el libro');
        } finally {
            setLoading(false);
            setConfirmRecover(null);
        }
    }

    const cancelRecoverAction = () => {
        setConfirmRecover(null);
        setLoading(false);
    }

    const handleDelete = async (idLoan) => {
        setLoading(true);
        setError(null);
    
        console.log(`Intentando eliminar libro con idLoan: ${idLoan}`);
    
        // Mostrar confirmación antes de eliminar
        setDeleteId(idLoan);
        setConfirmDelete(() => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Confirmar"
                confirmBtnBsStyle="btn btn-primary btn-lh"
                cancelBtnBsStyle="btn btn-secondary"
                title="¿Estás seguro?"
                onConfirm={() => confirmDeleteAction(idLoan)} // Captura el idLoan actual
                onCancel={cancelDeleteAction}
                focusCancelBtn
                customButtons={
                    <React.Fragment>
                        <button onClick={() => confirmDeleteAction(idLoan)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Confirmar
                        </button>
                        <button onClick={cancelDeleteAction} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
                            Cancelar
                        </button>
                    </React.Fragment>
                }
                style={{ backgroundColor: 'white', color: 'black' }}
            >
                Esta acción eliminará permanentemente el libro.
            </SweetAlert>
        ));
    
        setLoading(false);
    }
    
    const confirmDeleteAction = async (idLoan) => {
        setLoading(true);
        try {
            console.log(`Eliminando libro con idLoan: ${idLoan}`);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            await useDeleteLoss(idLoan);
            setLoss(loss.filter(item => item.idLoan !== idLoan));
            toast.success('Libro eliminado exitosamente');
        } catch (error) {
            setError(error.message);
            toast.error('Error al intentar eliminar el libro');
        } finally {
            setLoading(false);
            setConfirmDelete(null);
        }
    };

    const cancelDeleteAction = () => {
        setConfirmDelete(null);
        setLoading(false);
    };

    const filteredLoss = loss.filter(item => 
        (item.title && item.title.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.username && item.username.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.firstName && item.firstName.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.lastName && item.lastName.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.ISBN && item.ISBN.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.author && item.author.toLowerCase().includes(searchText.toLowerCase()))
    );

      // Format dates
  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };

    return (
        <div className="container min-w-full p-4 bg-gradient-to-b border-solid border-2 border-sky-700 rounded-lg overflow-auto">
            <div className="flex justify-between mb-4 items-center">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Tabla de Libros Perdidos</h2>
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
                            <th className="border border-gray-200 dark:border-gray-700 p-2">Titulo Del Libro</th>
                            <th className="border border-gray-200 dark:border-gray-700 p-2">Usuario</th>
                            <th className="border border-gray-200 dark:border-gray-700 p-2">Nombre</th>
                            <th className="border border-gray-200 dark:border-gray-700 p-2">Apellidos</th>
                            <th className="border border-gray-200 dark:border-gray-700 p-2">Telefono</th>
                            <th className="border border-gray-200 dark:border-gray-700 p-2">Direccion</th>
                            <th className="border border-gray-200 dark:border-gray-700 p-2">Fecha Limite</th>
                            <th className="border border-gray-200 dark:border-gray-700 p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLoss.map((item, index) => (
                            <tr key={index}>
                                <td className="border border-gray-200 dark:border-gray-700 p-2">{item.title}</td>
                                <td className="border border-gray-200 dark:border-gray-700 p-2">{item.username}</td>
                                <td className="border border-gray-200 dark:border-gray-700 p-2">{item.firstName}</td>
                                <td className="border border-gray-200 dark:border-gray-700 p-2">{item.lastName}</td>
                                <td className="border border-gray-200 dark:border-gray-700 p-2">{item.phoneNumber}</td>
                                <td className="border border-gray-200 dark:border-gray-700 p-2">{item.address}</td>
                                <td className="border border-gray-200 dark:border-gray-700 p-2">{formatDate(item.returnDate)}</td>
                                <td className="border border-gray-200 dark:border-gray-700 p-2 text-center">
                                    <button
                                        onClick={() => handleRecover(item.idLoan)}
                                        className="text-blue-600 hover:text-blue-800 mx-1"
                                        title="Recover"
                                    >
                                        <FaUndoAlt />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.idLoan)}
                                        className="text-red-600 hover:text-red-800 mx-1"
                                        title="Delete"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {confirmDelete}
            {confirmRecover}
        </div>
    );
};

export default LossBooks;
