// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useRegisterBook } from '../../../../hooks/book.hook.js';
import { toast } from 'react-toastify';

const BookForm = () => {
  const [selectedDonation, setSelectedDonation] = useState('');
  const [ISBN, setISBN] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [yearPublication, setYearPublication] = useState('');
  const [copies, setCopies] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const book = {
      ISBN,
      title,
      author,
      publisher,
      yearPublication,
      copies,
      category,
      donation: selectedDonation,
      status: false
    };

    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await useRegisterBook(book);
      toast.success('Libro Registrado Con Éxito!');
      setISBN('');
      setTitle('');
      setAuthor('');
      setPublisher('');
      setYearPublication('');
      setSelectedDonation('');
      setCopies('');
      setCategory('');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedDonation(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Registro de Libros</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">ISBN:</label>
          <input
            type="number"
            value={ISBN}
            onChange={(e) => setISBN(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Publisher:</label>
          <input
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Year of Publication:</label>
          <input
            type="number"
            value={yearPublication}
            onChange={(e) => setYearPublication(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Tipo Donacion:</label>
          <select value={selectedDonation} onChange={handleOptionChange} className="w-full p-2 border rounded">
          <option value=''> Seleccione una Opcion</option>
            <option value='Ninguna'> No es Donacion</option>
            <option value='Gobierno'>Gobierno</option>
            <option value='Ciudadano'>Ciudadano</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Copies:</label>
          <input
            type="number"
            value={copies}
            onChange={(e) => setCopies(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Category:</label>
          <select value={category} onChange={handleCategoryChange} className="w-full p-2 border rounded">
            <option value=''> Selecciona una Categoria</option>
            <option value='Generalidades'>Generalidades</option>
            <option value='Filosofia'>Filosofia</option>
            <option value='Religion'>Religion</option>
            <option value='Ciencias_Sociales'>Ciencias Sociales</option>
            <option value='Lenguas'>Lenguas</option>
            <option value='Ciencias_Puras'>Ciencias Puras</option>
            <option value='Tecnologias'>Tecnologias</option>
            <option value='Bellas_Artes'>Bellas Artes</option>
            <option value='Literatura'>Literatura</option>
            <option value='Geografia_y_Historia'>Geografia/Historia</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>
          {loading ? 'Registrando..... ' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
