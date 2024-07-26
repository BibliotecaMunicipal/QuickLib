/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext1.jsx';
import logo from '../../assets/logo_jaz.png';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { IoHome } from 'react-icons/io5';
import { GiBookshelf } from "react-icons/gi";
import { getClient, updateClient } from "../../services/client.services.js";
import ProfileModal from './profilModal.jsx';

const MySwal = withReactContent(Swal);

const HeaderClient = ({ changeTheme, theme }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        const res = await getClient(username, token);
        setUser(res.data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: '¿Seguro de salir?',
      text: "Estás a punto de cerrar sesión",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handlePerfil = () => {
    if (!user) return;

    MySwal.fire({
      title: 'Información del Usuario',
      customClass: {
        popup: 'bg-transparent backdrop-blur-md',
        title: 'text-white',
      },
      html: (
        <ProfileModal user={user} theme={theme} updateClient={updateClient} setUser={setUser} />
      ),
      showConfirmButton: false
    });
  };

  const toggleTheme = () => {
    changeTheme(); // Cambia el tema
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light'); // Guarda el tema seleccionado
  };

  useEffect(() => {
    // Aplicar tema guardado al cargar el componente
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      changeTheme();
    }
  }, []); // Ejecutar solo una vez al cargar el componente

  return (
    <div className={`relative flex flex-col justify-between items-center bg-gradient-to-r from-green-600 via-white to-red-600 p-4 rounded-md shadow-md mb-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-white' : ''}`}>
      <div className="flex justify-between items-center w-full">
        <img src={logo} alt="Logo" className="h-24 py-5" />
        <div className="hidden md:flex items-center space-x-2">
          <Link to="/Usuarios" className="text-xl text-white"><IoHome /></Link>
          <Link to="/Carrito" className="text-xl text-white"><GiBookshelf /></Link>
          <button className="text-xl text-white" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button onClick={handlePerfil} className="text-xl text-white">👤</button>
          <button className="text-sm font-mono text-white bg-blue-600 hover:bg-blue-500 italic rounded-full w-51 h-12" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-black z-50">
            {menuOpen ? '✖️' : '☰'}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="md:hidden bg-gradient-to-r from-green-600 via-white to-red-600 p-4 rounded-md shadow-md w-full mt-4">
          <Link to="/Usuarios" className="block py-2 hover:text-blue-600">
            Home
          </Link>
          <Link to="/Carrito" className="block py-2 hover:text-blue-600">
            Libros Prestados
          </Link>
          <button className="block py-2 text-left hover:text-blue-600" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'} Cambiar Tema
          </button>
          <button className="block py-2 text-left hover:text-blue-600" onClick={handlePerfil}>
            👤 Perfil
          </button>
          <button className="block py-2 text-left hover:text-blue-600" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </nav>
      )}
    </div>
  );
};

export default HeaderClient;
