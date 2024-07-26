import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBooksByCategory } from "../../hooks/book.hook.js";
import { useAddReservation, useDeleteReservation, useGetCountUserReservation } from "../../hooks/reservation.hook.js";
import { getClient } from "../../hooks/client.hook";
import Swal from 'sweetalert2';
import { RiAddFill, RiDeleteBinFill } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import HeaderClient from "./HeaderClient.jsx"

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
import ImagenFija from "../../assets/gif/imagen-fija.jpg";

const imageCategory = {
  0: Gene,
  100: Filo,
  200: Reli,
  300: Social,
  400: Lenguas,
  500: Puras,
  600: Tecno,
  700: Artes,
  800: Lit,
  900: Hisge,
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
  const [username, setUsername] = useState('');
  const { count, loading: countLoading, error: countError } = useGetCountUserReservation(username);

  const { addReservation } = useAddReservation();
  const { deleteReservation } = useDeleteReservation();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const client = await getClient();
        setUsername(client.data.username);
      } catch (error) {
        console.error("Error al obtener el cliente:", error);
      }
    };
    fetchClient();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await useGetBooksByCategory(categoryId);
        const booksWithStatus = data.map(book => ({ ...book, status: book.status})); // Ejemplo de condición, ajustar según tu lógica
        setBooks(booksWithStatus);
        setFilteredBooks(booksWithStatus); // Inicialmente muestra todos los libros
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [categoryId]);

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

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredResults = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm)
    );
    setFilteredBooks(filteredResults);
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
    console.log(reservationData);
    try {
      console.log("hola");
      await addReservation(reservationData);
      setReservations([...reservations, reservationData]);
      console.log("Hola");
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

  const toggleDescription = (index) => {
    const newBooks = [...books];
    newBooks[index].expanded = !newBooks[index].expanded;
    setBooks(newBooks);
  };

  const handleDeleteBook = async (ISBN) => {
    const client = await getClient();
    try {
      await deleteReservation(ISBN, client.data.username);
      setReservations(reservations.filter(reservation => reservation.ISBN !== ISBN));
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

  const getProgressColor = () => {
    if (count === 1) return 'bg-yellow-500';
    if (count === 2) return 'bg-orange-500';
    if (count >= 3) return 'bg-red-500';
    return 'bg-gray-200';
  };

  const getProgressMessage = () => {
    if (count === 1) return 'Tienes 1 libro apartado';
    if (count === 2) return 'Tienes 2 libros apartados';
    if (count >= 3) return 'Tienes 3 libros, has alcanzado tu límite';
    return 'No tienes libros apartados aún';
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <HeaderClient changeTheme={changeTheme} theme={theme} />
      <div className="relative flex-grow">
        <div className="absolute inset-0">
          <div className="w-full h-80 mb-4 relative">
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <h2 className="text-white text-2xl font-bold">{categoryNames[categoryId] || 'Categoría Desconocida'}</h2>
            </div>
            <img
              src={imageCategory[categoryId] || ImagenFija}
              alt="Imagen Fija"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex justify-center items-center space-x-4">
              <div className={`h-6 w-48 ${getProgressColor()} rounded-full`}></div>
              <p className="text-white">{getProgressMessage()}</p>
            </div>
            <div className="absolute bottom-4 right-4 flex flex-col items-end space-y-4 transition-transform duration-300 transform focus-within:scale-105">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar por título o autor"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 pr-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {filteredBooks.length === 0 && !loading && <p className="text-center text-gray-600">No se encontraron libros.</p>}
            {filteredBooks.map((book, index) => (
              <div key={book.ISBN} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{book.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Autor: {book.author}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => toggleDescription(index)} className="text-blue-500 dark:text-blue-300">
                      {book.expanded ? 'Ocultar' : 'Ver más'}
                    </button>
                    {reservations.some(reservation => reservation.ISBN === book.ISBN) ? (
                      <button onClick={() => handleDeleteBook(book.ISBN)} className="text-red-500 dark:text-red-300">
                        <RiDeleteBinFill size={24} />
                      </button>
                    ) : (
                      <button onClick={() => handleAddBook(index)} className="text-green-500 dark:text-green-300">
                        <RiAddFill size={24} />
                      </button>
                    )}
                  </div>
                </div>
                {book.expanded && (
                  <div className="mt-2 text-gray-700 dark:text-gray-300">
                    <p><strong>Descripción:</strong> {book.description}</p>
                    <p><strong>ISBN:</strong> {book.ISBN}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          {loading && <div className="text-center">Cargando libros...</div>}
          {error && <div className="text-center text-red-500">Error al cargar los libros.</div>}
        </div>
      </div>
    </div>
  );
};

export default CategoryBook;
