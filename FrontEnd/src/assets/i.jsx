// components/client/CategoryBook.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetBooksByCategory } from '../../hooks/book.hook';
import { useDeleteReservation, useAddReservation } from '../../hooks/reservation.hook';
import { getClient } from '../../hooks/client.hook';
import { BsSearch } from 'react-icons/bs';
import { RiAddFill, RiDeleteBinFill } from 'react-icons/ri';
import ImagenFija from "../../assets/gif/imagen-fija.jpg";
import Gene from "../../assets/gif/imagen_interior/literatura.jpg";
import Filo from "../../assets/gif/imagen_interior/filosodiaa.jpg";
import Reli from "../../assets/gif/imagen_interior/religionn.jpg";
import Social from "../../assets/gif/imagen_interior/social.jpg";
import Puras from "../../assets/gif/imagen_interior/puras.jpg";
import Artes from "../../assets/gif/imagen_interior/artes.jpg";
import Tecno from "../../assets/gif/imagen_interior/tecno.jpg";
import Lenguas from "../../assets/gif/imagen_interior/lenguass.jpg";
import Lit from "../../assets/gif/imagen_interior/generalidadess.jpg";
import Hisge from "../../assets/gif/imagen_interior/historia.jpg";
import HeaderClient from './HeaderClient';
import Swal from 'sweetalert2';
import { useAddReservation } from '../hooks/reservation.hook';

const categoryColors = {
  0: 'rgba(255, 99, 71, 0.5)',    // Tomato
  100: 'rgba(255, 140, 0, 0.5)', // DarkOrange
  200: 'rgba(255, 215, 0, 0.5)', // Gold
  300: 'rgba(50, 205, 50, 0.5)', // LimeGreen
  400: 'rgba(173, 216, 230, 0.5)', // LightBlue
  500: 'rgba(0, 191, 255, 0.5)', // DeepSkyBlue
  600: 'rgba(100, 149, 237, 0.5)', // CornflowerBlue
  700: 'rgba(255, 105, 180, 0.5)', // HotPink
  800: 'rgba(255, 192, 203, 0.5)', // Pink
  900: 'rgba(218, 112, 214, 0.5)', // Orchid
};

const categoryNames = {
  0: 'Generalidades',
  100: 'Filosofía',
  200: 'Religión',
  300: 'Ciencias Sociales',
  400: 'Lenguas',
  500: 'Ciencias Puras',
  600: 'Tecnologías',
  700: 'Bellas Artes',
  800: 'Literatura',
  900: 'Geografía y Historia',
};

const CategoryBook = () => {
  const { categoryId } = useParams();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light');
  const [searchTerm, setSearchTerm] = useState('');
  const [reservations, setReservations] = useState([]);

  const { deleteReservation } = useDeleteReservation();
  const { addReservation } = useAddReservation();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await useGetBooksByCategory(categoryId);
        setBooks(data);
        setFilteredBooks(data); // Inicialmente muestra todos los libros
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [categoryId]);

  useEffect(() => {
    const fetchClientReservations = async () => {
      try {
        const client = await getClient();
        const reservationsData = client.data.reservations || []; // Suponiendo que las reservas están en client.data.reservations
        setReservations(reservationsData);
      } catch (error) {
        setError(error);
      }
    };
    fetchClientReservations();
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const changeTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const categoryName = categoryNames[categoryId] || 'Categoría Desconocida';

  const toggleDescription = (index) => {
    const newBooks = [...books];
    newBooks[index].expanded = !newBooks[index].expanded;
    setBooks(newBooks);
  };

  const handleAddBook = async (index) => {
    const book = books[index];
    const client = await getClient();
    const reservationData = {
      username: client.data.username,
      firstName: client.data.firstName,
      lastName: client.data.lastName,
      address: client.data.address,
      phoneNumber: client.data.phoneNumber,
      ISBN: book.ISBN,
      title: book.title,
      author: book.author,
      category: book.category,
    };

    try {
        await addReservation(reservationData);
      setReservations([...reservations, reservationData]);
      Swal.fire({
        icon: 'success',
        title: '¡Libro Agregado!',
        text: `El libro "${book.title}" ha sido agregado a tus reservas.`,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al intentar agregar el libro a tus reservas. Por favor, intenta de nuevo más tarde.',
      });
    }
  };

  const handleDeleteBook = async (ISBN, username) => {
    try {
      await deleteReservation(ISBN, username);
      const updatedReservations = reservations.filter(reservation => reservation.ISBN !== ISBN || reservation.username !== username);
      setReservations(updatedReservations);
      Swal.fire({
        icon: 'success',
        title: '¡Reserva Eliminada!',
        text: 'La reserva ha sido eliminada correctamente.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al intentar eliminar la reserva. Por favor, intenta de nuevo más tarde.',
      });
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredResults = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm)
    );
    setFilteredBooks(filteredResults);
  };

  const getProgressColor = () => {
    const booksAdded = reservations.length;
    if (booksAdded === 1) return 'bg-yellow-500';
    if (booksAdded === 2) return 'bg-orange-500';
    if (booksAdded >= 3) return 'bg-red-500';
    return 'bg-gray-200';
  };

  return (
    <div className={`dark:bg-neutral-900 min-h-screen flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`} style={{
      backgroundImage: `linear-gradient(to bottom left, ${categoryColors[categoryId] || 'rgba(255, 99, 71, 0.5)'}, #ffffff, ${categoryColors[categoryId] || 'rgba(255, 99, 71, 0.5)'})`,
      backgroundSize: 'cover'
    }}>
      <HeaderClient changeTheme={changeTheme} theme={theme} />
      <div className="relative">
        <div className="absolute inset-0">
          <div className="w-full h-80 mb-4 relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <BsSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Buscar libro..."
                className="pl-2 bg-transparent border-b border-gray-300 focus:outline-none"
                onChange={handleSearch}
              />
            </div>
            <div className="text-4xl text-center font-semibold text-gray-800 mt-10">
              {categoryName}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 px-6">
              {filteredBooks.map((book, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800">
                  <img src={ImagenFija} alt="Libro" className="w-full h-60 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{book.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{book.author}</p>
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => toggleDescription(index)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                      >
                        {book.expanded ? 'Cerrar' : 'Detalles'}
                      </button>
                      {!reservations.some(reservation => reservation.ISBN === book.ISBN) ? (
                        <button
                          onClick={() => handleAddBook(index)}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
                        >
                          <RiAddFill className="inline-block mr-1" />
                          Reservar
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDeleteBook(book.ISBN, book.username)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                        >
                          <RiDeleteBinFill className="inline-block mr-1" />
                          Eliminar Reserva
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBook;
