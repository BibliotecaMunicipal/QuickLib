// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../../components/user/HeaderClient.jsx";
import FooterClient from "../../components/footer.jsx";
import { useGetAllCategory } from "../../hooks/category.hook";
import Generalidades from "../../assets/gif/generalidades.gif";
import Filosofia from "../../assets/gif/filosofia.gif";
import Religion from "../../assets/gif/religion.gif";
import Ciencias_Sociales from "../../assets/gif/ciencias.sociales.gif";
import Lenguas from "../../assets/gif/lenguas.jpg";
import Ciencias_Puras from "../../assets/gif/ciencias.puras.gif";
import Tecnologias from "../../assets/gif/tecnologia.gif";
import Bellas_Artes from "../../assets/gif/bellas.artes.gif";
import Literatura from "../../assets/gif/literatura.gif";
import Geografia_y_Historia from "../../assets/gif/geohi.jpeg";

const images = {
  Generalidades,
  Filosofia,
  Religion,
  Ciencias_Sociales,
  Lenguas,
  Ciencias_Puras,
  Tecnologias,
  Bellas_Artes,
  Literatura,
  Geografia_y_Historia,
};
 
const Usuarios = () => {
  const { categories, loading, error } = useGetAllCategory();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [theme, setTheme] = useState('light');

  const changeTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar las categorías</div>;
  }

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(`/categoria/${categoryId}`);
  };

  // Divide las categorías en pares
  const categoryPairs = [];
  for (let i = 0; i < categories.length; i += 2) {
    categoryPairs.push(categories.slice(i, i + 2));
  }

  return (
    <div className={`bg-gray-200 dark:bg-black p-4 min-h-screen relative transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`} style={{ overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style>
        {`
          /* Ocultar barra de desplazamiento para navegadores Webkit (Chrome, Safari) */
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }

          /* Ocultar barra de desplazamiento para IE, Edge y Firefox */
          .hide-scrollbar {
            -ms-overflow-style: none;  /* IE y Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}
      </style>

      <HeaderAdmin changeTheme={changeTheme} theme={theme} />

      <div className="max-w-6xl mx-auto mt-12 hide-scrollbar">
        {categoryPairs.map((pair, index) => (
          <div key={index} className="grid grid-cols-2 gap-6 mb-6">
            {pair.map((category) => (
              <div 
                key={category.Category} 
                className={`relative group cursor-pointer p-4 rounded-md transition-transform transform hover:scale-105 hover:shadow-2xl ${selectedCategory === category.Category ? 'border-4 border-purple-500 shadow-purple-500/50' : ''} hover:shadow-purple-500/50`} 
                onClick={() => handleCategoryClick(category.Category)}
              >
                <div className="relative w-full h-80 rounded-md overflow-hidden">
                  <img 
                    src={images[category.nameCategory]} 
                    alt={category.nameCategory} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-center text-white text-lg">{category.nameCategory.replace(/_/g, ' ')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <FooterClient/>
    </div>
  );
}

export default Usuarios;
