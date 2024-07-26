// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import ChartComponent from '../Admin/graph.jsx'; // Importa tu componente de gráfica
import PdfComponent from '../../Pages/Admin/PDF/PDF.jsx'; // Importa tu componente de PDF

const CarouselDefault = () => {
  const slides = [
    { type: 'chart', content: <ChartComponent /> },
    { type: 'pdf', content: <PdfComponent /> },
    // Puedes agregar más slides aquí según sea necesario
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
 
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Determina el ancho máximo del carousel basado en el contenido actual
  const getMaxWidth = () => {
    if (currentIndex >= 0 && currentIndex < slides.length) {
      const contentWidth = slides[currentIndex].type === 'chart'
        ? 700 // Ancho estimado para gráfica
        : 500; // Ancho estimado para PDF u otro contenido
      return Math.min(contentWidth, window.innerWidth - 40); // Ajusta según el ancho de la ventana
    }
    return '100%'; // Valor por defecto
  };

  return (
    <div className="relative overflow-hidden mx-auto" style={{ maxWidth: getMaxWidth() }}>
      <div className="flex transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {slide.content}
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white p-2">
        &#10094;
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white p-2">
        &#10095;
      </button>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 p-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-gray-700' : 'bg-gray-300'}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CarouselDefault;
