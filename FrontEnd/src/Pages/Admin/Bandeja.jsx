import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../../components/Admin/HeaderAdmin.jsx';
import Footer from '../../components/footer';
import { useDeleteOpinion, useGetOpinion, useUpdateOpinion } from '../../hooks/opinion.hook';
import { useGetAllReservation, useDeleteFReservation } from '../../hooks/reservation.hook.js';
import SweetAlert from 'react-bootstrap-sweetalert';
import { toast } from 'react-toastify';
import { FaTrashAlt, FaCloudUploadAlt, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Bandeja = () => {
  const [menuVisible, setMenuVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('Chat');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [opinions, setOpinions] = useState([]);
  const [filteredOpinions, setFilteredOpinions] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [refreshMessage, setRefreshMessage] = useState('');
  const navigate = useNavigate();

  // Fetch opinions and reservations on mount
  useEffect(() => {
    fetchOpinions();
    fetchReservations();
  }, []);

  // Fetch opinions
  const fetchOpinions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await useGetOpinion();
      setOpinions(data);
      setFilteredOpinions(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch reservations
  const fetchReservations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await useGetAllReservation();
      setReservations(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle opinion deletion
  const handleDeleteOpinion = (idOpinion) => {
    setDeleteId(idOpinion);
    setConfirmDelete(
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Confirmar"
        confirmBtnBsStyle='btn btn-primary btn-ih'
        cancelBtnBsStyle='btn btn-secondary'
        title="¿Estás Seguro?"
        onConfirm={() => confirmDeleteAction(idOpinion)}
        onCancel={cancelDeleteAction}
        focusCancelBtn
        customButtons={
          <>
            <button onClick={() => confirmDeleteAction(idOpinion)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Confirmar
            </button>
            <button onClick={cancelDeleteAction} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
              Cancelar
            </button>
          </>
        }
        style={{ backgroundColor: 'white', color: 'black' }}
      >
        Esta acción eliminará el comentario.
      </SweetAlert>
    );
  };

  // Confirm deletion
  const confirmDeleteAction = async (id) => {
    setLoading(true);
    try {
      await useDeleteOpinion(id);
      toast.success('Comentario eliminado exitosamente');
      await fetchOpinions(); // Refresh opinions after deletion
    } catch (error) {
      setError(error.message);
      toast.error("Error al eliminar el comentario");
    } finally {
      setLoading(false);
      setConfirmDelete(null);
      setRefreshMessage('');
    }
  };

  // Cancel deletion
  const cancelDeleteAction = () => {
    setConfirmDelete(null);
    setLoading(false);
    setRefreshMessage('');
  };

  // Handle opinion update
  const handleUpdateOpinion = async (idOpinion, showOnMainPage) => {
    setLoading(true);
    setError(null);
    try {
      await useUpdateOpinion(idOpinion, showOnMainPage);
      setOpinions(opinions.map(opinion =>
        opinion._id === idOpinion ? { ...opinion, showOnMainPage } : opinion
      ));
      toast.success('Comentario actualizado exitosamente');
    } catch (error) {
      setError(error.message);
      toast.error("Error al actualizar el comentario");
    } finally {
      setLoading(false);
    }
  };

  // Handle reservation deletion and navigation
  const handleDeleteReservation = async (reservation) => {
    setLoading(true);
    setError(null);
    try {
      await useDeleteFReservation(reservation._id);
      toast.success('Reserva eliminada exitosamente');
      // Navigate to loan registration with auto-filled data
      navigate('/Registros', {
        state: {
          selectedTab: 'Prestamos',
          ISBN: reservation.ISBN,
          username: reservation.username
        }
      });
    } catch (error) {
      setError(error.message);
      toast.error("Error al eliminar la reserva");
    } finally {
      setLoading(false);
      await fetchReservations(); // Refresh reservations after deletion
    }
  };

  // Filter opinions based on search text
  useEffect(() => {
    const filtered = opinions.filter(opinion =>
      opinion.name.toLowerCase().includes(searchText.toLowerCase()) ||
      opinion.message.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredOpinions(filtered);
  }, [opinions, searchText]);

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-400 via-white to-green-500 dark:from-green-400 dark:via-black dark:to-green-700 text-black dark:text-white">
      <HeaderAdmin />
      <div className="flex flex-row bg-transparent h-14 items-center px-4">
        <div className="mr-4">
          <button className="hamburger-icon" onClick={toggleMenu}>☰</button>
        </div>
        <div className="text-xl font-serif">Message</div>
        <div className="flex-grow mx-4 relative">
          <input
            type="text"
            placeholder={activeTab === 'Comentarios' ? 'Buscar comentarios' : 'Buscar mensajes'}
            className="border rounded px-2 py-1 w-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <span className="absolute right-3 top-2 text-gray-500">🔍</span>
        </div>
      </div>
      <div className="flex flex-grow bg-transparent">
        {menuVisible && (
          <div className="flex flex-col w-1/6 bg-transparent bg-opacity-20 border border-green-900 rounded-lg items-center pt-4">
            <button
              className={`mb-4 ${activeTab === 'Chat' ? 'text-aqua-600' : ''}`}
              onClick={() => handleTabChange('Chat')}
            >
              Chat
            </button>
            <button
              className={`mb-4 ${activeTab === 'Comentarios' ? 'text-aqua-600' : ''}`}
              onClick={() => handleTabChange('Comentarios')}
            >
              Comentarios
            </button>
          </div>
        )}
        <div className={`flex flex-col ${menuVisible ? 'w-5/6' : 'w-full'} bg-transparent rounded-lg p-4`}>
          {!loading && activeTab === 'Chat' && (
            <div className='overflow-y-auto max-h-96'>
              {reservations.map((reservation, index) => (
                <div key={index} className="flex flex-col border-b pb-2 mb-2 rounded-lg bg-green-400 bg-opacity-20 shadow-md p-4 break-words">
                  <div className="flex items-center justify-between">
                    <div className="font-bold">{reservation.username}</div>
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    ISBN: {reservation.ISBN}, Título: {reservation.title}, Categoría: {reservation.category}
                  </div>
                  <div className="flex">
                    <button onClick={() => handleDeleteReservation(reservation)} className="text-green-500 ml-auto">
                      <FaCheck />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && activeTab === 'Comentarios' && (
            <div className='overflow-y-auto max-h-96'>
              {filteredOpinions.map((opinion) => (
                <div key={opinion._id} className="flex flex-col border-b pb-2 mb-2 rounded-lg bg-green-400 bg-opacity-20 shadow-md p-4 break-words">
                  <div className="flex items-center justify-between">
                    <div className="font-bold">{opinion.name}</div>
                    <button onClick={() => handleUpdateOpinion(opinion.idOpinion, !opinion.showOnMainPage)} className={`text-green-500 ml-auto ${opinion.showOnMainPage ? 'text-gray-500' : ''}`}>
                      <FaCloudUploadAlt />
                    </button>
                    <button onClick={() => handleDeleteOpinion(opinion.idOpinion)} className="text-red-500 ml-2">
                      <FaTrashAlt />
                    </button>
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {opinion.message}
                  </div>
                </div>
              ))}
            </div>
          )}
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
        </div>
      </div>
      {confirmDelete}
      {refreshMessage && <div>{refreshMessage}</div>}
      <Footer />
    </div>
  );
};

export default Bandeja;
