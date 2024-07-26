import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext1.jsx';
import logo from '../../assets/logo_jaz.png';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { IoLogOut } from 'react-icons/io5';
import { getClient, updateClient } from '../../services/client.services.js';
import ProfileModal from '../user/profilModal.jsx';

const MySwal = withReactContent(Swal);

const HeaderAdmin = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');
        const res = await getClient(username, token);
        setUser(res.data);
      } catch (error) {
        console.error('Error al obtener los datos del usuario', error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    // Aplicar tema guardado al cargar el componente
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme;
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      title: '¿Seguro de salir?',
      text: "Estás a punto de cerrar sesión",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
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

  return (
    <div className="relative flex flex-col justify-between items-center bg-gradient-to-r from-green-600 via-white to-red-600 p-4 rounded-md shadow-md mb-4">
      <div className="flex justify-between items-center w-full">
        <img src={logo} alt="Logo" className="h-24 py-5" />
        <nav className="hidden md:flex space-x-10 text-xl">
          <Link
            to="/Dashboard"
            className={`${
              location.pathname === '/Dashboard' ? 'text-blue-600' : 'text-black'
            } hover:text-blue-600 text-center font-serif`}
          >
            Home
          </Link>
          <Link
            to="/Bandeja"
            className={`${
              location.pathname === '/Bandeja' ? 'text-blue-600' : 'text-black'
            } hover:text-blue-600 text-center font-serif`}
          >
            Bandeja
          </Link>
          <Link
            to="/Registros"
            className={`${
              location.pathname === '/Registros' ? 'text-blue-600' : 'text-black'
            } hover:text-blue-600 text-center font-serif`}
          >
            Registros
          </Link>
          <Link
            to="/Consulta"
            className={`${
              location.pathname === '/Consulta' ? 'text-blue-600' : 'text-black'
            } hover:text-blue-600 text-center font-serif`}
          >
            Consultas
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <button className="text-xl text-white" onClick={toggleTheme}>
            {theme === 'dark' ? '☀' : '🌙'}
          </button>
          <button onClick={handlePerfil} className="text-xl text-white">👤</button>
          <IoLogOut onClick={handleLogout} />
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-black z-50">
            {menuOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="md:hidden bg-gradient-to-r from-green-600 via-white to-red-600 p-4 rounded-md shadow-md w-full mt-4">
          <Link to="/Dashboard" className="block py-2 hover:text-blue-600">
            Home
          </Link>
          <Link to="/Bandeja" className="block py-2 hover:text-blue-600">
            Bandeja
          </Link>
          <Link to="/Registros" className="block py-2 hover:text-blue-600">
            Registros
          </Link>
          <Link to="/Consulta" className="block py-2 hover:text-blue-600">
            Consultas
          </Link>
        </nav>
      )}
    </div>
  );
};

export default HeaderAdmin;