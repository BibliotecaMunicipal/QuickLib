/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Link } from 'react-router-dom'; 
import logo from "../assets/logo_jaz.png";
import CarouselDefault from "../components/carousel.jsx";
import metas from "../assets/metas.png";
import alcances from "../assets/alcances.png";
import logros from "../assets/logros.png"; 
import valores from "../assets/valores.png"
import presidenteImg from "../assets/hassan.png";
import escudo from "../assets/escudo.jpg"; 
import { FaGlobe, FaFacebook, FaPhone, FaEnvelope, FaInstagram } from 'react-icons/fa';
import flor from "../assets/flor.jpg";
import charlie from "../assets/charlie.jpg";
import raul from "../assets/raul.jpg";
import irma from "../assets/irma.jpg";
import paty from "../assets/paty.jpg";
import ade from "../assets/libro_adel.jpg";
import reb from "../assets/libro_reb.jpg";
import Footer from "../components/footer.jsx";
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useRegisterOpinion, useGetOpinion } from '../hooks/opinion.hook.js';
import { toast } from 'react-toastify';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'

const profiles = [

  {
      name: 'Carlos Alarcon',
      role: 'Director de biblioteca',
      rating: 5,
      image: charlie
  },
  {
    name: 'Irma Martinez Berume',
    role: 'Encargada',
    rating: 5,
    image: irma
  },
  {
    name: 'Flor Rocio Favela Vela',
    role: 'Bibliotecaria',
    rating: 5,
    image: flor
},
  {
      name: 'Saul Enrique Rios Hernandez',
      role: 'Bibliotecario',
      rating: 5,
      image: raul
  },

  {
    name:'Patricia Rendon',
    role: 'Bibliotecaria',
    rating: 5,
    image: paty
  }

]; 

const PrincipalPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [name, setName] = useState('');
  const [opinions, setOpinions] = useState([]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const opinion = {
      name, 
      email,
      message,
    };
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await useRegisterOpinion(opinion);
      toast.success('Opinion registrada con exito');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchOpinion = async () => {
      try {
        const data = await useGetOpinion();
        const selectedOpinions = data.filter(opinion => opinion.showOnMainPage); // Filtrar las opiniones seleccionadas
        setOpinions(selectedOpinions);
      } catch (error) {
        console.error('Error fetching opinions:', error);
      }
    };

    fetchOpinion();
  }, []);


  const navigate = useNavigate();

  const profilesPerPage = 3;
  const totalPages = Math.ceil(profiles.length / profilesPerPage);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia('(prefers-color-scheme: black)').matches) {
      return "dark";
    }
    return "light";
  });

  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (theme === "dark") {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
  }, [theme]);

  const changeTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogin = () => {
    navigate("/login");
  };


  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 0 }, items: 1, slidesToSlide: 1 },
    desktop: { breakpoint: { max: 1024, min: 0 }, items: 1, slidesToSlide: 1 },
    tablet: { breakpoint: { max: 768, min: 0 }, items: 1, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 }
  };
  const CustomLeftArrow = ({ onClick }) => (
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full cursor-pointer" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </div>
  );
  
  const CustomRightArrow = ({ onClick }) => (
    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full cursor-pointer" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );

  

  return (
    <div className="bg-gray-50 p-4 dark:bg-neutral-900 min-h-screen relative">
    {/* Header */}
    <div className="flex justify-between items-center bg-gradient-to-r from-green-600 via-white to-red-600 p-4 rounded-md shadow-md mb-4">
      <img src={logo} alt="Logo" className="h-24 py-5" />
<nav className="hidden md:flex space-x-10 text-black text-lg">
  <Link to="home" className="hover:text-blue-600">Home</Link>
  <Link to="personal" className="hover:text-blue-600">Personal</Link>
  <Link to="buzon" className="hover:text-blue-600">Buzon</Link>
  <Link to="opinion" className="hover:text-blue-600">Opiniones</Link>
</nav>
      <div className="hidden md:flex items-center space-x-2">
        <Button className="text-2xl font-mono text-white bg-blue-600 hover:bg-blue-500 italic rounded-full w-36 h-12" onClick={handleLogin} >Empezar</Button>
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-black">
          {menuOpen ? '✖' : '☰'}
        </button>
      </div>
    </div>
    

    {/* Mobile Menu */}
    {menuOpen && (
  <nav className="md:hidden bg-gradient-to-r from-green-600 via-white to-red-600 p-4 rounded-md shadow-md">
    <Link to="home" className="block py-2 hover:text-blue-600">Home</Link>
    <Link to="personal" className="block py-2 hover:text-blue-600">Personal</Link>
    <Link to="buzon" className="block py-2 hover:text-blue-600">Buzon</Link>
    <Link to="opinion" className="block py-2 hover:text-blue-600">Opiniones</Link>
    <Button onClick={handleLogin} className="text-2xl font-mono text-white bg-blue-600 hover:bg-blue-500 italic rounded-full w-36 h-12">Empezar</Button>
  </nav>
    )}
    <div id='home'>
    <CarouselDefault />
    </div>
  

    <div  className="flex flex-col-reverse md:flex-row justify-around items-start mt-8 space-y-8 md:space-y-0 relative z-10">
  {/* Sección de metas, alcances y logros */}
  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:w-2/3 mx-auto">
    <div className="md:col-span-1 flex flex-col items-center">
      <img src={metas} className="w-20 md:w-40 lg:w-40 object-contain" alt="Metas" />
      <h1 className="text-green-500 font-serif text-xl font-semibold mt-2">Misión</h1>
      <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div className="md:col-span-1 flex flex-col items-center">
      <img src={alcances} className="w-20 md:w-40 lg:w-40 object-contain" alt="Alcances" />
      <h1 className="text-blue-500 font-serif text-xl font-semibold mt-2">Visión</h1>
      <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div className="md:col-span-2 flex flex-col items-center">
      <img src={valores} className="w-20 md:w-40 lg:w-40 object-contain" alt="Logros" />
      <h1 className="text-yellow-900 font-serif text-xl font-semibold mt-2">Valores</h1>
      <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </div>

  {/* Formulario */}
  <div id="buzon" className="relative z-10 mx-auto mt-4 mb-8 w-full md:w-1/3 bg-gray-100 p-8 rounded-3xl shadow-lg">
    <h2 className="text-2xl font-bold mb-4 text-center">Comparte tus opiniones con nosotros</h2>
    <form onSubmit={handleSumbit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nombre
        </label>
        <input
          className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Nombre"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correo">
          Correo
        </label>
        <input
          className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mensaje">
          Mensaje
        </label>
        <textarea
          className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Mensaje"
          required
          rows="5"
        ></textarea>
      </div>
      <div className="flex items-center justify-between">
      <button type='submit' disabled={loading} className="text-2xl font-mono text-white bg-blue-600 hover:bg-blue-500 italic rounded-full w-36 h-12">
        {loading ? 'Enviando.....' : 'Enviar'}
      </button>
      </div>
    </form>

    {/* Círculos de fondo */}
    <div className="hidden md:block absolute top-0 left-0 w-32 h-32 bg-green-300 rounded-full opacity-50 -z-10"></div>
    <div className="hidden md:block absolute top-1/2 left-1/3 w-48 h-48 bg-yellow-300 rounded-full opacity-50 -z-10"></div>
    <div className="hidden md:block absolute top-3/4 left-2/3 w-24 h-24 bg-red-300 rounded-full opacity-50 -z-10"></div>
  </div>
</div>

    <div className="flex flex-col items-center space-y-8">
      <div className="flex flex-col lg:flex-row items-center lg:items-start w-full max-w-5xl p-4">
        <div className="text-center lg:text-left lg:w-1/3 lg:mr-8 mb-8 lg:mb-0">
          <h2 className="text-green-700 text-lg font-semibold text-center">Presidente Municipal:</h2>
          <p className="text-black text-lg">Hassan Silvano Garduño Serrano</p>
          <p className="text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti voluptas autem inventore temporibus officiis aliquid in quis dolores, soluta explicabo, sunt odio magnam quia eius, illum doloremque maiores magni alias.</p>
        
        </div>
        <div className="flex justify-center lg:w-1/3 mb-8 lg:mb-0">
          <img src={presidenteImg} alt="Presidente Municipal" className="w-64 h-64 object-cover rounded-lg shadow-md" />
        </div>
        <div className="text-center lg:text-right lg:w-1/3 lg:ml-8 justify-center">
          <h2 className="text-black text-lg font-semibold text-center">¡Hacer mas por la gente!</h2>

          <img src={logo} alt="Escudo" className="w-50 h-32 mx-auto my-4" />

          <p className="text-black text-center">Somos un municipio unido por la humildad, trabajo y compromiso</p>
          <div className="flex justify-center lg:justify-center space-x-4 mt-4">
          
          </div>
        </div>
      </div>
    </div>
    <div className="max-w-6xl mx-auto bg-gray-200 p-8 shadow-lg flex items-center text-black py-10">
    <div className="w-full flex">
      <div className="w-2/3 pr-8">
        <h1 className="text-5xl font-serif mb-4 hover:font-mono">San Juan del mesquital</h1>
        <h2 className="text-3xl italic mb-4 hover:text-gray-700">su historia y sus raíces</h2>
        <p className="text-xl mb-8 hover:text-gray-700">escrito por: ING. Mario Garduño Galvan</p>
        <p className="text-lg hover:text-gray-700">
          El conocer el pasado histórico emprenden acciones que generen el amor y entendimiento entre la
          sociedad, para que se desarrolle una comunidad más participativa y menos enajenada por ideas nefastas y
          materialistas.
        </p>
      </div>
      <div className="w-1/3 flex flex-col items-start relative">
      
        <img src={reb} alt="Autor" className=" flex mb-9 absolute inset-0 z-10 w-3/4 h-auto" style={{ marginLeft: '-95px' }} />
        <img src={ade} alt="Libro Rebelde" className=" flex z-0 w-3/4 h-auto my-10"  style={{marginLeft:'80px' }} />
      </div>
    </div>
  </div>
    {/* Perfil de Personal */}
    <div id='personal' className="relative z-10 mx-auto mt-4 mb-8 w-full md:w-2/3 bg-gray-100 p-8 rounded-3xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Personal</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {profiles
          .slice(currentPage * profilesPerPage, (currentPage + 1) * profilesPerPage)
          .map((profile, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
              <img src={profile.image} alt={profile.name} className="w-24 h-24 rounded-full mb-4" />
              <h3 className="text-xl font-semibold">{profile.name}</h3>
              <p className="text-gray-600">{profile.role}</p>
              <p className="text-yellow-500">{"★".repeat(profile.rating)}</p>
            </div>
          ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-l disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-r disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>


    {/*Carrusel de opiniones*/}
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
  <div className="bg-blue-600 p-8 rounded-lg flex items-start justify-between">
    <div className="w-96 mt-28 ml-24 justify-center text-center"> {/* Cambiado de text-left a text-center */}
      <h2 className="text-6xl font-semibold text-white ">Tus opiniones son valiosas</h2>
      <div className="flex justify-center mt-4">
        <CustomLeftArrow />
        <CustomRightArrow />
      </div>
    </div>
    <div className="w-1/2 relative">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={3000}
        centerMode={false}
        className="carousel"
        containerClass="container-with-dots"
        dotListClass="custom-dot-list-style"
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside
        responsive={responsive}
        showDots
        sliderClass=""
        slidesToSlide={1}
        swipeable
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {opinions.map((opinion) => (
          <div key={opinion._id} className="flex flex-col items-center justify-center p-4 bg-blue-200 min-h-96 rounded-lg shadow-md break-words ">
            <div className="text-3xl text-center text-black mt-2">{opinion.message}</div> {/* Aumentado el tamaño del texto a text-lg */}
          </div>
        ))}
      </Carousel>
    </div>
  </div>
</div>


  {/* Sección de contacto */}
  <div id='opinion' className="relative z-10 mx-auto mt-4 mb-8 w-full md:w-2/3 bg-gray-100 p-8 rounded-3xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Contáctanos</h2>
      <div className="flex flex-col md:flex-row justify-around items-start">
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <FaGlobe className="text-3xl text-blue-500 mb-2" />
          <p className="text-center">www.nuestraweb.com</p>
        </div>
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <FaFacebook className="text-3xl text-blue-600 mb-2" />
          <p className="text-center">@nuestrapagina</p>
        </div>
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <FaInstagram className="text-3xl text-pink-500 mb-2" />
          <p className="text-center">@nuestrapagina</p>
        </div>
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <FaPhone className="text-3xl text-green-500 mb-2" />
          <p className="text-center">123-456-7890</p>
        </div>
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <FaEnvelope className="text-3xl text-red-500 mb-2" />
          <p className="text-center">contacto@nuestraweb.com</p>
        </div>
      </div>
    </div>
       <Footer/>
  </div>

  );

    
};
 


export default PrincipalPage;
