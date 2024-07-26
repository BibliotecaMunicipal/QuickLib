/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useRegisterLoan } from '../../../../hooks/loan.hook.js';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom'; // Importar useLocation

const Prestamos = () => {
  const [ISBN, setISBN] = useState('');
  const [username, setUsername] = useState('');
  const [creatdAt, setCreatdAt] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setISBN(location.state.ISBN || '');
      setUsername(location.state.username || '');
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loan = {
      ISBN,
      username,
      creatdAt,
      finalDate,
    };

    try {
      await useRegisterLoan(loan);
      toast.success('Préstamo registrado con éxito!');
      setISBN('');
      setUsername('');
      setCreatdAt('');
      setFinalDate('');
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Registro de préstamo externo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">ISBN</label>
          <input
            type="number"
            value={ISBN}
            onChange={(e) => setISBN(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Fecha Inicial</label>
          <input
            type="date"
            value={creatdAt}
            onChange={(e) => setCreatdAt(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Fecha límite</label>
          <input
            type="date"
            value={finalDate}
            onChange={(e) => setFinalDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default Prestamos;
